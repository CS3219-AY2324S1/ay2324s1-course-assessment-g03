import { create } from "zustand";

interface ExampleState {
  count: number;
  modify: (value: number) => void;
}

export const useExampleStore = create<ExampleState>((set) => ({
  count: 0,
  modify: (value) => set((state) => ({ count: state.count + value })),
}));
