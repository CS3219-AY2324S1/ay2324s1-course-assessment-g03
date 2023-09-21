import { useSearchParams } from "react-router-dom";
import { useGetGithubLogin } from "@/features/auth/api";
import { VStack, Text, Button } from "@chakra-ui/react";

function GitHubCallbackPage() {
  const [searchParams] = useSearchParams();
  const { data, isLoading, isError } = useGetGithubLogin(searchParams);

  if (isLoading) {
    return <Text color="white">Loading...</Text>;
  }

  if (isError) {
    return (
      <VStack>
        <Text color="white">Error: {JSON.stringify(data)}</Text>
        <Button onClick={() => (window.location.href = "/")}>Back</Button>
      </VStack>
    );
  }

  return (
    <VStack>
      <Text color="white">User data: {JSON.stringify(data)}</Text>
      <Button onClick={() => (window.location.href = "/")}>Back</Button>
    </VStack>
  );
}

export default GitHubCallbackPage;
