import { extendTheme } from "@chakra-ui/react";
import { colors, textStyles } from "./foundations";
import { Text, Spinner } from "./components";
import { fonts } from "./foundations/fonts";

export const theme = extendTheme({
  components: {
    Text,
    Spinner,
  },
  colors,
  textStyles,
  fonts,
});

export * from "./Toast";
export * from "./ChakraReactSelect";
