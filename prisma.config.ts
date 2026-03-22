// This file configures Prisma CLI (migrations, generate, studio).
// The runtime PrismaClient uses DATABASE_URL from the environment automatically in Prisma 7.
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // For migrations, use the direct (non-pooled) connection
    url: process.env["DATABASE_URL_UNPOOLED"] ?? process.env["DATABASE_URL"],
  },
});
