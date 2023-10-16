import { ChakraStylesConfig } from "chakra-react-select";

/**
 * Refer to https://www.npmjs.com/package/chakra-react-select
 * For the full list of elements used under the hood.
 */

export type ChakraReactSelectSize = "sm" | "md";

export const singleSelectStyles: (
  size?: ChakraReactSelectSize,
) => ChakraStylesConfig = (size = "md") => {
  const fontSize = size === "sm" ? "0.875rem" : size === "md" ? "1rem" : "1rem";
  const valueContainerPy =
    size === "sm" ? "0.25rem" : size === "md" ? "0.5rem" : "0.5rem";

  return {
    container: provided => ({
      ...provided,
      background: "dark.950",
      borderColor: "light.500",
    }),
    control: provided => ({
      ...provided,
      minHeight: "0",
    }),
    dropdownIndicator: provided => ({
      ...provided,
      background: "transparent",
      color: "light.100",
      border: "0px",
      px: "0.5rem",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    valueContainer: provided => ({
      ...provided,
      px: "0.5rem",
      color: "light.100",
      fontSize,
      py: valueContainerPy,
    }),
    option: provided => ({
      ...provided,
      background: "transparent",
      _hover: {
        background: "light.500",
      },
      color: "light.100",
      fontSize,
      py: "0rem",
    }),
    menu: provided => ({ ...provided, background: "dark" }),
    menuList: provided => ({
      ...provided,
      background: "transparent",
    }),
    noOptionsMessage: provided => ({
      ...provided,
      color: "light.100",
      fontSize,
    }),
  };
};

export const multiSelectStyles: (
  size?: ChakraReactSelectSize,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
) => ChakraStylesConfig = () => {
  return {
    container: provided => ({
      ...provided,
      background: "dark.950",
      borderColor: "light.500",
    }),
    dropdownIndicator: provided => ({
      ...provided,
      background: "transparent",
      color: "light.100",
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
      color: "light.100",
    }),
    option: provided => ({
      ...provided,
      background: "transparent",
      _hover: {
        background: "light.500",
      },
      color: "light.100",
    }),
    menu: provided => ({ ...provided, background: "dark" }),
    menuList: provided => ({
      ...provided,
      background: "transparent",
    }),
    noOptionsMessage: provided => ({ ...provided, color: "light.100" }),
  };
};
