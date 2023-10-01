import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import { Page } from "@/components";
import { MATCH_SOCKET_EVENTS } from "@/constants/matching";
import { ROUTE } from "@/constants/route";
import { FindingMatchCard, SelectPreferencesCard } from "@/features/matching";
import { env } from "@/lib/env";
import { Matching, Preferences, matchingSchema } from "@/types/matching";

function JoinPage() {
  const navigate = useNavigate();
  const socket = io(env.MATCHING_SERVICE_URL);
  const [isWaitingForMatch, setIsWaitingForMatch] = useState<boolean>(false);

  const joinRoom = (preferences: Preferences) => {
    setIsWaitingForMatch(true);
    socket.emit(MATCH_SOCKET_EVENTS.JOIN, preferences, (response: Matching) => {
      try {
        const matchingResponse = matchingSchema.parse(response);
        if (matchingResponse.status === "joined") {
          navigate(`${ROUTE.ROOM}/${matchingResponse.roomId}`);
        }
      } catch (error) {
        // TODO: error handling for failed matching
        console.log(error);
      }
    });
  };

  const leaveWaiting = () => {
    setIsWaitingForMatch(false);
    socket.disconnect();
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
