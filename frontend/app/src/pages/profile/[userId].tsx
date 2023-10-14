import { Page } from "@/components";
import { VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

function ProfilePage() {
  const { userId } = useParams();

  return (
    <Page display="grid" placeItems="center">
      <VStack
        marginBottom="4"
        flexDirection="column"
        align="left"
        height="full"
        width="full"
      >
        {userId}
      </VStack>
    </Page>
  );
}

export default ProfilePage;
