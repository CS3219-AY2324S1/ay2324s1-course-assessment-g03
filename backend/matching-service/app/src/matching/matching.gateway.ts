import { v4 as uuidv4 } from "uuid";
import {
  MatchedRoom,
  Preferences,
  RoomParams,
  WaitingUser,
} from "./matching.interfaces";
import { comparePreferences } from "../utils/preferences";

export class MatchingGateway {
  private waiting: WaitingUser[] = [];

  constructor() {}

  createRoom(roomParams: RoomParams) {
    // change to zech's collab service create-room route
    const roomId = uuidv4();
    const newWaiting: WaitingUser = {
      user: roomParams.user,
      roomId,
      preferences: roomParams.preferences,
    };
    this.waiting.push(newWaiting);
    return roomId;
  }

  joinRandomRoom(roomParams: RoomParams): MatchedRoom | null {
    for (let i = 0; i < this.waiting.length; i++) {
      const waitingUser = this.waiting[i];
      if (comparePreferences(waitingUser.preferences, roomParams.preferences)) {
        const { roomId } = waitingUser;
        this.waiting.filter((waitingUser) => waitingUser.roomId != roomId);
        return {
          user1: waitingUser.user,
          user2: roomParams.user,
          roomId,
          preferences: roomParams.preferences,
        };
      }
    }
    return null;
  }
}
