import { User } from "@prisma/client";

type UserWithBookingCount = User & {
  _count?: {
    bookings: number;
  };
};

export default function mapUser(user: UserWithBookingCount) {
  const data = {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    role: user.role,
  };

  if (user._count) {
    return {
      ...data,
      bookingsCount: user._count.bookings,
    };
  }

  return data;
}
