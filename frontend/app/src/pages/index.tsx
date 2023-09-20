import { Box, Text } from "@chakra-ui/react";
import reactLogo from "/react.svg";
import viteLogo from "/vite.svg";
import { useAuth } from "@/hooks";
import { LoginWithGithubButton, LogoutButton } from "@/features/auth";

function HomePage() {
  const { data } = useAuth();

  return (
    <Box>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Text>Vite +s React</Text>
      <Text textStyle="component-heading-large/4xl">Vite + React</Text>

      <h1>Vite + React</h1>
      <div className="card">
        {data?.user ? (
          <>
            <h2>You are signed in as {data.user.email}</h2>
            <LogoutButton />
          </>
        ) : (
          <LoginWithGithubButton />
        )}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </Box>
  );
}

export default HomePage;
