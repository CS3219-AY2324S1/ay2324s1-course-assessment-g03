/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChakraReactSelectSize, singleSelectStyles } from "@/theme";
import { VStack, Text } from "@chakra-ui/react";
import { ActionMeta, Select, SingleValue } from "chakra-react-select";

interface Option {
  label: string;
  value: any;
}

interface DropdownProps {
  size?: ChakraReactSelectSize;
  title: string;
  options: Option[];
  placeholder?: string;
  value?: any;
  onChangeHandler?:
    | ((
        newValue: SingleValue<{
          label: string;
          value: any;
        }>,
        actionMeta: ActionMeta<{
          label: string;
          value: any;
        }>,
      ) => void)
    | undefined;
  width?: number;
}

export const Dropdown = ({
  size,
  title,
  options,
  placeholder,
  value,
  onChangeHandler,
  width,
}: DropdownProps) => {
  return (
    <VStack align="left" width={width}>
      <Text fontSize="sm" fontWeight="medium">
        {title}
      </Text>
      <Select
        // @ts-expect-error Issue with chakra-react-select types (https://github.com/csandman/chakra-react-select/issues/273)
        chakraStyles={singleSelectStyles(size)}
        placeholder={placeholder ?? "Select option"}
        options={options.map(({ label, value }) => ({
          label,
          value,
        }))}
        onChange={onChangeHandler ?? undefined}
        value={
          options.find(option => {
            return option.value === value;
          }) ?? undefined
        }
      />
    </VStack>
  );
};
