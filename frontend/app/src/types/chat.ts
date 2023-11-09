import { User } from "./user";

export const System = "System" as const;

export type Message = {
  sender: User | typeof System;
  message: string;
};
