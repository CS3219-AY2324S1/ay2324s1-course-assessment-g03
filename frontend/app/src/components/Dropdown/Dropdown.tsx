import { ChakraReactSelectSize, singleSelectStyles } from "@/theme";
import { VStack, Text } from "@chakra-ui/react";
import { Select } from "chakra-react-select";

interface Option {
  label: string;
  value: any;
}

interface Props {
  size?: ChakraReactSelectSize;
  title: string;
  options: Option[];
  placeholder?: string;
}

export const Dropdown: React.FC<Props> = ({
  size,
  title,
  options,
  placeholder,
}) => {
  return (
    <VStack align="left">
      <Text textStyle="text-sm">{title}</Text>
      <Select
        // @ts-expect-error Issue with chakra-react-select types (https://github.com/csandman/chakra-react-select/issues/273)
        chakraStyles={singleSelectStyles(size)}
        placeholder={placeholder ?? "Select option"}
        options={options.map(({ label, value }) => ({
          label,
          value,
        }))}
      />
    </VStack>
  );
};
