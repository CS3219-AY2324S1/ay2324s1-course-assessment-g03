import { useGetGithubAuthUrl } from "@/features/auth/api";
import { Button } from "@chakra-ui/react";

export const LoginWithGithubButton = () => {
  const { refetch: loginWithGithub } = useGetGithubAuthUrl();

  return <Button onClick={() => loginWithGithub()}>Login with GitHub</Button>;
};
