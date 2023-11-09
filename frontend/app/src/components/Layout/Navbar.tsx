import { Link as RouterLink, useLocation } from "react-router-dom";
import { Box, Container, HStack, Link } from "@chakra-ui/react";
import { ROUTE } from "@/constants/route";
import { MAX_WIDTH, WINDOW_X_PADDING } from "@/constants/style";
import { LoginWithGithubButton } from "@/features/auth";
import { useAuth } from "@/hooks";
import { AvatarMenu } from "./AvatarMenu";
import { SessionBar } from "./SessionBar";

type NavbarProps = {
  isBorderless?: boolean;
};

const NAVBAR_TABS: { name: string; href: string }[] = [
  { name: "Home", href: ROUTE.HOME },
  { name: "Questions", href: ROUTE.QUESTIONS },
];

export const Navbar = ({ isBorderless }: NavbarProps) => {
  const { data } = useAuth();

  const user = data?.user;
  const roomId = user?.roomId;
  const { pathname } = useLocation();

  return (
    <Box
      borderBottomWidth={isBorderless ? "0px" : "1px"}
      borderBottomColor="light"
    >
      <Container maxW={MAX_WIDTH} px={WINDOW_X_PADDING} py="1.25rem">
        <HStack
          position="relative"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link href={user ? ROUTE.HOME : ROUTE.ROOT} variant="logo">
            PeerPrep
          </Link>
          {user && (
            <Box
              display="flex"
              position="absolute"
              left="50%"
              top={-1.5}
              transform="translateX(-50%)"
              gap={4}
            >
              <HStack
                alignItems="center"
                background="light.500"
                borderRadius={32}
                px={3}
                py={1.5}
                border="1px solid rgba(255,255,255,.08)"
              >
                {NAVBAR_TABS.map(tab => (
                  <Link
                    key={tab.name}
                    as={RouterLink}
                    to={tab.href}
                    color={tab.href === pathname ? "dark.100" : "dark.300"}
                    backgroundColor={tab.href === pathname ? "dark.950" : ""}
                    px={4}
                    py={2}
                    borderRadius={32}
                    variant="nav"
                    fontWeight="semibold"
                  >
                    {tab.name}
                  </Link>
                ))}
              </HStack>
              <SessionBar roomId={roomId} />
            </Box>
          )}

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
