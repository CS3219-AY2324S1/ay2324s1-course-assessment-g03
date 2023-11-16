import { TabList, Tab } from "@chakra-ui/react";
import { TABS } from "../constants/tabs";

export const SettingsSidebar = () => {
  return (
    <TabList height="100%" alignItems="start" borderColor="dark.900">
      {TABS.map(({ label }) => {
        const isDelete = label === "Delete Account";

        return (
          <Tab
            key={label}
            color="dark.300"
            borderColor="dark.300"
            _selected={{
              color: isDelete ? "red.400" : "dark.100",
              borderColor: isDelete ? "red.400" : "dark.100",
            }}
            _active={{
              color: isDelete ? "red.400" : "dark.100",
              borderColor: isDelete ? "red.400" : "dark.100",
            }}
            _hover={{
              color: isDelete ? "red.400" : "dark.100",
              borderColor: isDelete ? "red.400" : "dark.100",
            }}
            width="full"
            justifyContent="start"
            mt={isDelete ? "auto" : undefined}
            fontSize="sm"
          >
            {label}
          </Tab>
        );
      })}
    </TabList>
  );
};
