import { Card } from "@/components";
import { ROUTE } from "@/constants/route";
import { Avatar, Box, Circle, Icon, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { User } from "@/types/user";

type Props = {
  user: User | undefined;
};

export const JoinRoomCard = ({ user }: Props) => {
  const navigate = useNavigate();

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
      onClick={() => navigate(ROUTE.HOME_JOIN)}
    >
      <Box position="relative">
        <Avatar
          name={user?.name}
          src={user?.avatarUrl}
          zIndex={1}
          ring={3}
          ringColor="white"
          boxSize={12}
        />
        <Circle
          position="absolute"
          left="9"
          top="0"
          background="white"
          ring={3}
          ringColor="white"
          opacity="0.9"
        >
          <Icon as={BsFillPersonFill} padding={3} boxSize={12} />
        </Circle>
      </Box>
      <Text textStyle="heading-ml">Join a room</Text>
    </Card>
  );
};
