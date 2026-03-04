import { config } from "dotenv";
config();

import { env } from "./config/env";
import { connectToDatabase } from "./database";
import app from "./app";

async function startServer() {
  await connectToDatabase();

  const { port, host } = env.server;

  app.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start the server:", error);
  process.exit(1); // Exit the process with an error code
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1); // Exit the process with an error code
});
