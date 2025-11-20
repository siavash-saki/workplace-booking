import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';

export default function DashboardPage() {
  const workplaces = useAppStore((s) => s.workplaces);
  const loadWorkplaces = useAppStore((s) => s.loadWorkplaces);
  const bookings = useAppStore((s) => s.bookings);
  const loading = useAppStore((s) => s.loading);

  useEffect(() => {
    if (!workplaces.length) {
      loadWorkplaces();
    }
  }, [workplaces.length, loadWorkplaces]);

  const available = workplaces.filter((w) => !w.is_booked).length;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Desks" value={workplaces.length || '—'} />
        <StatCard label="Available" value={loading ? '...' : available} />
        <StatCard label="My Bookings" value={bookings.length} />
      </section>

      <section className="rounded-lg border bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold">Quick Links</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          <QuickLink to="/workplaces" label="Browse Desks" />
          <QuickLink to="/floorplan" label="View Floorplan" />
          <QuickLink to="/bookings" label="Manage Bookings" />
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}

function QuickLink({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className="btn bg-gray-100 text-gray-800 hover:bg-gray-200">
      {label}
    </Link>
  );
}
