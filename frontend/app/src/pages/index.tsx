import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { useAuth } from "@/hooks";
import { LoginWithGithubButton, LogoutButton } from "@/features/auth";

function HomePage() {
  const { data } = useAuth();

  return (
    <VStack>
      <Box h="100vh" display="grid" placeItems="center" position="relative">
        <VStack position="relative" zIndex="1" gap="2rem">
          <Text
            textStyle="heading-3xl"
            textAlign="center"
            color="white"
            w="75%"
          >
            Let your peers help you ace technical interviews
          </Text>
          {data?.user ? (
            <>
              <Text color="white" textStyle="text-2xl">
                You are signed in as {data.user.email}
              </Text>
              <LogoutButton />
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
      </Box>
    </VStack>
  );
}

export default HomePage;
