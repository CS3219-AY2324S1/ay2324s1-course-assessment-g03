import { Page } from "@/components";
import { SettingsPanels, SettingsSidebar } from "@/features/settings";
import { Box, Flex, Tabs } from "@chakra-ui/react";

function SettingsPage() {
  return (
    <Page display="grid" placeItems="center">
      <Flex
        as={Tabs}
        orientation="vertical"
        py="1rem"
        gap="1rem"
        width="full"
        height="full"
      >
        <Box
          width="20rem"
          borderColor="dark.700"
          borderWidth="1px"
          borderRadius="0.5rem"
          p="0.5rem"
        >
          <SettingsSidebar />
        </Box>
        <Box
          borderColor="dark.700"
          borderWidth="1px"
          borderRadius="0.5rem"
          p="0.5rem"
          width="full"
        >
          <SettingsPanels />
        </Box>
      </Flex>
    </Page>
  );
}

export default SettingsPage;
