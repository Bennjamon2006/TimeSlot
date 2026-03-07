import api from "@/api";

export interface Booking {
  id: string;
  userId: string;
  timeSlotId: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingWithRelations extends Booking {
  user?: {
    id: string;
    name: string;
    email: string;
  };
  timeSlot?: {
    id: string;
    startTime: string;
    endTime: string;
  };
}

const getMyBookings = async (): Promise<BookingWithRelations[]> => {
  return api.get<BookingWithRelations[]>("/bookings");
};

const bookingsService = {
  getMyBookings,
};

export default bookingsService;
