import { useAuth } from "@/hooks";
import { useChatStore } from "@/stores/useChatStore";
import { System } from "@/types/chat";
import { useShallow } from "zustand/react/shallow";
import { SystemMessage } from "./SystemMessage";
import { UserMessage } from "./UserMessage";
import { User } from "@/types/user";

export const MessageContainer = (): JSX.Element => {
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
    <div>
      {messages.map(({ message, sender }) =>
        sender === System ? (
          <SystemMessage message={message} />
        ) : (
          <UserMessage
            message={message}
            sender={sender}
            isUser={sender.id === user.id}
          />
        ),
      )}
    </div>
  );
};
