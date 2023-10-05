import { v4 as uuidv4 } from "uuid";
import { Preferences, UserSocket, WaitingSocket } from "./matching.interfaces";
import { comparePreferences } from "../utils/preferences";

export class MatchingGateway {
  public roomIdToSockets: Map<string, UserSocket[]> = new Map();
  public waiting: WaitingSocket[] = [];
  private roomIdToLinkWaiting: Map<string, UserSocket> = new Map();

  constructor() {}

  createRoom(socket: any) {
    const roomId = uuidv4();
    socket.join(roomId);
    this.waiting.push({
      roomId: uuidv4(),
      // Hard code one existing user for testing purposes
      preferences: {
        difficulty: ["Medium"],
        category: ["Array"],
      },
      userSocket: { user: 1, socket },
    });
  }

  joinRandomRoom(
    user: UserSocket,
    preferences: Preferences,
    socket: any
  ): string {
    let roomId: string = "";
    this.waiting.forEach((room) => {
      if (comparePreferences(room.preferences, preferences)) {
        roomId = room.roomId;
        socket.join(roomId);
        this.roomIdToSockets.set(roomId, [user, room.userSocket]);
        return;
      }
    });
    this.waiting.filter((room) => room.roomId != roomId);
    return roomId;
  }
}
