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

function JoinPage() {
  const { data } = useAuth();
  const user = data?.user;
  const navigate = useNavigate();
  const [isWaitingForMatch, setIsWaitingForMatch] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  const joinRoom = async (preferences: Preferences) => {
    if (socketRef.current == null) {
      // TODO: make connection through API gateway URL
      socketRef.current = io(env.VITE_MATCHING_SERVICE_URL);
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
