import api from "@/api";

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface TimeSlotWithBooking extends TimeSlot {
  booking?: {
    id: string;
    userId: string;
  };
}

type TimeSlotsResponse = {
  data: TimeSlot[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
};

type GetTimeSlotsParams = {
  page?: number;
  pageSize?: number;
  startAfter?: string;
  startBefore?: string;
  endAfter?: string;
  endBefore?: string;
  booked?: boolean;
};

type CreateTimeSlotData = {
  startTime: string;
  endTime: string;
};

const getTimeSlots = async (
  params?: GetTimeSlotsParams,
): Promise<TimeSlotsResponse> => {
  const query = new URLSearchParams();

  if (params?.page) query.set("page", String(params.page));
  if (params?.pageSize) query.set("pageSize", String(params.pageSize));
  if (params?.startAfter) query.set("startAfter", params.startAfter);
  if (params?.startBefore) query.set("startBefore", params.startBefore);
  if (params?.endAfter) query.set("endAfter", params.endAfter);
  if (params?.endBefore) query.set("endBefore", params.endBefore);
  if (params?.booked !== undefined) query.set("booked", String(params.booked));

  const queryString = query.toString();
  const endpoint = queryString ? `/time-slots?${queryString}` : "/time-slots";

  return api.get<TimeSlotsResponse>(endpoint);
};

const createTimeSlot = async (data: CreateTimeSlotData) => {
  return api.post("/time-slots", data);
};

const timeSlotsService = {
  getTimeSlots,
  createTimeSlot,
};

export default timeSlotsService;
