export type User = {
  id: string;
  connected?: boolean;
  email: string;
  role: string;
  name?: string | undefined;
  avatarUrl?: string | undefined;
};

export type Message = {
  sender: User | "System";
  message: string;
};

export type Room = {
  created: moment.Moment;
  updated: moment.Moment;
  users: Map<string, User>;
  messages: Message[];
};
