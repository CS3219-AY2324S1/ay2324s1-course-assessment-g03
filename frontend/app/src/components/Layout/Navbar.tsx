import { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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

const NAVBAR_TABS = [
  { name: "Home", href: ROUTE.HOME },
  { name: "Questions", href: ROUTE.QUESTIONS },
];

export const Navbar = ({ isBorderless }: NavbarProps) => {
  const { data } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const user = data?.user;

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
          <SessionBar />
          <Link href={user ? ROUTE.HOME : ROUTE.ROOT} variant="logo">
            PeerPrep
          </Link>
          {user && (
            <HStack
              alignItems="center"
              background="light.500"
              borderRadius={32}
              paddingX={3}
              paddingY={1.5}
              border="1px solid rgba(255,255,255,.08)"
            >
              {NAVBAR_TABS.map((tab, index) => (
                <Link
                  ref={el => (linksRef.current[index] = el)}
                  key={tab.name}
                  as={RouterLink}
                  to={tab.href}
                  onClick={() => setActiveIndex(index)}
                  color={index === activeIndex ? "dark.100" : "dark.300"}
                  backgroundColor={index === activeIndex ? "dark.950" : ""}
                  paddingX={4}
                  paddingY={2}
                  borderRadius={32}
                  variant="nav"
                  fontWeight="semibold"
                >
                  {tab.name}
                </Link>
              ))}
            </HStack>
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
