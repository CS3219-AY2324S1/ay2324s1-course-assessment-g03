import { ROUTE } from "@/constants/route";
import { MAX_WIDTH, WINDOW_X_PADDING } from "@/constants/style";
import { LoginWithGithubButton } from "@/features/auth";
import { useAuth } from "@/hooks";
import { Box, Container, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AvatarMenu } from "./AvatarMenu";
import { SessionBar } from "./SessionBar";

type NavbarProps = {
  isBorderless?: boolean;
};

export const Navbar = ({ isBorderless }: NavbarProps) => {
  const { data } = useAuth();
  const session: any = undefined; // TODO: Populate session with data from the service

  const user = data?.user;

  return (
    <Box
      background="dark.500"
      borderBottomWidth={isBorderless ? "0px" : "1px"}
      borderBottomColor="light"
    >
      <Container maxW={MAX_WIDTH} px={WINDOW_X_PADDING} py="1.25rem">
        <HStack position="relative" justifyContent="space-between">
          {session ? <SessionBar session={session} /> : null}
          <Text
            as={Link}
            to={user ? ROUTE.HOME : ROUTE.ROOT}
            fontWeight="600"
            fontSize="1.2rem"
          >
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
