import zod from "zod";

const envSchema = zod.object({
  VITE_BACKEND_URL: zod.string().url().nonempty(),
  VITE_MATCHING_SERVICE_URL: zod.string().url().nonempty(),
  VITE_COLLABORATION_SERVICE_URL: zod.string().url().nonempty(),
});

export const env = envSchema.parse(import.meta.env);
