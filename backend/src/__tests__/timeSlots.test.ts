// src/__tests__/timeSlots.test.ts
// Unit tests for TimeSlots service

import timeSlotsService from "@/services/timeSlots.service";
import { prismaMock } from "./setup";
import { timeSlot, timeSlot2, newTimeSlotData } from "./fixtures";

describe("TimeSlots Service", () => {
  describe("getTimeSlots", () => {
    it("should return time slots with pagination", async () => {
      prismaMock.timeSlot.findMany.mockResolvedValue([timeSlot]);
      prismaMock.timeSlot.count.mockResolvedValue(1);

      const result = await timeSlotsService.getTimeSlots(
        {
          startBefore: undefined,
          startAfter: undefined,
          endBefore: undefined,
          endAfter: undefined,
          booked: undefined,
        },
        { page: 1, pageSize: 10 },
      );

      expect(result.data).toHaveLength(1);
      expect(result.pagination).toEqual({
        total: 1,
        took: 1,
        page: 1,
        pageSize: 10,
        totalPages: 1,
      });
    });

    it("should apply filters", async () => {
      prismaMock.timeSlot.findMany.mockResolvedValue([timeSlot]);
      prismaMock.timeSlot.count.mockResolvedValue(1);

      await timeSlotsService.getTimeSlots(
        {
          startAfter: new Date("2026-03-01"),
          startBefore: new Date("2026-03-10"),
        },
        { page: 1, pageSize: 10 },
      );

      expect(prismaMock.timeSlot.findMany).toHaveBeenCalled();
    });

    it("should calculate totalPages correctly", async () => {
      prismaMock.timeSlot.findMany.mockResolvedValue([timeSlot, timeSlot2]);
      prismaMock.timeSlot.count.mockResolvedValue(12);

      const result = await timeSlotsService.getTimeSlots(
        {},
        { page: 1, pageSize: 5 },
      );

      expect(result.pagination.totalPages).toBe(3);
    });
  });

  describe("getTimeSlotById", () => {
    it("should return time slot by id", async () => {
      prismaMock.timeSlot.findUnique.mockResolvedValue(timeSlot);

      const result = await timeSlotsService.getTimeSlotById(timeSlot.id);

      expect(prismaMock.timeSlot.findUnique).toHaveBeenCalledWith({
        where: { id: timeSlot.id },
        include: { booking: true },
      });
      expect(result).toEqual(timeSlot);
    });

    it("should throw if not found", async () => {
      prismaMock.timeSlot.findUnique.mockResolvedValue(null);

      await expect(timeSlotsService.getTimeSlotById("invalid")).rejects.toThrow(
        "Time slot not found",
      );
    });
  });

  describe("createTimeSlot", () => {
    it("should create time slot", async () => {
      prismaMock.timeSlot.findFirst.mockResolvedValue(null);
      prismaMock.timeSlot.create.mockResolvedValue(timeSlot);

      const result = await timeSlotsService.createTimeSlot(newTimeSlotData);

      expect(prismaMock.timeSlot.create).toHaveBeenCalledWith({
        data: newTimeSlotData,
      });
      expect(result).toEqual(timeSlot);
    });

    it("should throw on overlapping time slot", async () => {
      prismaMock.timeSlot.findFirst.mockResolvedValue(timeSlot);

      await expect(
        timeSlotsService.createTimeSlot(newTimeSlotData),
      ).rejects.toThrow("Time slot overlaps with an existing slot");
    });
  });

  describe("updateTimeSlot", () => {
    it("should update time slot", async () => {
      const updated = {
        ...timeSlot,
        startTime: new Date("2026-03-06T08:00:00Z"),
      };
      prismaMock.timeSlot.findUnique.mockResolvedValue(timeSlot);
      prismaMock.timeSlot.findFirst.mockResolvedValue(null);
      prismaMock.timeSlot.update.mockResolvedValue(updated);

      const result = await timeSlotsService.updateTimeSlot(timeSlot.id, {
        startTime: new Date("2026-03-06T08:00:00Z"),
      });

      expect(prismaMock.timeSlot.update).toHaveBeenCalled();
      expect(result.startTime).toEqual(new Date("2026-03-06T08:00:00Z"));
    });

    it("should throw if not found", async () => {
      prismaMock.timeSlot.findUnique.mockResolvedValue(null);

      await expect(
        timeSlotsService.updateTimeSlot("invalid", {}),
      ).rejects.toThrow("Time slot not found");
    });

    it("should throw on overlap", async () => {
      prismaMock.timeSlot.findUnique.mockResolvedValue(timeSlot);
      prismaMock.timeSlot.findFirst.mockResolvedValue(timeSlot2);

      await expect(
        timeSlotsService.updateTimeSlot(timeSlot.id, {
          startTime: new Date("2026-03-06T14:30:00Z"),
        }),
      ).rejects.toThrow("Time slot overlaps with an existing slot");
    });
  });

  describe("deleteTimeSlot", () => {
    it("should delete time slot", async () => {
      prismaMock.timeSlot.findUnique.mockResolvedValue(timeSlot);
      prismaMock.timeSlot.delete.mockResolvedValue(timeSlot);

      await timeSlotsService.deleteTimeSlot(timeSlot.id);

      expect(prismaMock.timeSlot.delete).toHaveBeenCalledWith({
        where: { id: timeSlot.id },
      });
    });

    it("should throw if not found", async () => {
      prismaMock.timeSlot.findUnique.mockResolvedValue(null);

      await expect(timeSlotsService.deleteTimeSlot("invalid")).rejects.toThrow(
        "Time slot not found",
      );
    });
  });
});
