import { Box, BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface PageProps extends BoxProps {
  children: ReactNode;
}

/**
 * Component to help fill in the remaining page left in Layout
 */
export const Page = ({ children, ...boxProps }: PageProps) => {
  return (
    <Box flexGrow={1} {...boxProps}>
      {children}
    </Box>
  );
};
