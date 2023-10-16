import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetGithubLogin } from "@/features/auth/api";
import { VStack, Text, Spinner } from "@chakra-ui/react";
import { ROUTE } from "@/constants/route";
import { CustomButton, Page } from "@/components";

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
          <CustomButton onClick={() => navigate(ROUTE.ROOT)}>Back</CustomButton>
        </VStack>
      ) : null}
    </Page>
  );
}

export default GitHubCallbackPage;
