import { Button, ButtonProps } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface CustomButtonProps extends ButtonProps {
  to?: string;
}

export const CustomButton = ({ to, ...props }: CustomButtonProps) => {
  if (to) {
    return (
      <Button
        as={Link}
        to={to}
        colorScheme="primary"
        borderRadius="0.75rem"
        variant="solid"
        _hover={{
          backgroundColor: "primary.700",
        }}
        {...props}
      ></Button>
    );
  }

  return (
    <Button
      colorScheme="primary"
      borderRadius={6}
      _hover={{
        backgroundColor: "primary.700",
      }}
      variant="solid"
      {...props}
    ></Button>
  );
};
