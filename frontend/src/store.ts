import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Booking, Workplace } from './types';
import * as api from './lib/api';

interface AppState {
  user: string | null;
  token: string | null;
  workplaces: Workplace[];
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  login: (username: string) => Promise<void>;
  loadWorkplaces: () => Promise<void>;
  loadBookings: () => Promise<void>;
  bookDesk: (workplaceId: number) => Promise<void>;
  cancelDesk: (bookingId: number) => Promise<void>;
  clearError: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      workplaces: [],
      bookings: [],
      loading: false,
      error: null,
      clearError: () => set({ error: null }),
      login: async (username: string) => {
        set({ loading: true, error: null });
        try {
          const res = await api.login(username);
          set({ user: res.user, token: res.token });
        } catch (err) {
          set({ error: (err as Error).message });
        } finally {
          set({ loading: false });
        }
      },
      loadWorkplaces: async () => {
        set({ loading: true, error: null });
        try {
          const data = await api.fetchWorkplaces();
          set({ workplaces: data });
        } catch (err) {
          set({ error: (err as Error).message });
        } finally {
          set({ loading: false });
        }
      },
      loadBookings: async () => {
        try {
          const data = await api.fetchBookings();
          set({ bookings: data });
        } catch (err) {
          set({ error: (err as Error).message });
        }
      },
      bookDesk: async (workplaceId: number) => {
        const { user, workplaces, bookings } = get();
        if (!user) {
          set({ error: 'Please login first' });
          return;
        }
        set({ loading: true, error: null });
        try {
          const booking = await api.createBooking(workplaceId, user);
          const updated = workplaces.map((w) =>
            w.id === workplaceId ? { ...w, is_booked: true, booking_id: booking.id } : w
          );
          set({ workplaces: updated, bookings: [...bookings, booking] });
        } catch (err) {
          set({ error: (err as Error).message });
        } finally {
          set({ loading: false });
        }
      },
      cancelDesk: async (bookingId: number) => {
        const { workplaces, bookings } = get();
        set({ loading: true, error: null });
        try {
          await api.cancelBooking(bookingId);
          const booking = bookings.find((b) => b.id === bookingId);
          const updatedWorkplaces = workplaces.map((w) =>
            booking && w.id === booking.workplace_id ? { ...w, is_booked: false, booking_id: null } : w
          );
          set({
            workplaces: updatedWorkplaces,
            bookings: bookings.filter((b) => b.id !== bookingId)
          });
        } catch (err) {
          set({ error: (err as Error).message });
        } finally {
          set({ loading: false });
        }
      }
    }),
    { name: 'booking-app' }
  )
);
