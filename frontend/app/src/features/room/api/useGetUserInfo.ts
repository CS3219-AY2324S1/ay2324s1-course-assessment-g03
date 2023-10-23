import { API_ENDPOINT } from "@/constants/api";
import { backendApi } from "@/lib/axios";
import { userSchema } from "@/types/user";
import { useQuery, useQueryClient } from "react-query";

const GET_USER_INFO_KEY = "get-user-info"


const getUserInfo = async (id: string) => {
    const { data } = await backendApi.get(`${API_ENDPOINT.USERS}/id/${id}`)
    return userSchema.parse(data)
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