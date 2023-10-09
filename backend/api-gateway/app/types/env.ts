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
  USERS_SERVICE_URL: z.string().url().default("http://users-service"),
  QUESTIONS_SERVICE_URL: z.string().url().default("http://questions-service"),
  MATCHING_SERVICE_URL: z.string().url().default("http://matching-service"),
  COLLABORATION_SERVICE_URL: z
    .string()
    .url()
    .default("http://collaboration-service"),
});

type EnvSchemaType = z.infer<typeof envSchema>;
