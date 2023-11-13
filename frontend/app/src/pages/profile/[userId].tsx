import { Page } from "@/components";
import { ROUTE } from "@/constants/route";
import SubmissionsTable from "@/features/submissions/components/SubmissionsTable";
import { useAuth } from "@/hooks";
import { Avatar, HStack, VStack, Text, Button, Icon } from "@chakra-ui/react";
import { PiPencilBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { data } = useAuth();
  const navigate = useNavigate();

  return (
    <Page pt="4" display="flex" flexDirection="column" gap={6}>
      <Text fontWeight="medium" fontSize="lg">
        Profile Information
      </Text>
      <HStack
        alignItems="center"
        alignSelf="stretch"
        justifyContent="space-between"
      >
        <HStack alignItems="center" gap={4}>
          <Avatar name={data?.user.name} src={data?.user.avatarUrl} />
          <VStack spacing={0} alignItems="start">
            <Text fontWeight="medium" fontSize="sm">
              {data?.user.name}
            </Text>
            <Text color="dark.300" fontSize="sm">
              {data?.user.email}
            </Text>
          </VStack>
        </HStack>
        <Button
          leftIcon={<Icon as={PiPencilBold} />}
          onClick={() => navigate(`${ROUTE.SETTINGS}`)}
        >
          Update Profile
        </Button>
      </HStack>
      <Text fontWeight="medium" fontSize="lg">
        Submissions
      </Text>
      {data?.user.submissions ? (
        <SubmissionsTable submissions={data.user.submissions} />
      ) : (
        <Text fontSize="sm">No submissions yet.</Text>
      )}
    </Page>
  );
}

export default ProfilePage;
