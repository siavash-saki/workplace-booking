import BookingButton from './BookingButton';
import { Workplace } from '../types';

interface Props {
  workplace: Workplace;
  onBook: (id: number) => void;
  onCancel: (bookingId: number) => void;
}

export default function DeskCard({ workplace, onBook, onCancel }: Props) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm">
      <div>
        <h3 className="text-lg font-semibold">{workplace.name}</h3>
        <p className="text-sm text-gray-500">{workplace.location}</p>
        <p className="mt-1 text-sm">
          Status:{' '}
          <span className={workplace.is_booked ? 'text-red-600' : 'text-green-600'}>
            {workplace.is_booked ? 'Booked' : 'Available'}
          </span>
        </p>
      </div>
      <BookingButton
        isBooked={workplace.is_booked}
        bookingId={workplace.booking_id ?? undefined}
        onBook={() => onBook(workplace.id)}
        onCancel={() => workplace.booking_id && onCancel(workplace.booking_id)}
      />
    </div>
  );
}
