export const SUBMISSIONS_DEFAULT_SORTING_STATE = [
  { id: "createdAt", desc: false },
];

interface Languages {
  [key: string]: string;
}

export const LANGUAGES: Languages = {
  javascript: "Javascript",
  python: "Python",
  csharp: "C#",
  cpp: "C++",
  typescript: "Typescript",
  java: "Java",
};
