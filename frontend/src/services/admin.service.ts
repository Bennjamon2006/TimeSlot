import api from "@/api";
import { User } from "./users.service";

type AdminStats = {
  totalBookings: number;
  totalUsers: number;
  totalTimeSlots: number;
};

const getAdminStats = async () => {
  const response = await api.get<AdminStats>("/admin/stats");

  return response;
};

const getUsers = async () => {
  const response = await api.get<User[]>("/users");

  return response;
};

const adminService = {
  getAdminStats,
  getUsers,
};

export default adminService;
