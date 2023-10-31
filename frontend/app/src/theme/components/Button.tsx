import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const icon = defineStyle({
  bg: "transparent",
  color: "dark.300",
  _hover: {
    color: "dark.100",
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
  fontWeight: "medium",
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
  shadow: "sm",
  _hover: {
    bg: "red.900",
  },
  _active: {
    bg: "red.900",
  },
});

export const Button = defineStyleConfig({
  defaultProps: { size: "sm", variant: "outline" },
  variants: { icon, outline, outlineWarning },
});
