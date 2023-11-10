import { popoverAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  content: {
    bg: "dark.950",
    border: "1px",
    borderColor: "dark.800",
    _focus: { boxShadow: "none" },
    w: 400,
  },
  header: {
    color: "dark.100",
    fontSize: "md",
    borderColor: "dark.300",
  },
  closeButton: {
    color: "dark.300",
    _hover: {
      color: "dark.100",
    },
  },
  body: {
    color: "dark.300",
    fontSize: "sm",
  },
});

export const Popover = defineMultiStyleConfig({
  baseStyle,
});
