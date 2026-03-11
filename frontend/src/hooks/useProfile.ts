import hashName from "@/helpers/hashName";
import useAuth from "./useAuth";

const GOLD = "FFD700";

export default function useProfile() {
  const { user } = useAuth();

  const name = user?.name || "Usuario";
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const hash = hashName(name);
  let avatarColor = ((hash & 0xffffff) | 0x444444)
    .toString(16)
    .padStart(6, "0");

  if (hash % 73 === 37) {
    console.log("Sheldon Cooper would be happy");

    avatarColor = GOLD;
  }

  return {
    name,
    email: user?.email || "user@example.com",
    initials,
    hash,
    avatarColor: `#${avatarColor}`,
  };
}
