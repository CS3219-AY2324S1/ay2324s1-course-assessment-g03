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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BiCog, BiLogOut, BiUser } from "react-icons/bi";

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
          icon={<BiUser />}
          onClick={() => navigate(`${ROUTE.PROFILE}/${user.id}`)}
        >
          Profile
        </MenuItem>
        <MenuItem
          icon={<BiCog />}
          onClick={() => navigate(`${ROUTE.SETTINGS}`)}
        >
          Settings
        </MenuItem>
        <MenuDivider />
        <MenuItem icon={<BiLogOut />} onClick={() => logout()}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
