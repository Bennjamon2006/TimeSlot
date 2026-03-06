import Response from "@/helpers/Response";
import { Request } from "@/types/Request";
import wrapController from "@/helpers/wrapController";
import bookingsService from "@/services/bookings.service";

const getBookings = async (req: Request) => {
  const bookings = await bookingsService.getBookings();

  return new Response(bookings);
};

const bookingsController = wrapController({
  getBookings,
});

export default bookingsController;
