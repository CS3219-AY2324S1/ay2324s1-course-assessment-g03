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
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currQuestion: Question | undefined;
  setCurrQuestion: Dispatch<SetStateAction<Question | undefined>>;
  handleSave: (question: Question | undefined) => void;
}

const AdminQuestionModal = ({
  isOpen,
  onClose,
  currQuestion,
  setCurrQuestion,
  handleSave,
}: QuestionModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
        <FormControl>
          <FormLabel fontWeight="semibold" color="dark.100" size="sm">
            Title
          </FormLabel>
          <Input
            size="sm"
            borderRadius="md"
            color="dark.100"
            focusBorderColor="dark.100"
            borderColor="dark.800"
            defaultValue={currQuestion ? currQuestion.title : ""}
            onChange={e =>
              setCurrQuestion(
                currQuestion
                  ? {
                      ...currQuestion,
                      title: e.target.value,
                    }
                  : currQuestion,
              )
            }
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button
          bg="transparent"
          color="dark.300"
          _hover={{ color: "dark.100" }}
          onClick={onClose}
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

export default AdminQuestionModal;
