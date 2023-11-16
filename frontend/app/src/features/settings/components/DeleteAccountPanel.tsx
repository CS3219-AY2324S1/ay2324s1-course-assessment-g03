import {
  Input,
  TabPanel,
  VStack,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useDeleteUser } from "../api/useDeleteUser";
import { useState } from "react";

const CONFIRM_MESSAGE = "delete";

export const DeleteAccountPanel = () => {
  const { mutate, isLoading } = useDeleteUser();
  const [inputValue, setInputValue] = useState("");

  return (
    <TabPanel height="full">
      <VStack alignItems="start" gap={4}>
        <Text textStyle="heading-md">Delete account</Text>
        <Text textStyle="text-sm">
          Deleting your accout will remove all of your information from our
          database. This cannot be undone.
        </Text>
        <Text textStyle="text-sm">{`To confirm, type "${CONFIRM_MESSAGE}" in the box below.`}</Text>
        <HStack>
          <Input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            color="dark.100
"
            w={72}
          />
          <Button
            onClick={() => mutate()}
            isDisabled={inputValue !== CONFIRM_MESSAGE}
            isLoading={isLoading}
            flexShrink={0}
            variant="outlineWarning"
          >
            Delete account
          </Button>
        </HStack>
      </VStack>
    </TabPanel>
  );
};
