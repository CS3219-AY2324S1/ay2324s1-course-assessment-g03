import { useGetGithubAuthUrl } from "@/features/auth/api";
import { Button } from "@chakra-ui/react";

type LoginWithGithubButtonProps = {
  text?: string;
};

export const LoginWithGithubButton = ({ text }: LoginWithGithubButtonProps) => {
  const { refetch: loginWithGithub } = useGetGithubAuthUrl();

  return (
    <Button
      colorScheme="primary"
      borderRadius="6.25rem"
      onClick={() => loginWithGithub()}
    >
      {text || "Try with GitHub"}
    </Button>
  );
};
