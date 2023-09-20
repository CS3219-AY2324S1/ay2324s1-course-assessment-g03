import { useGetGithubAuthUrl } from "@/features/auth/api";
import { Button } from "@chakra-ui/react";

export const LoginWithGithubButton = () => {
  const { refetch: loginWithGithub } = useGetGithubAuthUrl();

  return (
    <Button
      background="primary.500"
      color="white"
      onClick={() => loginWithGithub()}
    >
      Login with GitHub
    </Button>
  );
};
