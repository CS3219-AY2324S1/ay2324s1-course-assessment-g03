import { extendTheme } from "@chakra-ui/react";
import { colors, textStyles } from "./foundations";
import { Button } from "./components";
import { fonts } from "./foundations/fonts";

export const theme = extendTheme({
  components: {
    Button,
  },
  colors,
  textStyles,
  fonts,
});

export * from "./Toast";
