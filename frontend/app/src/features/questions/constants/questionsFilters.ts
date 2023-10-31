export interface Option {
  value: string;
  label: string;
}

interface QuestionsFilter {
  key: string;
  title: string;
  type: "radio" | "checkbox" | undefined;
  options: Option[];
}

export const QUESTIONS_FILTERS: QuestionsFilter[] = [
  {
    key: "category",
    title: "Category",
    type: "checkbox",
    options: [
      { value: "Algorithms", label: "Algorithms" },
      { value: "Database", label: "Database" },
      { value: "Shell", label: "Shell" },
    ],
  },
  {
    key: "difficulty",
    title: "Difficulty",
    type: "checkbox",
    options: [
      { value: "Easy", label: "Easy" },
      { value: "Medium", label: "Medium" },
      { value: "Hard", label: "Hard" },
    ],
  },
  {
    key: "status",
    title: "Status",
    type: "checkbox",
    options: [
      { value: "paidOnly", label: "Paid Only" },
      { value: "free", label: "Free" },
    ],
  },
  {
    key: "topic",
    title: "Topic",
    type: "checkbox",
    options: [
      { value: "Hash Table", label: "Hash Table" },
      { value: "Array", label: "Array" },
      { value: "String", label: "String" },
      { value: "Sliding Window", label: "Sliding Window" },
      { value: "Two Pointers", label: "Two Pointers" },
      { value: "Binary Search", label: "Binary Search" },
      { value: "Recursion", label: "Recursion" },
      { value: "Linked List", label: "Linked List" },
      { value: "Math", label: "Math" },
      { value: "Divide and Conquer", label: "Divide and Conquer" },
      { value: "Dynamic Programming", label: "Dynamic Programming" },
      { value: "Shell", label: "Shell" },
      { value: "Database", label: "Database" },
      { value: "Stack", label: "Stack" },
      { value: "Trie", label: "Trie" },
      { value: "Heap", label: "Heap" },
      { value: "Sort", label: "Sort" },
      { value: "Bit Manipulation", label: "Bit Manipulation" },
      { value: "Tree", label: "Tree" },
      { value: "Depth-first Search", label: "Depth-first Search" },
      { value: "Breadth-first Search", label: "Breadth-first Search" },
      { value: "Union Find", label: "Union Find" },
      { value: "Graph", label: "Graph" },
      { value: "Design", label: "Design" },
      { value: "Topological Sort", label: "Topological Sort" },
      { value: "Binary Indexed Tree", label: "Binary Indexed Tree" },
      { value: "Segment Tree", label: "Segment Tree" },
      { value: "Binary Search Tree", label: "Binary Search Tree" },
      { value: "Brainteaser", label: "Brainteaser" },
      { value: "Memoization", label: "Memoization" },
      { value: "Queue", label: "Queue" },
      { value: "Minimax", label: "Minimax" },
      { value: "Rejection Sampling", label: "Rejection Sampling" },
      { value: "Reservoir Sampling", label: "Reservoir Sampling" },
      { value: "Ordered Map", label: "Ordered Map" },
      { value: "Geometry", label: "Geometry" },
      { value: "Random", label: "Random" },
      { value: "Sliding Puzzle", label: "Sliding Puzzle" },
      { value: "Line Sweep", label: "Line Sweep" },
      { value: "Rolling Hash", label: "Rolling Hash" },
      { value: "Suffix Array", label: "Suffix Array" },
      { value: "Binary Search", label: "Binary Search" },
      { value: "Brainteaser", label: "Brainteaser" },
      { value: "Depth-first Search", label: "Depth-first Search" },
      { value: "Breadth-first Search", label: "Breadth-first Search" },
      { value: "Union Find", label: "Union Find" },
      { value: "Graph", label: "Graph" },
    ],
  },
];
