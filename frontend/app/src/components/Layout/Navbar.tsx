import { ROUTE } from "@/constants/route";
import { MAX_WIDTH, WINDOW_X_PADDING } from "@/constants/style";
import { LoginWithGithubButton } from "@/features/auth";
import { useAuth } from "@/hooks";
import { Box, Container, HStack, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { AvatarMenu } from "./AvatarMenu";
import { SessionBar } from "./SessionBar";
import { ROLE } from "@/types/user";

type NavbarProps = {
  isBorderless?: boolean;
};

export const Navbar = ({ isBorderless }: NavbarProps) => {
  const { data } = useAuth();
  const session: any = undefined; // TODO: Populate session with data from the service

  const user = data?.user;
  const location = useLocation();

  return (
    <Box
      background="dark.950"
      borderBottomWidth={isBorderless ? "0px" : "1px"}
      borderBottomColor="light"
    >
      <Container maxW={MAX_WIDTH} px={WINDOW_X_PADDING} py="1.25rem">
        <HStack position="relative" justifyContent="space-between">
          {session ? <SessionBar session={session} /> : null}
          <HStack alignItems="center" spacing={8}>
            <Text
              as={Link}
              to={user ? ROUTE.HOME : ROUTE.ROOT}
              fontWeight="900"
              fontSize="2rem"
              color="light.50"
            >
              PeerPrep
            </Text>
            <Text
              as={Link}
              to={ROUTE.HOME}
              fontWeight="semibold"
              color={location.pathname === ROUTE.HOME ? "dark.100" : "dark.300"}
            >
              Home
            </Text>
            {user?.role === ROLE.ADMIN && (
              <Text
                as={Link}
                to={ROUTE.ADMIN_QUESTIONS}
                fontWeight="semibold"
                color={
                  location.pathname === ROUTE.ADMIN_QUESTIONS
                    ? "dark.100"
                    : "dark.300"
                }
              >
                Questions
              </Text>
            )}
          </HStack>

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
