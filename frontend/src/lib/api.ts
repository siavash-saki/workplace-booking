import { Workplace, Booking } from '../types';

const BASE_URL = 'http://localhost:8000';

export async function login(username: string) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username })
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json() as Promise<{ token: string; user: string }>;
}

export async function fetchWorkplaces(): Promise<Workplace[]> {
  const res = await fetch(`${BASE_URL}/workplaces`);
  if (!res.ok) throw new Error('Failed to load workplaces');
  return res.json();
}

export async function fetchBookings(): Promise<Booking[]> {
  const res = await fetch(`${BASE_URL}/bookings`);
  if (!res.ok) throw new Error('Failed to load bookings');
  return res.json();
}

export async function createBooking(workplace_id: number, user: string): Promise<Booking> {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ workplace_id, user })
  });
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || 'Booking failed');
  }
  return res.json();
}

export async function cancelBooking(bookingId: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/bookings/${bookingId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Cancel failed');
}
