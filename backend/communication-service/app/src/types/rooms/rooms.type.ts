export type User = {
  id: string;
  connected?: boolean;
  email: string;
  role: string;
  name?: string | undefined;
  avatarUrl?: string | undefined;
};

export const System = "System" as const;

export type Message = {
  sender: User | typeof System;
  message: string;
};

export type Room = {
  created: moment.Moment;
  updated: moment.Moment;
  users: Map<string, User>;
  messages: Message[];
};
