import api from "@/api";

type AdminStats = {
  totalBookings: number;
  totalUsers: number;
  totalTimeSlots: number;
};

const getAdminStats = async () => {
  const response = await api.get<AdminStats>("/admin/stats");

  return response;
};

const adminService = {
  getAdminStats,
};

export default adminService;
