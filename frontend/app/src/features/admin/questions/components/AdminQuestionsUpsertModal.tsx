import { Question } from "@/types/question";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { QUESTION_KEY_LABEL_MAP } from "../constants/questionKeyLabelMap";
import { useAdminQuestions } from "../providers/AdminQuestionsProvider";
import { useUpdateQuestion } from "../api/useUpdateQuestion";
import { useCreateQuestion } from "../api/useCreateQuestion";

const AdminQuestionsUpsertModal = () => {
  const {
    isUpsertModalOpen,
    onUpsertModalClose,
    currQuestion,
    setCurrQuestion,
  } = useAdminQuestions();
  const updateQuestion = useUpdateQuestion();
  const createQuestion = useCreateQuestion();

  const handleSave = (question: Partial<Question> | undefined) => {
    if (question) {
      if (currQuestion) {
        updateQuestion.mutate(question);
      } else {
        createQuestion.mutate(question);
      }
    }
    onUpsertModalClose();
  };

  return (
    <Modal isOpen={isUpsertModalOpen} onClose={onUpsertModalClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="dark.950"
        borderRadius="md"
        border="1px"
        borderColor="dark.800"
      >
        <HStack alignItems="center">
          <ModalHeader color="dark.100" flex="flex-1">
            {currQuestion ? "Edit" : "Create"} Question
          </ModalHeader>
          <ModalCloseButton color="dark.300" _hover={{ color: "dark.100" }} />
        </HStack>
        <ModalBody>
          <FormControl gap={4} display="flex" flexDirection="column">
            {QUESTION_KEY_LABEL_MAP.map(({ key, label }) => (
              <VStack key={key} alignItems="start" spacing={0}>
                <FormLabel fontWeight="semibold" color="dark.100" size="sm">
                  {label}
                </FormLabel>
                <Input
                  size="sm"
                  borderRadius="md"
                  color="dark.100"
                  focusBorderColor="dark.100"
                  borderColor="dark.800"
                  defaultValue={currQuestion ? currQuestion[key] : ""}
                  onChange={e =>
                    setCurrQuestion(
                      currQuestion
                        ? {
                            ...currQuestion,
                            [key]: e.target.value,
                          }
                        : { [key]: e.target.value },
                    )
                  }
                />
              </VStack>
            ))}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            bg="transparent"
            color="dark.300"
            _hover={{ color: "dark.100" }}
            onClick={onUpsertModalClose}
            size="sm"
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSave(currQuestion)}
            size="sm"
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AdminQuestionsUpsertModal;
