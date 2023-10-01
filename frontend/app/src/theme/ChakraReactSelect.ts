import { ChakraStylesConfig } from "chakra-react-select";

export const multiSelectStyles: ChakraStylesConfig = {
  container: provided => ({
    ...provided,
    background: "dark",
    borderColor: "light.500",
  }),
  dropdownIndicator: provided => ({
    ...provided,
    background: "transparent",
    color: "white",
    border: "0px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  valueContainer: provided => ({
    ...provided,
    px: "0.5rem",
  }),
  multiValue: provided => ({
    ...provided,
    background: "transparent",
    color: "white",
  }),
  option: provided => ({
    ...provided,
    background: "transparent",
    _hover: {
      background: "light.500",
    },
    color: "white",
  }),
  menu: provided => ({ ...provided, background: "dark" }),
  menuList: provided => ({
    ...provided,
    background: "transparent",
  }),
  noOptionsMessage: provided => ({ ...provided, color: "white" }),
};
