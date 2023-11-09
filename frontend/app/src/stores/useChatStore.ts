import { Message } from "@/types/chat";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface ChatProps {
  roomId: string;
  messages: Message[];
}

interface ChatState extends ChatProps {
  addMessage: (message: Message) => void;
  populateMessages: (messages: Message[]) => void;
  deleteMessages: () => void;
  setRoomId: (roomId: string) => void;
}

export type ChatStore = ReturnType<typeof useChatStore>;

export const useChatStore = create<ChatState>()(
  subscribeWithSelector(set => ({
    roomId: "",
    messages: [],
    addMessage: (message: Message) =>
      set((state: ChatState) => ({ messages: [...state.messages, message] })),
    populateMessages: (messages: Message[]) => set({ messages }),
    deleteMessages: () => set({ messages: [] }),
    setRoomId: (roomId: string) => set({ roomId }),
  })),
);
