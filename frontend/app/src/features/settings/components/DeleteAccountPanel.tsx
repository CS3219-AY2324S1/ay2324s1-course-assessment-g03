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
      <VStack alignItems="start" gap="1rem">
        <Text textStyle="heading-lg">Delete account</Text>
        <Text textStyle="text-md">
          Deleting your accout will remove all of your information from our
          database. This cannot be undone.
        </Text>
        <Text
          textStyle="text-md"
          color="light.200"
        >{`To confirm, type "${CONFIRM_MESSAGE}" in the box below.`}</Text>
        <HStack>
          <Input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            color="light.100"
          />
          <Button
            onClick={() => mutate()}
            colorScheme="red"
            isDisabled={inputValue !== CONFIRM_MESSAGE}
            isLoading={isLoading}
            flexShrink={0}
          >
            Delete account
          </Button>
        </HStack>
      </VStack>
    </TabPanel>
  );
};
