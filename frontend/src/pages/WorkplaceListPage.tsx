import { useEffect } from 'react';
import { useAppStore } from '../store';
import DeskCard from '../components/DeskCard';

export default function WorkplaceListPage() {
  const workplaces = useAppStore((s) => s.workplaces);
  const loadWorkplaces = useAppStore((s) => s.loadWorkplaces);
  const bookDesk = useAppStore((s) => s.bookDesk);
  const cancelDesk = useAppStore((s) => s.cancelDesk);

  useEffect(() => {
    loadWorkplaces();
  }, [loadWorkplaces]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-800">Workplaces</h1>
      <div className="space-y-3">
        {workplaces.map((wp) => (
          <DeskCard key={wp.id} workplace={wp} onBook={bookDesk} onCancel={cancelDesk} />
        ))}
      </div>
    </div>
  );
}
