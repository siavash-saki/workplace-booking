export interface Workplace {
  id: number;
  name: string;
  location: string;
  is_booked: boolean;
  booking_id?: number | null;
}

export interface Booking {
  id: number;
  workplace_id: number;
  user: string;
}
