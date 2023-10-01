import { Box, BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface CardProps extends BoxProps {
  children: ReactNode;
}

export const Card = ({ children, ...boxProps }: CardProps) => {
  return (
    <Box
      borderColor="light.500"
      borderWidth="1px"
      borderRadius="6px"
      background="dark"
      p="1.25rem"
      {...boxProps}
    >
      {children}
    </Box>
  );
};
