import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { useAuth } from "@/hooks";
import { LoginWithGithubButton, LogoutButton } from "@/features/auth";

function HomePage() {
  const { data } = useAuth();

  return (
    <VStack background="dark" h="100vh" justifyContent="center" gap="2rem">
      <Text textStyle="heading-2xl" textAlign="center" color="white" w="50%">
        Let your peers help you ace technical interviews
      </Text>
      {data?.user ? (
        <>
          <h2>You are signed in as {data.user.email}</h2>
          <LogoutButton />
        </>
      ) : (
        <LoginWithGithubButton />
      )}
      <Image src="/images/hero.svg" />
    </VStack>
  );
}

export default HomePage;
