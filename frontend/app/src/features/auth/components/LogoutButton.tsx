import { usePostLogout } from "@/features/auth/api";
import { Button } from "@chakra-ui/react";

export const LogoutButton = () => {
  const { mutate: logout } = usePostLogout();

  return <Button onClick={() => logout()}>Logout</Button>;
};
