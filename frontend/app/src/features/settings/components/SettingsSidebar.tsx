import { TabList, Tab } from "@chakra-ui/react";
import { TABS } from "../constants/tabs";

export const SettingsSidebar = () => {
  return (
    <TabList height="100%" alignItems="start" borderColor="dark.500">
      {TABS.map(({ label }) => {
        const isDelete = label === "Delete account";

        return (
          <Tab
            color="light.300"
            borderColor="light.300"
            _selected={{
              color: isDelete ? "red.400" : "light.50",
              borderColor: isDelete ? "red.400" : "light.50",
            }}
            _hover={{
              color: isDelete ? "red.400" : "light.50",
              borderColor: isDelete ? "red.400" : "light.50",
            }}
            width="full"
            justifyContent="start"
            mt={isDelete ? "auto" : undefined}
          >
            {label}
          </Tab>
        );
      })}
    </TabList>
  );
};
