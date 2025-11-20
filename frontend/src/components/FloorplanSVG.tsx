import { Workplace } from '../types';

interface Props {
  workplaces: Workplace[];
  onSelect: (workplaceId: number, bookingId?: number) => void;
}

export default function FloorplanSVG({ workplaces, onSelect }: Props) {
  const cellSize = 90;
  return (
    <svg className="mx-auto block" width={cellSize * 5} height={cellSize * 2}>
      {workplaces.slice(0, 10).map((wp, idx) => {
        const row = Math.floor(idx / 5);
        const col = idx % 5;
        const x = col * cellSize + 10;
        const y = row * cellSize + 10;
        return (
          <g key={wp.id} onClick={() => onSelect(wp.id, wp.booking_id ?? undefined)} className="cursor-pointer">
            <rect
              x={x}
              y={y}
              width={cellSize - 20}
              height={cellSize - 20}
              rx="8"
              className={`stroke-2 ${
                wp.is_booked ? 'fill-red-100 stroke-red-400' : 'fill-green-100 stroke-green-500'
              }`}
            />
            <text x={x + 10} y={y + 25} className="text-sm font-semibold">
              {wp.name}
            </text>
            <text x={x + 10} y={y + 45} className="text-xs text-gray-600">
              {wp.location}
            </text>
            <text x={x + 10} y={y + 65} className="text-xs font-medium">
              {wp.is_booked ? 'Booked' : 'Free'}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
