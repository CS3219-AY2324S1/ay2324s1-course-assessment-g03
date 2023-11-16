import {
  MatchedRoom,
  RoomParams,
  WaitingUser,
  User,
  Preferences,
} from "./matching.interfaces";
import {
  comparePreferences,
  getIntersectionPreferences,
} from "../utils/preferences";
import { TIMEOUT_DURATION } from "./matching.constants";
import { createRoomSchema } from "./matching.schemas";

export class MatchingGateway {
  private waiting: WaitingUser[] = [];

  constructor() {}

  async createRoom(preferences: Preferences): Promise<string> {
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
        body: JSON.stringify(preferences),
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

    // Create room in communication service
    const communicationRes = await fetch(
      `${process.env.API_GATEWAY_URL}/api/communication/room`,
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
        body: JSON.stringify({ roomId }),
      }
    );

    return roomId;
  }

  async joinRandomRoom(roomParams: RoomParams): Promise<MatchedRoom | null> {
    for (let i = 0; i < this.waiting.length; i++) {
      const waitingUser = this.waiting[i];
      const intersectionPreferences: Preferences = getIntersectionPreferences(
        waitingUser.preferences,
        roomParams.preferences
      );
      if (comparePreferences(intersectionPreferences)) {
        const roomId = await this.createRoom(intersectionPreferences);
        this.waiting = this.waiting.filter(
          (waitingUser) => waitingUser.user.id != roomParams.user.id
        );
        console.log("FOUND MATCH", this.waiting);
        return {
          user1: waitingUser.user,
          user2: roomParams.user,
          roomId,
          preferences: roomParams.preferences,
        };
      }
    }
    const newWaiting: WaitingUser = {
      user: roomParams.user,
      preferences: roomParams.preferences,
    };
    this.waiting.push(newWaiting);
    console.log("JOINED QUEUE", this.waiting);

    setTimeout(() => {
      this.leaveRoom(roomParams.user);
    }, TIMEOUT_DURATION * 1000);
    return null;
  }

  leaveRoom(user: User) {
    const index = this.waiting.findIndex((w) => w.user.id === user.id);
    if (index !== -1) {
      this.waiting.splice(index, 1);
      console.log("LEFT QUEUE", this.waiting);
    }
  }
}
