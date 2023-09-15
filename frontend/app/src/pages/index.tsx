import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "../App.css";
import { useQuery } from "react-query";
import { useAuth } from "../hooks/useAuth";

export const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

function HomePage() {
  const { user, logout } = useAuth();

  const { refetch } = useQuery({
    queryKey: ["github-auth-url"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/auth/github/authorize`);
      if (!res.ok) {
        const { error, error_message } = await res.json();

        throw new Error(`${error}: ${error_message}`);
      }
      const data = await res.json();
      return data;
    },
    enabled: false,
    retry: false,
    onSuccess(data) {
      window.location.href = data.url;
    },
  });

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
      <h1>Vite + React</h1>
      <div className="card">
        {user ? (
          <>
            <h2>You are signed in as {user.email}</h2>
            <button onClick={() => logout()}>Sign out</button>
          </>
        ) : (
          <button onClick={() => refetch()}>Login with GitHub</button>
        )}
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

export default HomePage;
