import reactLogo from "../../assets/react.svg";
import viteLogo from "/vite.svg";
import "../../App.css";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API_URL } from "..";

function GitHubCallbackPage() {
  const [searchParams] = useSearchParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["github-login"],
    queryFn: async () => {
      const res = await fetch(
        `${API_URL}/auth/github/login?${searchParams.toString()}`
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
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Logged in!</h1>
      <p>User data: {JSON.stringify(data)}</p>
      <button onClick={() => (window.location.href = "/")}>Back</button>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default GitHubCallbackPage;
