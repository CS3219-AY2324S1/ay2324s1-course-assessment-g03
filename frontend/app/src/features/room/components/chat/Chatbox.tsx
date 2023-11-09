import { WEBSOCKET_PATH } from "@/constants/api";
import { COMMUNICATION_SOCKET_API } from "@/constants/socket";
import { useAuth } from "@/hooks";
import { env } from "@/lib/env";
import { Message } from "@/types/chat";
import { Button, Flex, Input, Spinner, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { User } from "@/types/user";
import { useChatStore } from "@/stores/useChatStore";
import { useShallow } from "zustand/react/shallow";

interface ChatBoxProps {
  roomId: string;
}

export const ChatBox = ({ roomId }: ChatBoxProps): JSX.Element => {
  const user = useAuth().data?.user as User;
  const [socket, setSocket] = useState<Socket | null>(null);
  const [inputMessage, setInputMessage] = useState<string>("");
  const { messages, addMessage, populateMessages, setRoomId } = useChatStore(
    useShallow(state => ({
      messages: state.messages,
      addMessage: state.addMessage,
      populateMessages: state.populateMessages,
      setRoomId: state.setRoomId,
    })),
  );

  useEffect(() => {
    if (!user?.id) return;

    const newSocket = io(`${env.VITE_BACKEND_URL}`, {
      path: WEBSOCKET_PATH.COMMUNICATION,
      withCredentials: true,
      query: { ...user },
    });

    newSocket.on(
      COMMUNICATION_SOCKET_API.GET_MESSAGES_RESPONSE,
      populateMessages,
    );

    newSocket.on(COMMUNICATION_SOCKET_API.CHAT_MESSAGE_RESPONSE, addMessage);

    newSocket.emit(COMMUNICATION_SOCKET_API.GET_MESSAGES);

    setSocket(newSocket);
    setRoomId(roomId);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [addMessage, populateMessages, setRoomId, roomId, user, user?.id]);

  if (!socket) {
    return <Spinner />;
  }

  const handleSendMessage = () => {
    if (inputMessage.trim().length <= 0) return;
    socket.emit(COMMUNICATION_SOCKET_API.CHAT_MESSAGE, {
      userId: user.id,
      message: inputMessage,
    });
    setInputMessage("");
  };

  const handleInputKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    } else {
      setInputMessage(e.currentTarget.value);
    }
  };

  return (
    <VStack>
      <Flex flexDirection="column" w="100%" mt="5">
        {messages.map(message => {
          return (
            <div
              key={Math.random()}
            >{`${message.sender}: ${message.message}`}</div>
          );
        })}
      </Flex>
      <Flex w="100%" mt="5">
        <Input
          placeholder="Type Something..."
          border="none"
          borderRadius="none"
          _focus={{
            border: "1px solid black",
          }}
          value={inputMessage}
          onKeyDown={handleInputKeydown}
        />
        <Button
          bg="black"
          color="white"
          borderRadius="none"
          _hover={{
            bg: "white",
            color: "black",
            border: "1px solid black",
          }}
          disabled={inputMessage.trim().length <= 0}
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </Flex>
    </VStack>
  );
};
