import { useEffect } from 'react';
import { useAppStore } from '../store';
import DeskCard from '../components/DeskCard';

export default function BookingPage() {
  const workplaces = useAppStore((s) => s.workplaces);
  const bookings = useAppStore((s) => s.bookings);
  const loadWorkplaces = useAppStore((s) => s.loadWorkplaces);
  const loadBookings = useAppStore((s) => s.loadBookings);
  const cancelDesk = useAppStore((s) => s.cancelDesk);
  const bookDesk = useAppStore((s) => s.bookDesk);

  useEffect(() => {
    loadWorkplaces();
    loadBookings();
  }, [loadWorkplaces, loadBookings]);

  const bookedWorkplaces = workplaces.filter((w) => w.is_booked);
  const hasBookings = bookings.length > 0 || bookedWorkplaces.length > 0;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-800">Your Bookings</h1>
      {!hasBookings && <p className="text-sm text-gray-600">No active bookings.</p>}
      <div className="space-y-3">
        {bookedWorkplaces.map((wp) => (
          <DeskCard key={wp.id} workplace={wp} onBook={bookDesk} onCancel={cancelDesk} />
        ))}
      </div>
    </div>
  );
}
