import { Box, BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface CardProps extends BoxProps {
  children: ReactNode;
}

export const Card = ({ children, ...boxProps }: CardProps) => {
  return (
    <Box
      backgroundColor="light.500"
      borderRadius="1.5rem"
      borderColor="rgba(255,255,255,0.08)"
      borderWidth="1px"
      boxShadow="0 4px 12px rgba(0,0,0,.24)"
      background="dark.950"
      p="2rem"
      {...boxProps}
    >
      {children}
    </Box>
  );
};
