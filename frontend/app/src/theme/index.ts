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
  styles: {
    global: {
      body: {
        background: "dark.500",
      },
    },
  },
});

export * from "./Toast";
export * from "./ChakraReactSelect";
