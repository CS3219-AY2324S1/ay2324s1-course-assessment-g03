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
        colorScheme="light"
        border="1px solid"
        borderRadius="6.25rem"
        borderColor="light.400"
        _hover={{
          borderColor: "light.300",
        }}
        {...props}
      ></Button>
    );
  }

  return (
    <Button
      colorScheme="light"
      border="1px solid"
      borderRadius="6.25rem"
      borderColor="light.400"
      _hover={{
        borderColor: "light.300",
      }}
      {...props}
    ></Button>
  );
};
