import { FormControl, Table, extendTheme } from "@chakra-ui/react";
import { colors, textStyles, fonts } from "./foundations";
import {
  Text,
  Spinner,
  Button,
  Menu,
  Tag,
  Modal,
  Link,
  Input,
  Textarea,
} from "./components";

export const theme = extendTheme({
  components: {
    Text,
    Spinner,
    Button,
    Table,
    Menu,
    Tag,
    Modal,
    Link,
    Input,
    Textarea,
    FormControl,
  },
  colors,
  textStyles,
  fonts,
  styles: {
    global: {
      body: {
        background: "dark.950",
      },
    },
  },
});

export * from "./Toast";
export * from "./ChakraReactSelect";
