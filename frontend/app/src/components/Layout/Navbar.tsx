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

  const user = data?.user;
  const location = useLocation();

  return (
    <Box
      borderBottomWidth={isBorderless ? "0px" : "1px"}
      borderBottomColor="light"
    >
      <Container maxW={MAX_WIDTH} px={WINDOW_X_PADDING} py="1.25rem">
        <HStack position="relative" justifyContent="space-between">
          <SessionBar />
          <HStack alignItems="center" spacing={8}>
            <Text
              as={Link}
              to={user ? ROUTE.HOME : ROUTE.ROOT}
              fontWeight="600"
              fontSize="1.2rem"
            >
              PeerPrep
            </Text>
            <Text
              as={Link}
              to={ROUTE.HOME}
              fontWeight="medium"
              color={location.pathname === ROUTE.HOME ? "dark.100" : "dark.300"}
            >
              Home
            </Text>
            {user?.role === ROLE.ADMIN && (
              <Text
                as={Link}
                to={ROUTE.ADMIN_QUESTIONS}
                fontWeight="medium"
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
