import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Icon,
} from "@chakra-ui/react";
import {
  Select,
  Props as SelectProps,
  GroupBase,
  chakraComponents,
  ChakraStylesConfig,
} from "chakra-react-select";
import { PiCaretDownBold, PiXBold } from "react-icons/pi";

interface ControlledSelectProps<
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
> extends Omit<SelectProps<Option, IsMulti, Group>, "name" | "defaultValue">,
    UseControllerProps<FormValues> {
  label?: string;
}

const ControlledSelect = <
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  name,
  label,
  options,
  control,
  rules,
  shouldUnregister,
  ...selectProps
}: ControlledSelectProps<FormValues, Option, IsMulti, Group>) => {
  const {
    field,
    fieldState: { error },
  } = useController<FormValues>({
    name,
    control,
    rules,
    shouldUnregister,
  });

  return (
    <FormControl label={label} isInvalid={!!error} id={name}>
      {label && <FormLabel fontSize="sm">{label}</FormLabel>}
      <Select<Option, IsMulti, Group>
        useBasicStyles
        chakraStyles={
          {
            placeholder: (provided, _state) => ({
              ...provided,
              color: "dark.300",
            }),
            indicatorsContainer: (provided, _state) => ({
              ...provided,
              color: "dark.300",
            }),
          } as ChakraStylesConfig
        }
        components={{
          ClearIndicator: props => (
            <chakraComponents.ClearIndicator {...props}>
              <Icon as={PiXBold} w={3} h={3} />
            </chakraComponents.ClearIndicator>
          ),
          DropdownIndicator: props => (
            <chakraComponents.DropdownIndicator {...props}>
              <Icon as={PiCaretDownBold} w={3} h={3} />
            </chakraComponents.DropdownIndicator>
          ),
        }}
        options={options}
        selectedOptionColorScheme="dark.800"
        {...selectProps}
        {...field}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default ControlledSelect;
