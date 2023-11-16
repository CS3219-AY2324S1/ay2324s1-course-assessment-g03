import { z } from "zod";

export const safeParse = (schema: z.ZodTypeAny, data: any) => {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    console.error("Unexpected response shape:", parsed.error);
    return data;
  }

  return parsed.data;
};
