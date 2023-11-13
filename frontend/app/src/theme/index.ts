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
  Popover,
} from "./components";
import { pulse } from "./animations";

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
    Popover,
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
  animations: {
    pulse,
  },
});

export * from "./Toast";
export * from "./ChakraReactSelect";
export * from "./animations";
