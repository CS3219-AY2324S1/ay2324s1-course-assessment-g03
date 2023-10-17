export const DIFFICULTY = {
    EASY: "Easy",
    MEDIUM: "Medium",
    HARD: "Hard",
} as const;

export type DifficultyValue = typeof DIFFICULTY[keyof typeof DIFFICULTY];

export const TOPIC_TAG = {
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

export type TopicValue = typeof TOPIC_TAG[keyof typeof TOPIC_TAG];
