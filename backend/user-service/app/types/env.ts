import { z } from "zod";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvSchemaType {}
  }
}

export const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "staging", "production"])
    .default("development"),
  PORT: z.string().default("80"),
  DATABASE_URL: z
    .string()
    .url()
    .default(
      "mysql://k145f63zxaiuxztap2ch:pscale_pw_8loz6XgHYF3iCmW4BeIUgdQYk4zGOsAKf1P7P5QTUkm@aws.connect.psdb.cloud/user?sslaccept=strict"
    ),
  /**
   * For CORS
   */
  FRONTEND_ORIGIN: z.string().url().default("http://localhost:8000"),
  API_GATEWAY_URL: z.string().url().default("http://api-gateway"),
  API_GATEWAY_AUTH_SECRET: z.string().min(1),
});

type EnvSchemaType = z.infer<typeof envSchema>;
