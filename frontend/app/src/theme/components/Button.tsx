import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const icon = defineStyle({
  bg: "transparent",
  color: "dark.100",
  _hover: {
    bg: "dark.800",
  },
  _active: {
    bg: "dark.800",
  },
});

const outline = defineStyle({
  bg: "transparent",
  border: "1px",
  borderColor: "dark.800",
  color: "dark.100",
  fontSize: "sm",
  fontWeight: "medium",
  h: "8",
  minW: "8",
  px: "3",
  shadow: "sm",
  _active: {
    bg: "dark.800",
  },
  _hover: {
    bg: "dark.800",
  },
});

const outlineWarning = defineStyle({
  bg: "transparent",
  border: "1px",
  borderColor: "red.900",
  color: "red.600",
  fontWeight: "medium",
  _hover: {
    bg: "red.900",
  },
  _active: {
    bg: "red.900",
  },
  shadow: "sm",
});

export const Button = defineStyleConfig({
  variants: { icon, outline, outlineWarning },
});
