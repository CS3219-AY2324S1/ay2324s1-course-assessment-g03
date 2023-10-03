import { create } from "zustand";

interface RoomState {
    roomId: string;
    modifyRoomId: (value: string) => void;
}

export const useRoomStore = create<RoomState>(set => ({
    roomId: "1",
    modifyRoomId: value => set(() => ({ roomId: value }))
}))