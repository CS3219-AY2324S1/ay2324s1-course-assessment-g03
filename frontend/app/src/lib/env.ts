import zod from "zod";

const envSchema = zod.object({
  VITE_BACKEND_URL: zod.string().url().nonempty(),
});

export const env = envSchema.parse(import.meta.env);
