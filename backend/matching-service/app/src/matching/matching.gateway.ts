import { MatchedRoom, RoomParams, WaitingUser } from "./matching.interfaces";
import { comparePreferences } from "../utils/preferences";

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

    // TODO: Properly validate API response schema @Joel
    if (dataJson.status !== "success" || !dataJson.data) {
      // TODO: Properly handle error @Joel (instead of crashing the server, it should send an appropriate response to the client)
      throw new Error("Failed to create room");
    }

    const roomId = dataJson?.data?.roomId;

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
