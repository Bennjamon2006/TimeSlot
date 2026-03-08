import { resolve } from "path";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { randomBytes } from "crypto";
import { hashSync } from "bcrypt";
import { prisma } from "./database";

const projectRoot = resolve(__dirname, "../..");
const adminCredentialsPath = resolve(
  projectRoot,
  ".runtime",
  "admin_credentials.txt",
);

export async function checkAdmin() {
  const admin = await prisma.user.findFirst({
    where: {
      role: "ADMIN",
    },
  });

  if (admin) {
    return;
  }

  const name = "Admin";
  const password = `admin-${randomBytes(8).toString("hex")}`;
  const email = "admin@example.com";

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
      role: "ADMIN",
    },
  });

  const now = new Date();

  const data = `Email: ${email}\nPassword: ${password}\n\nGenerated at: ${now.toISOString()}\n`;

  if (!existsSync(resolve(projectRoot, ".runtime"))) {
    mkdirSync(resolve(projectRoot, ".runtime"));
  }

  writeFileSync(adminCredentialsPath, data, "utf-8");

  console.log(
    "Admin user created. Credentials saved to:",
    adminCredentialsPath,
  );
}
