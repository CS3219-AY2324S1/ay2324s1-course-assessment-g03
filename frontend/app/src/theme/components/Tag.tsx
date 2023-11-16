import { tagAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(tagAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    bg: "transparent",
    border: "1px",
    borderColor: "dark.700",
    color: "dark.300",
  },
});

const green = definePartsStyle({
  container: {
    borderColor: "green.900",
    color: "green.500",
  },
});

const yellow = definePartsStyle({
  container: {
    borderColor: "yellow.900",
    color: "yellow.500",
  },
});

const red = definePartsStyle({
  container: {
    borderColor: "red.900",
    color: "red.500",
  },
});

export const Tag = defineMultiStyleConfig({
  baseStyle,
  variants: {
    green,
    yellow,
    red,
  },
});
