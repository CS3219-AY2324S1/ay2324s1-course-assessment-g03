import { WEBSOCKET_PATH } from "@/constants/api";
import { COMMUNICATION_SOCKET_API } from "@/constants/socket";
import { useAuth } from "@/hooks";
import { env } from "@/lib/env";
import { Box, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { User } from "@/types/user";
import { useChatStore } from "@/stores/useChatStore";
import { useShallow } from "zustand/react/shallow";
import { Messages } from "./message/Messages";
import ChatInput from "./ChatInput";

interface ChatBoxProps {
  roomId: string;
}

export const ChatBox = ({ roomId }: ChatBoxProps): JSX.Element => {
  const user = useAuth().data?.user as User;
  const [socket, setSocket] = useState<Socket | null>(null);
  const { addMessage, populateMessages, setRoomId } = useChatStore(
    useShallow(state => ({
      addMessage: state.addMessage,
      populateMessages: state.populateMessages,
      setRoomId: state.setRoomId,
    })),
  );
  const toast = useToast();

  useEffect(() => {
    if (!user?.id) return;

    const newSocket = io(`${env.VITE_BACKEND_URL}`, {
      path: WEBSOCKET_PATH.COMMUNICATION,
      withCredentials: true,
      query: { ...user, roomId },
    });

    newSocket.on(
      COMMUNICATION_SOCKET_API.GET_MESSAGES_RESPONSE,
      populateMessages,
    );

    newSocket.on(COMMUNICATION_SOCKET_API.CHAT_MESSAGE_RESPONSE, addMessage);

    newSocket.on(COMMUNICATION_SOCKET_API.ERROR, (error: string) => {
      toast({
        status: "error",
        title: error,
        isClosable: true,
      });
    });

    newSocket.emit(COMMUNICATION_SOCKET_API.GET_MESSAGES);

    setSocket(newSocket);
    setRoomId(roomId);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [addMessage, populateMessages, setRoomId, roomId, user, user?.id, toast]);

  if (!socket) {
    return <Spinner />;
  }

  return (
    <Box>
      <Messages />
      <ChatInput socket={socket} />
    </Box>
  );
};
