import { menuAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const outline = {
  list: {
    bg: "dark.900",
    border: "1px",
    borderColor: "dark.700",
    p: 1,
    shadow: "sm",
    minW: 36,
    w: "min-content",
  },
  item: {
    bg: "transparent",
    borderRadius: "md",
    color: "dark.100",
    fontSize: "sm",
    py: 2,
    transitionProperty: "common",
    transitionDuration: "normal",
    _hover: { bg: "dark.700" },
  },
  groupTitle: {
    color: "dark.300",
    fontWeight: "medium",
  },
  icon: {
    color: "dark.300",
  },
};

export const Menu = defineMultiStyleConfig({
  defaultProps: { size: "sm", variant: "outline" },
  variants: { outline },
});
