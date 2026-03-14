import getMonth from "@/helpers/getMonth";
import bookingsService from "@/services/bookings.service";
import timeSlotsService from "@/services/timeSlots.service";
import { useMemo } from "react";
import useQuery from "./useQuery";

export default function useDay(day: number) {
  const { month, name, year } = getMonth();

  const getBookingsQuery = useQuery("user-bookings", () =>
    bookingsService.getBookings(),
  );
  const getTimeSlotsQuery = useQuery(
    "available-time-slots",
    () =>
      timeSlotsService.getTimeSlots({
        startAfter: new Date(year, month, day).toISOString(),
        booked: false,
      }),
    10000,
  );

  const data = useMemo(() => {
    const timeSlots = getTimeSlotsQuery.data?.data || [];
    const bookings = getBookingsQuery.data || [];

    const availableSlots = timeSlots.filter(
      (ts) => new Date(ts.startTime).getDate() === day,
    );

    const filteredBookings = bookings.filter(
      (b) => new Date(b.timeSlot.startTime).getDate() === day,
    );

    return { availableSlots, bookings: filteredBookings };
  }, [getBookingsQuery.data, getTimeSlotsQuery.data]);

  return {
    name,
    year,
    month,
    day,
    ...data,
  };
}
