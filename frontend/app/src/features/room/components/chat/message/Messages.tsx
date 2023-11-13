import { useAuth } from "@/hooks";
import { useChatStore } from "@/stores/useChatStore";
import { System } from "@/types/chat";
import { useShallow } from "zustand/react/shallow";
import { SystemMessage } from "./SystemMessage";
import { UserMessage } from "./UserMessage";
import { User } from "@/types/user";
import { Flex } from "@chakra-ui/react";
import AlwaysScrollToBottom from "@/components/common/AlwaysScrollToBottom";

export const Messages = (): JSX.Element => {
  const { messages, deleteMessages } = useChatStore(
    useShallow(state => ({
      messages: state.messages,
      roomId: state.roomId,
      deleteMessages: state.deleteMessages,
    })),
  );
  const user: User = useAuth().data?.user as User;

  // Clear messages when changing rooms
  useChatStore.subscribe(
    state => state.roomId,
    (newRoomId, oldRoomId) => {
      if (newRoomId !== oldRoomId) {
        deleteMessages();
      }
    },
  );

  return (
    <Flex
      flex={1}
      justify="start"
      overflowY="scroll"
      flexDirection="column"
      w="100%"
      maxHeight="50vh"
      minHeight="300"
      gap={2}
    >
      {messages.map(({ message, sender }, index) =>
        sender === System ? (
          <SystemMessage message={message} key={index} />
        ) : (
          <>
            <UserMessage
              message={message}
              sender={sender}
              isUser={sender.id.toString() === user.id.toString()}
              key={index}
            />
          </>
        ),
      )}
      <AlwaysScrollToBottom dependency={messages} />
    </Flex>
  );
};
