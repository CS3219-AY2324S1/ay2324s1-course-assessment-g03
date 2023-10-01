import { ROUTE } from "@/constants/route";
import { MAX_WIDTH, WINDOW_X_PADDING } from "@/constants/style";
import { LoginWithGithubButton } from "@/features/auth";
import { usePostLogout } from "@/features/auth/api";
import { useAuth } from "@/hooks";
import { User } from "@/types/user";
import {
  Avatar,
  Box,
  Container,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

type NavbarProps = {
  isBorderless?: boolean;
};

export const Navbar = ({ isBorderless }: NavbarProps) => {
  const { data } = useAuth();
  const session: any = undefined; // TODO: Populate session with data from the service

  const user = data?.user;

  return (
    <Box
      background="dark"
      borderBottomWidth={isBorderless ? "0px" : "1px"}
      borderBottomColor="light"
    >
      <Container maxW={MAX_WIDTH} px={WINDOW_X_PADDING} py="1.25rem">
        <HStack position="relative" justifyContent="space-between">
          {session ? <SessionBar session={session} /> : null}
          <Text as={Link} to={ROUTE.ROOT} fontWeight="900" fontSize="2rem">
            PeerPrep
          </Text>
          {user ? (
            <AvatarMenu user={user} />
          ) : (
            <LoginWithGithubButton text="Login" />
          )}
        </HStack>
      </Container>
    </Box>
  );
};

type AvatarMenuProps = {
  user: User;
};

const AvatarMenu = ({ user }: AvatarMenuProps) => {
  const { mutate: logout } = usePostLogout();

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        as={Avatar}
        name={user.name}
        src={user.avatarUrl}
      />
      <MenuList>
        <MenuItem onClick={() => logout()}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

/**
 * TODO: Set up once the service is implemented
 */
type SessionBarProps = {
  session: any;
};

const SessionBar = ({ session }: SessionBarProps) => {
  console.log(session);
  return (
    <Box
      inset="0"
      m="auto"
      position="absolute"
      h="fit-content"
      w="fit-content"
      px="4.5rem"
      py="0.5rem"
      borderWidth="3px"
      borderRadius="full"
      borderColor="light.500"
    >
      <Text>Session in progress...</Text>
    </Box>
  );
};
