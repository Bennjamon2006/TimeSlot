import { useMemo } from "react";
import useProfile from "@/hooks/useProfile";

export default function useLabels() {
  const { role } = useProfile();

  return useMemo(() => {
    if (role === "ADMIN") {
      return {
        available: "Con Horarios",
        booked: "Con Reservas",
      };
    } else {
      return {
        available: "Disponible",
        booked: "Reservado",
      };
    }
  }, [role]);
}
