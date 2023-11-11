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
      px={5}
      py={2.5}
      borderWidth="1px"
      borderRadius="full"
      borderColor="primary.500"
      background="dark.900"
      onClick={() => navigate(`${ROUTE.ROOM}/${roomId}`)}
      cursor="pointer"
      _hover={{
        borderColor: "primary.300",
        background: "dark.700",
      }}
      transition="all 0.2s"
    >
      <Text textStyle="text-sm" fontWeight="medium">
        Session in progress
      </Text>
    </Box>
  );
};
