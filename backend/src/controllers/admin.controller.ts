import adminService from "@/services/admin.service";
import Response from "@/helpers/Response";
import wrapController from "@/helpers/wrapController";

export const getStats = async () => {
  const stats = await adminService.getStats();

  return new Response(stats, 200);
};

const adminController = wrapController({
  getStats,
});

export default adminController;
