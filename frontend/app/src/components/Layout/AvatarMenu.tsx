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
import { BiCog, BiLogOut, BiUser } from "react-icons/bi";

type AvatarMenuProps = {
  user: User;
};

export const AvatarMenu = ({ user }: AvatarMenuProps) => {
  const { mutate: logout } = usePostLogout();
  const navigate = useNavigate();

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        as={Avatar}
        name={user.name}
        src={user.avatarUrl}
      />
      {/* TODO: Abstract into theme components (for some reason doesn't work) */}
      <MenuList bg="dark.500">
        <MenuItem
          icon={<Icon as={BiUser} />}
          bg="dark.500"
          _hover={{ bg: "dark.400" }}
          color="light.100"
          onClick={() => navigate(`${ROUTE.PROFILE}/${user.id}`)}
        >
          Profile
        </MenuItem>
        <MenuItem
          icon={<Icon as={BiCog} />}
          bg="dark.500"
          _hover={{ bg: "dark.400" }}
          color="light.100"
          onClick={() => navigate(`${ROUTE.SETTINGS}`)}
        >
          Settings
        </MenuItem>
        <MenuDivider />
        <MenuItem
          icon={<Icon as={BiLogOut} />}
          bg="dark.500"
          _hover={{ bg: "dark.400", color: "red.400" }}
          color="light.100"
          onClick={() => logout()}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
