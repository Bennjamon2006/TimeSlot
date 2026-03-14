import api from "@/api";

export interface Booking {
  id: string;
  userId: string;
  timeSlotId: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingWithRelations extends Booking {
  user: {
    id: string;
    name: string;
    email: string;
  };
  timeSlot: {
    id: string;
    startTime: string;
    endTime: string;
  };
}

const getBookings = async (): Promise<BookingWithRelations[]> => {
  return api.get<BookingWithRelations[]>("/bookings");
};

const createBooking = async (timeSlotId: string): Promise<Booking> => {
  return api.post<Booking>("/bookings", { timeSlotId });
};

const cancelBooking = async (bookingId: string): Promise<void> => {
  return api.delete(`/bookings/${bookingId}`);
};

const bookingsService = {
  getBookings,
  createBooking,
  cancelBooking,
};

export default bookingsService;
