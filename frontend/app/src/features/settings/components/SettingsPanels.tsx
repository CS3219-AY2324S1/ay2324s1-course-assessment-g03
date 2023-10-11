import { TabPanels } from "@chakra-ui/react";
import { ProfilePanel } from "./ProfilePanel";
import { DeleteAccountPanel } from "./DeleteAccountPanel";

export const SettingsPanels = () => {
  return (
    <TabPanels height="full">
      <ProfilePanel />
      <DeleteAccountPanel />
    </TabPanels>
  );
};
