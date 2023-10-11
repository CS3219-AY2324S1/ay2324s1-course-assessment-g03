import { extendTheme } from "@chakra-ui/react";
import { colors, textStyles, fonts } from "./foundations";
import { Text, Spinner } from "./components";

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
