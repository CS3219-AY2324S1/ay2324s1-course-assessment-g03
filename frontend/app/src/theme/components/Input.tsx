import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

// Created custom variant because overrriding baseStyles didn't work for some reason
const outline = definePartsStyle({
  field: {
    color: "dark.100",
    borderSize: "1px",
    borderColor: "dark.800",
    borderRadius: "md",
    _placeholder: {
      color: "dark.300",
    },
    _hover: {
      borderColor: "dark.700",
    },
  },
});

export const Input = defineMultiStyleConfig({
  defaultProps: {
    size: "sm",
    variant: "outline",
  },
  variants: { outline },
});
