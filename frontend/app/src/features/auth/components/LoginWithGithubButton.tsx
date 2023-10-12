import { CustomButton } from "@/components/Layout/CustomButton";
import { useGetGithubAuthUrl } from "@/features/auth/api";

type LoginWithGithubButtonProps = {
  text?: string;
};

export const LoginWithGithubButton = ({ text }: LoginWithGithubButtonProps) => {
  const { refetch: loginWithGithub } = useGetGithubAuthUrl();

  return (
    <CustomButton
      onClick={() => loginWithGithub()}
    >
      {text || "Try with GitHub"}
    </CustomButton>
  );
};
