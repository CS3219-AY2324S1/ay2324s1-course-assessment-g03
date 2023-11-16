import { useQuery } from "@tanstack/react-query";
import { QUESTIONS_QUERY_KEY } from "../constants";
import { API_ENDPOINT } from "@/constants/api";
import { backendApi } from "@/lib/axios";
import { safeParse } from "@/lib/safeParse";
import { SortBy, SortOrder, getQuestionsResponseSchema } from "../types";
import { SortingState } from "@tanstack/react-table";
import { QuestionsFilters } from "../components/QuestionsFilters";

interface QuestionsQueryOptions {
  pageNum: number;
  pageSize: number;
  sorting: SortingState;
  search: string;
  filters: QuestionsFilters;
}

export const useQuestionsQuery = ({
  pageNum,
  pageSize,
  sorting,
  search,
  filters,
}: QuestionsQueryOptions) => {
  return useQuery({
    queryKey: [QUESTIONS_QUERY_KEY],
    queryFn: async () => {
      const { data } = await backendApi.get(`${API_ENDPOINT.QUESTIONS_VIEW}`, {
        params: {
          page: pageNum,
          limit: pageSize,
          sort_by: sorting[0].id as SortBy,
          order: sorting[0].desc ? SortOrder.Desc : SortOrder.Asc,
          search,
          category: filters.category,
          difficulty: filters.difficulty,
          topic: filters.topic,
          paid_only:
            filters.status.length === 0 ||
            (filters.status.includes("paidOnly") &&
              filters.status.includes("free"))
              ? undefined
              : filters.status.includes("paidOnly")
              ? true
              : false,
        },
        paramsSerializer: { indexes: null },
      });
      return safeParse(getQuestionsResponseSchema, data);
    },
  });
};
