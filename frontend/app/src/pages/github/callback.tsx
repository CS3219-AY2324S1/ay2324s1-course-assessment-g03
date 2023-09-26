import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetGithubLogin } from "@/features/auth/api";
import { VStack, Text, Button, Spinner, Box } from "@chakra-ui/react";
import { ROUTE } from "@/constants/route";
import { Page } from "@/components/Page/Page";

function GitHubCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isLoading, isError } = useGetGithubLogin(searchParams);

  return (
    <Page display="grid" placeItems="center">
      {isLoading ? <Spinner /> : null}
      {isError ? (
        <VStack gap="1rem">
          <Text textStyle="heading-md">
            An error has occurred, please try again
          </Text>
          <Button onClick={() => navigate(ROUTE.ROOT)}>Back</Button>
        </VStack>
      ) : null}
    </Page>
  );
}

export default GitHubCallbackPage;
