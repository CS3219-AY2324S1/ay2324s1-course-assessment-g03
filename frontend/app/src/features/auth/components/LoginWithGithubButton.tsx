import { useGetGithubAuthUrl } from "@/features/auth/api";
import { Button } from "@chakra-ui/react";

export const LoginWithGithubButton = () => {
  const { refetch: loginWithGithub } = useGetGithubAuthUrl();

  return (
    <Button colorScheme="primary" onClick={() => loginWithGithub()}>
      Try with GitHub
    </Button>
  );
};
