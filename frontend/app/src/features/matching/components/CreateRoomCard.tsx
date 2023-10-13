import { Card } from "@/components";
import { ROUTE } from "@/constants/route";
import { Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const CreateRoomCard = () => {
  const navigate = useNavigate();

  return (
    <Card
      cursor="pointer"
      display="flex"
      flexDirection="column"
      gap="1.25rem"
      transition="all 0.2s"
      w="full"
      maxW="15rem"
      h="12rem"
      _hover={{
        boxShadow:
          "inset 0 1px 2px #525154, 0 20px 25px -5px rgba(0,0,0,.8), 0 10px 10px -5px rgba(0,0,0,.9)",
        transform:
          "translate3d(0px, 0px, 0px) scale3d(1.02, 1.02, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
      }}
      onClick={() => navigate(ROUTE.HOME_CREATE)}
    >
      <Text textStyle="heading-md">Create a room</Text>
      <Text textStyle="text-sm">Invite a peer with a link</Text>
    </Card>
  );
};
