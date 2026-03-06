// src/__tests__/bookings.test.ts
// Unit tests for Bookings service

import bookingsService from "@/services/bookings.service";
import { prismaMock } from "./setup";
import { booking, timeSlot, regularUser, adminUser } from "./fixtures";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

describe("Bookings Service", () => {
  describe("getBookings", () => {
    it("should return all bookings for admin", async () => {
      const bookingsWithRelations = [
        { ...booking, user: regularUser, timeSlot },
      ];
      prismaMock.booking.findMany.mockResolvedValue(bookingsWithRelations);

      const result = await bookingsService.getBookings("admin-id", "ADMIN");

      expect(prismaMock.booking.findMany).toHaveBeenCalledWith({
        where: {},
        include: { timeSlot: true, user: true },
      });
      expect(result).toHaveLength(1);
    });

    it("should return only user bookings for regular user", async () => {
      const userBooking = { ...booking, user: regularUser, timeSlot };
      prismaMock.booking.findMany.mockResolvedValue([userBooking]);

      const result = await bookingsService.getBookings(regularUser.id, "USER");

      expect(prismaMock.booking.findMany).toHaveBeenCalledWith({
        where: { userId: regularUser.id },
        include: { timeSlot: true, user: true },
      });
    });
  });

  describe("getBookingById", () => {
    it("should return booking for owner", async () => {
      const fullBooking = { ...booking, user: regularUser, timeSlot };
      prismaMock.booking.findUnique.mockResolvedValue(fullBooking);

      const result = await bookingsService.getBookingById(
        booking.id,
        regularUser.id,
        "USER",
      );

      expect(result).toEqual(fullBooking);
    });

    it("should return booking for admin", async () => {
      const fullBooking = { ...booking, user: regularUser, timeSlot };
      prismaMock.booking.findUnique.mockResolvedValue(fullBooking);

      const result = await bookingsService.getBookingById(
        booking.id,
        adminUser.id,
        "ADMIN",
      );

      expect(result).toEqual(fullBooking);
    });

    it("should throw 403 for non-owner non-admin", async () => {
      prismaMock.booking.findUnique.mockResolvedValue({
        ...booking,
        userId: regularUser.id,
      });

      await expect(
        bookingsService.getBookingById(booking.id, "other-user-id", "USER"),
      ).rejects.toThrow("Forbidden");
    });

    it("should throw 404 if not found", async () => {
      prismaMock.booking.findUnique.mockResolvedValue(null);

      await expect(
        bookingsService.getBookingById("invalid", regularUser.id, "USER"),
      ).rejects.toThrow("Booking not found");
    });
  });

  describe("createBooking", () => {
    it("should create booking", async () => {
      prismaMock.timeSlot.findUnique.mockResolvedValue(timeSlot);
      prismaMock.booking.create.mockResolvedValue(booking);

      const result = await bookingsService.createBooking(
        regularUser.id,
        timeSlot.id,
      );

      expect(prismaMock.booking.create).toHaveBeenCalledWith({
        data: { userId: regularUser.id, timeSlotId: timeSlot.id },
      });
      expect(result).toEqual(booking);
    });

    it("should throw if time slot not found", async () => {
      const error = new PrismaClientKnownRequestError(
        "Foreign key constraint failed",
        {
          code: "P2003",
          clientVersion: "3.0.0",
        },
      );

      prismaMock.booking.create.mockRejectedValue(error);

      await expect(
        bookingsService.createBooking(regularUser.id, "invalid"),
      ).rejects.toThrow("Time slot not found");
    });

    it("should throw if time slot already booked", async () => {
      const error = new PrismaClientKnownRequestError(
        "Unique constraint failed",
        {
          code: "P2002",
          clientVersion: "3.0.0",
        },
      );

      prismaMock.timeSlot.findUnique.mockResolvedValue(timeSlot);
      prismaMock.booking.create.mockRejectedValue(error);

      await expect(
        bookingsService.createBooking(regularUser.id, timeSlot.id),
      ).rejects.toThrow("Time slot already booked");
    });
  });

  describe("deleteBooking", () => {
    it("should delete booking as owner", async () => {
      prismaMock.booking.findUnique.mockResolvedValue({
        ...booking,
        userId: regularUser.id,
      });
      prismaMock.booking.delete.mockResolvedValue(booking);

      await bookingsService.deleteBooking(booking.id, regularUser.id, "USER");

      expect(prismaMock.booking.delete).toHaveBeenCalledWith({
        where: { id: booking.id },
      });
    });

    it("should delete booking as admin", async () => {
      prismaMock.booking.findUnique.mockResolvedValue({
        ...booking,
        userId: regularUser.id,
      });
      prismaMock.booking.delete.mockResolvedValue(booking);

      await bookingsService.deleteBooking(booking.id, adminUser.id, "ADMIN");

      expect(prismaMock.booking.delete).toHaveBeenCalled();
    });

    it("should throw 403 for non-owner non-admin", async () => {
      prismaMock.booking.findUnique.mockResolvedValue({
        ...booking,
        userId: regularUser.id,
      });

      await expect(
        bookingsService.deleteBooking(booking.id, "other-user-id", "USER"),
      ).rejects.toThrow("Forbidden");
    });

    it("should throw 404 if not found", async () => {
      prismaMock.booking.findUnique.mockResolvedValue(null);

      await expect(
        bookingsService.deleteBooking("invalid", regularUser.id, "USER"),
      ).rejects.toThrow("Booking not found");
    });
  });
});
