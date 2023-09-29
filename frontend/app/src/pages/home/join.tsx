import { useState } from "react";
import { Page } from "@/components";
import { FindingMatchCard, SelectPreferencesCard } from "@/features/matching";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { Preferences } from "@/types/room";

function JoinPage() {
  const navigate = useNavigate();
  const socket = io("http://localhost:8004");
  const [waiting, setWaiting] = useState<boolean>(false);

  const joinRoom = (preferences: Preferences) => {
    setWaiting(true);
    socket.emit(
      "join",
      preferences,
      (response: { status: string; roomId: string }) => {
        if (response.status === "joined") {
          navigate(`room/${response.roomId}`);
        }
      },
    );
  };

  const leaveWaiting = () => {
    setWaiting(false);
    socket.disconnect();
  };

  return (
    <Page display="grid" placeItems="center">
      {waiting ? (
        <FindingMatchCard leaveCallback={leaveWaiting} />
      ) : (
        <SelectPreferencesCard joinCallback={joinRoom} />
      )}
    </Page>
  );
}

export default JoinPage;
