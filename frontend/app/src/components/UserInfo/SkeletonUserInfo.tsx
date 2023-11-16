import { HStack, Skeleton, SkeletonCircle, VStack } from "@chakra-ui/react";

export const SkeletonUserInfo = () => {
  return (
    <HStack gap="0.75rem">
      <SkeletonCircle size="3rem" flexShrink={0} />
      <VStack alignItems="start" gap="0.5rem" w="full">
        <Skeleton w="50%" h="0.875rem" />
        <Skeleton w="full" h="0.875rem" />
      </VStack>
    </HStack>
  );
};
