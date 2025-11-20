import { useEffect } from 'react';
import FloorplanSVG from '../components/FloorplanSVG';
import { useAppStore } from '../store';

export default function FloorplanPage() {
  const workplaces = useAppStore((s) => s.workplaces);
  const loadWorkplaces = useAppStore((s) => s.loadWorkplaces);
  const bookDesk = useAppStore((s) => s.bookDesk);
  const cancelDesk = useAppStore((s) => s.cancelDesk);

  useEffect(() => {
    loadWorkplaces();
  }, [loadWorkplaces]);

  const handleSelect = (workplaceId: number, bookingId?: number) => {
    if (bookingId) {
      cancelDesk(bookingId);
    } else {
      bookDesk(workplaceId);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-800">Floorplan</h1>
      <p className="text-sm text-gray-600">Click on a desk to book or cancel.</p>
      <div className="overflow-auto rounded-lg border bg-white p-4 shadow-sm">
        <FloorplanSVG workplaces={workplaces} onSelect={handleSelect} />
      </div>
    </div>
  );
}
