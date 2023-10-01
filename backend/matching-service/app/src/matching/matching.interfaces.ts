import { Socket } from "socket.io";

export interface Preferences {
  difficulty: string[];
  category: string[];
}

export interface UserSocket {
  user: number;
  socket: Socket;
}

export interface WaitingSocket {
  roomId: string;
  userSocket: UserSocket;
  preferences: Preferences;
}
