import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const icon = defineStyle({
  bg: "transparent",
  color: "dark.300",
  _hover: {
    color: "dark.100",
    bg: "dark.700",
  },
  _active: {
    bg: "dark.700",
  },
});

const outline = defineStyle({
  bg: "transparent",
  border: "1px",
  borderColor: "dark.700",
  color: "dark.100",
  fontWeight: "medium",
  shadow: "sm",
  _active: {
    bg: "dark.700",
  },
  _hover: {
    bg: "dark.700",
  },
});

const outlineWarning = defineStyle({
  bg: "transparent",
  border: "1px",
  borderColor: "red.900",
  color: "red.500",
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
