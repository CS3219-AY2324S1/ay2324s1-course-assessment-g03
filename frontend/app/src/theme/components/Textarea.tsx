import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const outline = defineStyle({
  border: "1px",
  borderColor: "dark.700",
  borderRadius: "md",
  color: "dark.100",
  _focusVisible: {
    zIndex: 1,
    borderColor: "dark.700",
    boxShadow: `0 0 0 1px dark.700`,
  },
  _placeholder: {
    color: "dark.300",
  },
  _hover: {
    borderColor: "dark.700",
  },
  _invalid: {
    borderColor: "red.900",
    boxShadow: `0 0 0 1px red.900`,
  },
  _readOnly: {
    boxShadow: "none !important",
    userSelect: "all",
  },
});

export const Textarea = defineStyleConfig({
  defaultProps: {
    size: "sm",
    variant: "outline",
  },
  variants: { outline },
});
