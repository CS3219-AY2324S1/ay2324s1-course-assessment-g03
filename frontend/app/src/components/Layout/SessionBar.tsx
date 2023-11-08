import { ROUTE } from "@/constants/route";
import { useAuth } from "@/hooks";
import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const SessionBar = () => {
  const { data } = useAuth();
  const navigate = useNavigate();

  const roomId = data?.user?.roomId;

  if (!roomId) {
    return null;
  }

  return (
    <Box
      inset="0"
      m="auto"
      position="absolute"
      h="fit-content"
      w="fit-content"
      px="4rem"
      py="0.375rem"
      borderWidth="2px"
      borderRadius="full"
      borderColor="primary.500"
      background="dark.500"
      onClick={() => navigate(`${ROUTE.ROOM}/${roomId}`)}
      cursor="pointer"
      _hover={{
        borderColor: "primary.300",
        background: "dark.400",
      }}
      transition="all 0.2s"
    >
      <Text textStyle="text-sm">Session in progress...</Text>
    </Box>
  );
};
