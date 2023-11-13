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

export const Navbar = ({ isBorderless }: NavbarProps) => {
  const { data } = useAuth();

  const user = data?.user;
  const roomId = user?.roomId;
  const { pathname } = useLocation();

  const NAVBAR_TABS: { name: string; href: string }[] = [
    { name: "Home", href: ROUTE.HOME },
    { name: "Profile", href: `${ROUTE.PROFILE}/${user?.id}` },
    { name: "Questions", href: ROUTE.QUESTIONS },
  ];

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
                background="dark.800"
                border="1px"
                borderColor="dark.700"
                borderRadius="full"
                p={1}
              >
                {NAVBAR_TABS.map(tab => (
                  <Link
                    key={tab.name}
                    as={RouterLink}
                    to={tab.href}
                    color={
                      pathname.includes(tab.href) ? "dark.100" : "dark.300"
                    }
                    backgroundColor={
                      pathname.includes(tab.href) ? "dark.900" : ""
                    }
                    px={4}
                    py={1.5}
                    borderRadius="full"
                    variant="nav"
                    fontWeight="medium"
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
