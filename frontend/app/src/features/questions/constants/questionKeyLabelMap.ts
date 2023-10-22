export interface KeyLabel {
  [key: string]: string;
  label: string;
}

export const QUESTION_KEY_LABEL_MAP: KeyLabel[] = [
  {
    key: "category",
    label: "Category",
  },
  {
    key: "description",
    label: "Description",
  },
  {
    key: "difficulty",
    label: "Difficulty",
  },
  {
    key: "title",
    label: "Title",
  },
  {
    key: "topic_tags",
    label: "Topic Tags",
  },
  {
    key: "url",
    label: "URL",
  },
];
