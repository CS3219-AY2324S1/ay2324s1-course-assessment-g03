import { SortBy } from "../types";

export const QUESTIONS_QUERY_KEY = "QUESTIONS";
export const DEFAULT_SORTING_STATE = [{ id: SortBy.Id, desc: false }];
export const DEFAULT_PAGE_NUM = 1;
export const DEFAULT_PAGE_SIZE = 10;

export const INIT_QUESTIONS_FILTERS = {
  difficulty: [],
  category: [],
  topic: [],
  status: [],
};
