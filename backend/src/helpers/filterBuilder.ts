import { Prisma } from "@prisma/client";

interface WhereInputs {
  User: Prisma.UserWhereInput;
  TimeSlot: Prisma.TimeSlotWhereInput;
  Booking: Prisma.BookingWhereInput;
}

type FilterMapper<T extends keyof WhereInputs, V> = (
  where: WhereInputs[T],
  value: V,
) => WhereInputs[T];

type FilterBuilder<T extends keyof WhereInputs, V> = {
  [K in keyof V]: FilterMapper<T, V[K]>;
};

export default function filterBuilder<T extends keyof WhereInputs, V>(
  mappers: FilterBuilder<T, V>,
) {
  return (filters: Partial<V>): WhereInputs[T] => {
    let where: WhereInputs[T] = {} as WhereInputs[T];

    for (const key in filters) {
      const value = filters[key as keyof V];
      const mapper = mappers[key as keyof V];

      if (value !== undefined && mapper) {
        where = mapper(where, value);
      }
    }

    return where;
  };
}
