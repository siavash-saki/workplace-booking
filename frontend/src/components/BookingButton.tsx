interface Props {
  isBooked: boolean;
  bookingId?: number;
  onBook: () => void;
  onCancel: () => void;
}

export default function BookingButton({ isBooked, bookingId, onBook, onCancel }: Props) {
  return isBooked && bookingId ? (
    <button
      onClick={onCancel}
      className="btn bg-red-500 text-white hover:bg-red-600"
      aria-label="Cancel booking"
    >
      Cancel
    </button>
  ) : (
    <button onClick={onBook} className="btn bg-accent text-white hover:bg-emerald-600" aria-label="Book desk">
      Book
    </button>
  );
}
