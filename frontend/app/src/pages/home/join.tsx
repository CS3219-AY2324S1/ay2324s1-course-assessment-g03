import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import { Page } from "@/components";
import { MATCHING_EVENTS } from "@/constants/matching";
import { ROUTE } from "@/constants/route";
import { FindingMatchCard, SelectPreferencesCard } from "@/features/matching";
import { useAuth } from "@/hooks";
import { env } from "@/lib/env";
import { Preferences, matchingSchema } from "@/types/matching";
import { WEBSOCKET_PATH } from "@/constants/api";

function JoinPage() {
  const { data } = useAuth();
  const user = data?.user;
  const navigate = useNavigate();
  const [isWaitingForMatch, setIsWaitingForMatch] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  const joinRoom = async (preferences: Preferences) => {
    if (socketRef.current == null) {
      socketRef.current = io(env.VITE_BACKEND_URL, {
        path: WEBSOCKET_PATH.MATCHING,
        withCredentials: true,
      });
    }

    const { current: socket } = socketRef;

    setIsWaitingForMatch(true);
    socket.connect();
    socket.emit(MATCHING_EVENTS.JOIN_ROOM, user, preferences);
    socket.on(MATCHING_EVENTS.FOUND_ROOM, room => {
      const matchData = matchingSchema.parse(room);
      navigate(`${ROUTE.ROOM}/${matchData.roomId}`);
    });
  };

  const leaveWaiting = () => {
    setIsWaitingForMatch(false);
    if (socketRef.current !== null) {
      socketRef.current.disconnect();
    }
  };

  return (
    <Page display="grid" placeItems="center">
      {isWaitingForMatch ? (
        <FindingMatchCard leaveCallback={leaveWaiting} />
      ) : (
        <SelectPreferencesCard joinCallback={joinRoom} />
      )}
    </Page>
  );
}

export default JoinPage;
