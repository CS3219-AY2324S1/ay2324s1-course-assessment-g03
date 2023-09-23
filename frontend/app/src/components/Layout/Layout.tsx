import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <Box minH="100vh" background="dark" boxSizing="border-box">
      <Container maxW="112rem" px="1.5rem">
        <Outlet />
      </Container>
    </Box>
  );
};
