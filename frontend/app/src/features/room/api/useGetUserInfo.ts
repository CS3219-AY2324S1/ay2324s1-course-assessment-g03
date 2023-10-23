import { API_ENDPOINT } from "@/constants/api";
import { makeSuccessResponseSchema } from "@/lib/api";
import { backendApi } from "@/lib/axios";
import { useQuery, useQueryClient } from "react-query";
import { z } from "zod";

const GET_USER_INFO_KEY = "get-user-info"

const getUserInfoResponseSchema = makeSuccessResponseSchema(
    z.object({
        user: z.object({
            id: z.string(),
            email: z.string(),
            role: z.string(),
            name: z.string().nullable().optional().transform(val => val ?? undefined),
            avatarUrl: z.string().nullable().optional().transform(val => val ?? undefined),
        })
    })
)

const getUserInfo = async (id: string) => {
    const { data } = await backendApi.get(`${API_ENDPOINT.USERS}/id/${id}`)
    return getUserInfoResponseSchema.parse(data)
}

export const useGetUserInfo = (id: string) => {

    const queryClient = useQueryClient();

    return useQuery({
        queryKey: [GET_USER_INFO_KEY],
        queryFn: () => getUserInfo(id),
        enabled: !!id,
        retry: false,
        onSuccess() {
            setTimeout(() => { queryClient.invalidateQueries(GET_USER_INFO_KEY) }, 10000)
        }
    })
}