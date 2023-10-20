import { Box, Button, HStack, Skeleton, Text } from "@chakra-ui/react";
import { PiPlusBold } from "react-icons/pi";
import { useAdminQuestions } from "../providers/AdminQuestionsProvider";

const AdminQuestionsHeader = () => {
  const { data, isLoading, setCurrQuestion, onUpsertModalOpen } =
    useAdminQuestions();

  if (isLoading) {
    return (
      <Skeleton
        h="32px"
        startColor="dark.950"
        endColor="dark.800"
        borderRadius="md"
      />
    );
  }

  return (
    <HStack justifyContent="space-between" alignItems="end">
      <Box border="1px" borderRadius="md" borderColor="dark.800" px={3} py={1}>
        <Text fontSize="sm" fontWeight="medium">
          Total Questions: {data?.data.pagination.total_questions}
        </Text>
      </Box>
      <Button
        onClick={() => {
          setCurrQuestion(undefined);
          onUpsertModalOpen();
        }}
        variant="outline"
        size="sm"
        leftIcon={<PiPlusBold />}
      >
        Create Question
      </Button>
    </HStack>
  );
};

export default AdminQuestionsHeader;
