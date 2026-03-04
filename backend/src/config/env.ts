export const env = {
  server: {
    port: parseInt(process.env.PORT || "4000", 10),
    host: process.env.HOST || "localhost",
  },
  database: {
    url:
      process.env.POSTGRES_URL ||
      "postgresql://user:password@localhost:5432/timeslot",
  },
};
