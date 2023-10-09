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
  /**
   * For CORS
   */
  FRONTEND_ORIGIN: z.string().url().default("http://localhost:8000"),
  /**
   * For auth module
   */
  JWT_COOKIE_NAME: z.string().default("peerprep-token"),
  JWT_SECRET: z.string().nonempty(),
  GITHUB_CLIENT_ID: z.string().nonempty(),
  GITHUB_CLIENT_SECRET: z.string().nonempty(),
  GITHUB_CALLBACK_URL: z.string().url().nonempty(),
  /**
   * For services
   */
  USERS_SERVICE_URL: z.string().url().default("http://localhost:8002"),
  QUESTIONS_SERVICE_URL: z.string().url().default("http://localhost:8003"),
  MATCHING_SERVICE_URL: z.string().url().default("http://localhost:8004"),
  COLLABORATION_SERVICE_URL: z.string().url().default("http://localhost:8005"),
});

type EnvSchemaType = z.infer<typeof envSchema>;
