import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API_URL } from "@/constants/api";

function GitHubCallbackPage() {
  const [searchParams] = useSearchParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["github-login"],
    queryFn: async () => {
      const res = await fetch(
        `${API_URL}/auth/github/login?${searchParams.toString()}`,
        { credentials: "include" },
      );
      if (!res.ok) {
        const { error, error_message } = await res.json();

        throw new Error(`Error: ${error} - ${error_message}`);
      }
      const data = await res.json();
      return data;
    },
    retry: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <>
        <div>Error: {JSON.stringify(data)}</div>
        <button onClick={() => (window.location.href = "/")}>Back</button>
      </>
    );
  }

  return (
    <>
      <p>User data: {JSON.stringify(data)}</p>
      <button onClick={() => (window.location.href = "/")}>Back</button>
    </>
  );
}

export default GitHubCallbackPage;
