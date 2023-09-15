import { useQuery, useQueryClient } from "react-query";
import { API_URL } from "../pages";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/auth`, {
        credentials: "include",
      });
      const { data } = await res.json();
      if (!res.ok) {
        throw new Error(data.message ?? "User not authenticated");
      }
      return data;
    },
  });

  const { refetch: logout } = useQuery({
    queryKey: ["logout"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      const { data } = await res.json();
      if (!res.ok) {
        throw new Error(data.message ?? "Could not log out");
      }
      return data;
    },
    enabled: false,
    retry: false,
    onSuccess: () => {
      queryClient.setQueryData(["auth"], undefined);
    },
  });

  return { user: data?.user, logout };
};
