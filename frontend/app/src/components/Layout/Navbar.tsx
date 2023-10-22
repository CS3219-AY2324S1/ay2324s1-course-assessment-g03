import { ROUTE } from "@/constants/route";
import { MAX_WIDTH, WINDOW_X_PADDING } from "@/constants/style";
import { LoginWithGithubButton } from "@/features/auth";
import { useAuth } from "@/hooks";
import { Box, Container, HStack, Text, Link } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { AvatarMenu } from "./AvatarMenu";
import { SessionBar } from "./SessionBar";

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
            <Link href={user ? ROUTE.HOME : ROUTE.ROOT} variant="logo">
              PeerPrep
            </Link>
            <Link
              href={ROUTE.HOME}
              color={location.pathname === ROUTE.HOME ? "dark.100" : "dark.300"}
              variant="nav"
            >
              Home
            </Link>
            <Link
              href={ROUTE.QUESTIONS}
              color={
                location.pathname === ROUTE.QUESTIONS ? "dark.100" : "dark.300"
              }
              variant="nav"
            >
              Questions
            </Link>
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
