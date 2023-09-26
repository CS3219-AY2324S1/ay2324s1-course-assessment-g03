import { Button, Image, Text, VStack } from "@chakra-ui/react";
import { useAuth } from "@/hooks";
import { LoginWithGithubButton } from "@/features/auth";
import { Link } from "react-router-dom";
import { ROUTE } from "@/constants/route";
import { Page } from "@/components";

function LandingPage() {
  const { data } = useAuth();

  return (
    <Page display="grid" placeItems="center" position="relative">
      <VStack position="relative" zIndex="1" gap="2rem">
        <Text textStyle="heading-3xl" textAlign="center" color="white" w="75%">
          Let your peers help you ace technical interviews
        </Text>
        {data?.user ? (
          <>
            <Button colorScheme="primary" as={Link} to={ROUTE.HOME}>
              Get started
            </Button>
          </>
        ) : (
          <LoginWithGithubButton />
        )}
      </VStack>
      <Image
        src="/images/hero.svg"
        position="absolute"
        bottom="0"
        height="500px"
      />
    </Page>
  );
}

export default LandingPage;
