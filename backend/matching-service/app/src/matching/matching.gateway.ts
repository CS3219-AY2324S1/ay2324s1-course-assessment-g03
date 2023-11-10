import {
  MatchedRoom,
  RoomParams,
  WaitingUser,
  User,
} from "./matching.interfaces";
import { comparePreferences } from "../utils/preferences";
import { TIMEOUT_DURATION } from "./matching.constants";
import { createRoomSchema } from "./matching.schemas";

export class MatchingGateway {
  private waiting: WaitingUser[] = [];

  constructor() {}

  async createRoom(roomParams: RoomParams) {
    // TODO: Clean up string literals @Joel
    const res = await fetch(
      `${process.env.API_GATEWAY_URL}/api/collaboration/room`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.API_GATEWAY_AUTH_SECRET
            ? {
                ["api-gateway-auth-secret"]:
                  process.env.API_GATEWAY_AUTH_SECRET,
              }
            : {}),
        },
        body: JSON.stringify(roomParams.preferences),
      }
    );
    const dataJson = await res.json();
    const safeParsedRoomData = createRoomSchema.safeParse(dataJson);

    if (!safeParsedRoomData.success) {
      throw new Error("Mismatch in expected createRoom schema");
    }

    if (safeParsedRoomData.data.status !== "success") {
      throw new Error("Failed to create room");
    }

    const roomId = dataJson?.data?.roomId;

    const newWaiting: WaitingUser = {
      user: roomParams.user,
      roomId,
      preferences: roomParams.preferences,
    };
    this.waiting.push(newWaiting);

    setTimeout(() => {
      this.leaveRoom(roomParams.user);
    }, TIMEOUT_DURATION * 1000);

    return roomId;
  }

  joinRandomRoom(roomParams: RoomParams): MatchedRoom | null {
    for (let i = 0; i < this.waiting.length; i++) {
      const waitingUser = this.waiting[i];
      if (comparePreferences(waitingUser.preferences, roomParams.preferences)) {
        const { roomId } = waitingUser;
        this.waiting = this.waiting.filter((waitingUser) => waitingUser.roomId != roomId);
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

  leaveRoom(user: User) {
    const index = this.waiting.findIndex((w) => w.user.id === user.id);
    if (index !== -1) {
      this.waiting.splice(index, 1);
    }
  }
}
