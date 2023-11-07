import { Card } from "@/components";
import { ROUTE } from "@/constants/route";
import { User } from "@/types/user";
import { Avatar, Box, Icon, Text } from "@chakra-ui/react";
import { BsFillDoorOpenFill } from "react-icons/bs";

interface CreateRoomCardProps {
  user: User | undefined;
  createCallback: (route: string) => void;
}

export const CreateRoomCard = ({ user, createCallback }: CreateRoomCardProps) => {
  return (
    <Card
      backgroundImage="linear-gradient(#242325,#171619)"
      boxShadow="inset 0 1px 2px #525154, 0 13px 10px rgba(0,0,0,.35)"
      cursor="pointer"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap="1.5rem"
      transition="all 0.2s"
      w="full"
      h="12rem"
      _hover={{
        boxShadow:
          "inset 0 1px 2px #525154, 0 20px 25px -5px rgba(0,0,0,.8), 0 10px 10px -5px rgba(0,0,0,.9)",
        transform:
          "translate3d(0px, 0px, 0px) scale3d(1.02, 1.02, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
      }}
      onClick={() => createCallback(ROUTE.HOME_CREATE)}
    >
      <Box position="relative">
        <Icon
          as={BsFillDoorOpenFill}
          color="white"
          boxSize={12}
          opacity="0.8"
          zIndex={2}
        />
        <Avatar
          name={user?.name}
          src={user?.avatarUrl}
          ring={3}
          ringColor="white"
          boxSize={6}
          position="absolute"
          left="12"
          top="4"
          zIndex={1}
        />
      </Box>
      <Text textStyle="heading-ml">Create a room</Text>
    </Card>
  );
};
