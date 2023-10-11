import { z } from "zod";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvSchemaType { }
  }
}

export const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "staging", "production"])
    .default("development"),
  PORT: z.string().default("80"),
  DATABASE_URL: z.string().url().default("mongodb://admin:password@localhost:27017/user-service?authSource=admin"),
  /**
   * For CORS
   */
  FRONTEND_ORIGIN: z.string().url().default("http://localhost:8000"),
  API_GATEWAY_URL: z.string().url().default("http://api-gateway"),
  API_GATEWAY_AUTH_SECRET: z.string().nonempty(),
});

type EnvSchemaType = z.infer<typeof envSchema>;