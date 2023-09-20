import { extendTheme } from "@chakra-ui/react";
import { colors, textStyles } from "./foundations";
import { Button } from "./components";

export const theme = extendTheme({
  components: {
    Button,
  },
  colors,
  textStyles,
});
