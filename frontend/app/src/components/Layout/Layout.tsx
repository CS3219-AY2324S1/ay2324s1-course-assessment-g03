import { MAX_WIDTH, WINDOW_X_PADDING } from "@/constants/style";
import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useAuth } from "@/hooks";
import { ROUTE } from "@/constants/route";

type LayoutProps = {
  isNavbarBorderless?: boolean;
  requireAuthentication?: boolean;
};

export const Layout = ({
  isNavbarBorderless,
  requireAuthentication,
}: LayoutProps) => {
  useAuth({
    redirectToIfNotAuthenticated: requireAuthentication
      ? ROUTE.ROOT
      : undefined,
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      minH="100vh"
      background="dark.950"
      boxSizing="border-box"
    >
      <Navbar isBorderless={isNavbarBorderless} />
      <Container
        display="flex"
        flexDirection="column"
        flexGrow={1}
        maxW={MAX_WIDTH}
        px={WINDOW_X_PADDING}
      >
        <Outlet />
      </Container>
    </Box>
  );
};
