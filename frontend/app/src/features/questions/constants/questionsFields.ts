import { FormValues, Option } from "../components/UpsertQuestionModal";
import { INPUT_TYPE } from "../types";

export interface QuestionsField {
  key: keyof FormValues;
  label: string;
  type: string;
  options: Option[];
}

export const QUESTIONS_FIELDS: QuestionsField[] = [
  {
    key: "title",
    label: "Title",
    type: INPUT_TYPE.TEXT,
    options: [],
  },
  {
    key: "category",
    label: "Category",
    type: INPUT_TYPE.SELECT,
    options: [
      { label: "Algorithms", value: "Algorithms" },
      { label: "Database", value: "Database" },
      { label: "Shell", value: "Shell" },
    ],
  },
  {
    key: "difficulty",
    label: "Difficulty",
    type: INPUT_TYPE.SELECT,
    options: [
      { label: "Easy", value: "Easy" },
      { label: "Medium", value: "Medium" },
      { label: "Hard", value: "Hard" },
    ],
  },
  {
    key: "topic_tags",
    label: "Topic Tags",
    type: INPUT_TYPE.MULTISELECT,
    options: [
      { label: "Hash Table", value: "Hash Table" },
      { label: "Array", value: "Array" },
      { label: "String", value: "String" },
      { label: "Sliding Window", value: "Sliding Window" },
      { label: "Two Pointers", value: "Two Pointers" },
      { label: "Binary Search", value: "Binary Search" },
      { label: "Recursion", value: "Recursion" },
      { label: "Linked List", value: "Linked List" },
      { label: "Math", value: "Math" },
      { label: "Divide and Conquer", value: "Divide and Conquer" },
      { label: "Dynamic Programming", value: "Dynamic Programming" },
      { label: "Shell", value: "Shell" },
      { label: "Database", value: "Database" },
      { label: "Stack", value: "Stack" },
      { label: "Trie", value: "Trie" },
      { label: "Heap", value: "Heap" },
      { label: "Sort", value: "Sort" },
      { label: "Bit Manipulation", value: "Bit Manipulation" },
      { label: "Tree", value: "Tree" },
      { label: "Depth-first Search", value: "Depth-first Search" },
      { label: "Breadth-first Search", value: "Breadth-first Search" },
      { label: "Union Find", value: "Union Find" },
      { label: "Graph", value: "Graph" },
      { label: "Design", value: "Design" },
      { label: "Topological Sort", value: "Topological Sort" },
      { label: "Binary Indexed Tree", value: "Binary Indexed Tree" },
      { label: "Segment Tree", value: "Segment Tree" },
      { label: "Binary Search Tree", value: "Binary Search Tree" },
      { label: "Brainteaser", value: "Brainteaser" },
      { label: "Memoization", value: "Memoization" },
      { label: "Queue", value: "Queue" },
      { label: "Minimax", value: "Minimax" },
      { label: "Rejection Sampling", value: "Rejection Sampling" },
      { label: "Reservoir Sampling", value: "Reservoir Sampling" },
      { label: "Ordered Map", value: "Ordered Map" },
      { label: "Geometry", value: "Geometry" },
      { label: "Random", value: "Random" },
      { label: "Sliding Puzzle", value: "Sliding Puzzle" },
      { label: "Line Sweep", value: "Line Sweep" },
      { label: "Rolling Hash", value: "Rolling Hash" },
      { label: "Suffix Array", value: "Suffix Array" },
      { label: "Binary Search", value: "Binary Search" },
      { label: "Brainteaser", value: "Brainteaser" },
      { label: "Depth-first Search", value: "Depth-first Search" },
      { label: "Breadth-first Search", value: "Breadth-first Search" },
      { label: "Union Find", value: "Union Find" },
      { label: "Graph", value: "Graph" },
    ],
  },
  {
    key: "description",
    label: "Description",
    type: INPUT_TYPE.TEXTAREA,
    options: [],
  },
  {
    key: "url",
    label: "URL",
    type: INPUT_TYPE.TEXT,
    options: [],
  },
];
