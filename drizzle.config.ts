import { defineConfig } from "drizzle-kit"

export default defineConfig( {
  dialect: "sqlite",
  driver: "expo",
  migrations: {
    table: 'migrations',
  },
  schema: "./src/entities/**/*.schema.ts",
  out: "./src/shared/migrations/",
} );

