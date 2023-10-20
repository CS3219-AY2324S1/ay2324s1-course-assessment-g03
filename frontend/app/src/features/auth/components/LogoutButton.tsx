import { usePostLogout } from "@/features/auth/api";
import { CustomButton } from "@/components";

export const LogoutButton = () => {
  const { mutate: logout } = usePostLogout();

  return <CustomButton onClick={() => logout()}>Logout</CustomButton>;
};
