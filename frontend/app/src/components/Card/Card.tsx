import { Box, BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface CardProps extends BoxProps {
  children: ReactNode;
}

export const Card = ({ children, ...boxProps }: CardProps) => {
  return (
    <Box
      backgroundColor="light.600"
      borderRadius="2rem"
      borderColor="light.500"
      borderWidth="1px"
<<<<<<< HEAD
      borderRadius="6px"
      background="dark.500"
      p="1.25rem"
=======
      boxShadow="inset 0 1px 2px #525154, 0 20px 25px -5px rgba(0,0,0,.8), 0 10px 10px -5px rgba(0,0,0,.9)"
      background="dark"
      padding="2rem"
>>>>>>> 25992e51 (feat: redesign cards)
      {...boxProps}
    >
      {children}
    </Box>
  );
};
