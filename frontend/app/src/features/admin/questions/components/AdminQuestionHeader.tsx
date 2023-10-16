import { Question } from "@/types/question";
import { Button, HStack, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { PiPlusBold } from "react-icons/pi";

interface AdminQuestionHeaderProps {
  onOpen: () => void;
  setCurrQuestion: Dispatch<SetStateAction<Question | undefined>>;
  totalQuestionCount: number | undefined;
}

const AdminQuestionHeader = ({
  onOpen,
  setCurrQuestion,
  totalQuestionCount,
}: AdminQuestionHeaderProps) => (
  <HStack spacing={4}>
    <Button
      onClick={() => {
        setCurrQuestion(undefined);
        onOpen();
      }}
      variant="outline"
      size="sm"
      leftIcon={<PiPlusBold />}
    >
      Add Question
    </Button>
    {totalQuestionCount && (
      <Text fontSize="sm" fontWeight="semibold">
        Total Questions: {totalQuestionCount}
      </Text>
    )}
  </HStack>
);

export default AdminQuestionHeader;
