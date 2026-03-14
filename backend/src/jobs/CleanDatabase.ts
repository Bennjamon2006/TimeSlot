import bookingsService from "@/services/bookings.service";
import timeSlotsService from "@/services/timeSlots.service";

async function cleanDatabase() {
  const deletedBookings = await bookingsService.deletePastBookings();
  const deletedTimeSlots = await timeSlotsService.deletePastTimeSlots();

  console.log(
    `Cleaned database: deleted ${deletedBookings} past bookings and ${deletedTimeSlots} past time slots.`,
  );
}

const CleanDatabaseJob = {
  name: "Clean Database",
  execute: cleanDatabase,
  interval: 60 * 60 * 1000, // Run every hour
};

export default CleanDatabaseJob;
