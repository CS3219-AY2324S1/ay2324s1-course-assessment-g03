import { Card } from "@/components";
import { ROUTE } from "@/constants/route";
import { Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const CreateRoomCard = () => {
  const navigate = useNavigate();

  return (
    <Card
      backgroundColor="light.600"
      borderRadius="1rem"
      cursor="pointer"
      display="flex"
      flexDirection="column"
      gap="1.25rem"
      shadow="0 2px 2px rgba(0,0,0,.2), 0 20px 25px rgba(0,0,0,.5)"
      transition="all 0.2s"
      w="16rem"
      h="8rem"
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
