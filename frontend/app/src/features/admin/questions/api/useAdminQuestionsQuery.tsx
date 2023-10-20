import { useQuery } from "@tanstack/react-query";
import { QUESTIONS_QUERY_KEY } from "../constants";
import { API_ENDPOINT } from "@/constants/api";
import { backendApi } from "@/lib/axios";
import { safeParse } from "@/lib/safeParse";
import { SortBy, SortOrder, getQuestionsResponseSchema } from "../types";
import { SortingState } from "@tanstack/react-table";

interface AdminQuestionsQueryOptions {
  pageNum: number;
  pageSize: number;
  sorting: SortingState;
}

export const useAdminQuestionsQuery = ({
  pageNum,
  pageSize,
  sorting,
}: AdminQuestionsQueryOptions) => {
  return useQuery({
    queryKey: [QUESTIONS_QUERY_KEY],
    queryFn: async () => {
      const { data } = await backendApi.get(`${API_ENDPOINT.ADMIN_QUESTIONS}`, {
        params: {
          page: pageNum,
          limit: pageSize,
          sort_by: sorting[0].id as SortBy,
          order: sorting[0].desc ? SortOrder.Desc : SortOrder.Asc,
        },
      });
      return safeParse(getQuestionsResponseSchema, data);
    },
  });
};
