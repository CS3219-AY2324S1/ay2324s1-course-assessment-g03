import { ROUTE } from "@/constants/route";
import { usePostLogout } from "@/features/auth/api";
import { User } from "@/types/user";
import {
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Icon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BiCog, BiLogOut } from "react-icons/bi";

type AvatarMenuProps = {
  user: User;
};

export const AvatarMenu = ({ user }: AvatarMenuProps) => {
  const { mutate: logout } = usePostLogout();
  const navigate = useNavigate();

  return (
    <Menu variant="outline">
      <MenuButton
        as={Avatar}
        cursor="pointer"
        name={user.name}
        src={user.avatarUrl}
        size="sm"
      />
      <MenuList>
        <MenuItem
          icon={<Icon as={BiCog} />}
          onClick={() => navigate(`${ROUTE.SETTINGS}`)}
        >
          Settings
        </MenuItem>
        <MenuDivider />
        <MenuItem icon={<Icon as={BiLogOut} />} onClick={() => logout()}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
