import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  dialog: {
    bg: "dark.900",
    border: "1px",
    borderColor: "dark.700",
  },
  header: {
    color: "dark.100",
    fontSize: "lg",
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
  footer: {
    gap: 2,
  },
});

export const Modal = defineMultiStyleConfig({
  defaultProps: {
    size: "sm",
  },
  baseStyle,
});
