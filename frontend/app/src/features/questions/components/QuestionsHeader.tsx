import { Box, Button, HStack, Icon, Skeleton, Text } from "@chakra-ui/react";
import { PiPlusBold } from "react-icons/pi";
import { useQuestions } from "./QuestionsOutlet";
import QuestionsSearch from "./QuestionsSearch";
import { useAuth } from "@/hooks";
import { ROLE } from "@/types/user";
import QuestionsFilters from "./QuestionsFilters";

const QuestionsHeader = () => {
  const { data, isLoading, setCurrQuestion, onCreateModalOpen } =
    useQuestions();
  const { data: authData } = useAuth();

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
    <>
      <Box
        border="1px"
        borderRadius="md"
        borderColor="dark.800"
        px={3}
        py={1}
        placeSelf="start"
      >
        <Text fontSize="sm" fontWeight="medium">
          Total Questions: {data?.data.pagination.total_questions}
        </Text>
      </Box>
      <HStack justifyContent="space-between" alignItems="end">
        <HStack>
          <QuestionsSearch />
          <QuestionsFilters />
        </HStack>
        {authData?.user.role === ROLE.ADMIN && (
          <Button
            onClick={() => {
              setCurrQuestion(undefined);
              onCreateModalOpen();
            }}
            variant="outline"
            leftIcon={<Icon as={PiPlusBold} />}
          >
            Create Question
          </Button>
        )}
      </HStack>
    </>
  );
};

export default QuestionsHeader;
