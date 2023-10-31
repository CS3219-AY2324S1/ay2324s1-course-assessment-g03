import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const logo = defineStyle({
  color: "dark.100",
  fontSize: "xl",
  fontWeight: "semibold",
  textDecoration: "none",
  _hover: {
    textDecoration: "none",
  },
});

const nav = defineStyle({
  color: "dark.300",
  fontSize: "sm",
  fontWeight: "medium",
  textDecoration: "none",
  _hover: {
    color: "dark.100",
    textDecoration: "none",
  },
});

export const Link = defineStyleConfig({
  variants: { logo, nav },
});
