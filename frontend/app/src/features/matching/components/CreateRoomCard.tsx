import { Card } from "@/components";
import { ROUTE } from "@/constants/route";
import { Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const CreateRoomCard = () => {
  const navigate = useNavigate();

  return (
    <Card
      display="flex"
      flexDirection="column"
      gap="1.25rem"
      cursor="pointer"
      transition="all 0.2s"
      _hover={{
        background: "light.700",
      }}
      onClick={() => navigate(ROUTE.HOME_CREATE)}
    >
      <Text textStyle="heading-md">Create a room</Text>
      <Text textStyle="text-sm">Invite a peer with a link</Text>
    </Card>
  );
};
