import { Box, Text } from "@chakra-ui/react";

/**
 * TODO: Set up once the service is implemented
 */
type SessionBarProps = {
  session: any;
};

export const SessionBar = ({ session }: SessionBarProps) => {
  console.log(session);
  return (
    <Box
      inset="0"
      m="auto"
      position="absolute"
      h="fit-content"
      w="fit-content"
      px="4.5rem"
      py="0.5rem"
      borderWidth="3px"
      borderRadius="full"
      borderColor="light.500"
    >
      <Text>Session in progress...</Text>
    </Box>
  );
};
