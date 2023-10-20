import { menuAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const outline = {
  list: {
    bg: "dark.950",
    border: "1px",
    borderColor: "dark.800",
    p: 1,
    shadow: "sm",
    minW: 36,
    w: "min-content",
  },
  item: {
    bg: "transparent",
    borderRadius: "sm",
    color: "dark.100",
    py: 2,
    _hover: { bg: "dark.800" },
  },
};

export const Menu = defineMultiStyleConfig({
  variants: { outline },
});
