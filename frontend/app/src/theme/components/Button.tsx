import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const outline = defineStyle({
  bg: "transparent",
  border: "1px",
  borderColor: "dark.800",
  color: "dark.100",
  fontWeight: "semibold",
  _hover: {
    bg: "dark.800",
  },
  shadow: "sm",
});

export const Button = defineStyleConfig({
  variants: { outline },
});
