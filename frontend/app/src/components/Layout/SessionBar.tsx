import { ROUTE } from "@/constants/route";
import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface SessionBarProps {
  roomId: string | undefined;
}

export const SessionBar = ({ roomId }: SessionBarProps) => {
  const navigate = useNavigate();

  if (!roomId) {
    return null;
  }

  return (
    <Box
      inset="0"
      m="auto"
      h="fit-content"
      w="fit-content"
      px={4}
      py={3}
      borderWidth="2px"
      borderRadius="full"
      borderColor="primary.500"
      background="light.700"
      onClick={() => navigate(`${ROUTE.ROOM}/${roomId}`)}
      cursor="pointer"
      _hover={{
        borderColor: "primary.300",
        background: "light.500",
      }}
      transition="all 0.2s"
    >
      <Text textStyle="text-sm" fontWeight="semibold">
        Session in progress
      </Text>
    </Box>
  );
};
