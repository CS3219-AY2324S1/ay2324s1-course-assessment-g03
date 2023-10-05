import { Socket } from "socket.io";

const DIFFICULTY = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
} as const;

type DifficultyType = (typeof DIFFICULTY)[keyof typeof DIFFICULTY];

const TOPIC_TAG = {
  HASH_TABLE: "Hash Table",
  ARRAY: "Array",
  STRING: "String",
  SLIDING_WINDOW: "Sliding Window",
  TWO_POINTERS: "Two Pointers",
  BINARY_SEARCH: "Binary Search",
  RECURSION: "Recursion",
  LINKED_LIST: "Linked List",
  MATH: "Math",
  DIVIDE_AND_CONQUER: "Divide and Conquer",
  DYNAMIC_PROGRAMMING: "Dynamic Programming",
} as const;

type TopicTagType = (typeof TOPIC_TAG)[keyof typeof TOPIC_TAG];
export interface Preferences {
  difficulty: DifficultyType[];
  category: TopicTagType[];
}

export interface UserSocket {
  user: number;
  socket: Socket;
}

export interface WaitingSocket {
  roomId: string;
  userSocket: UserSocket;
  preferences: Preferences;
}
