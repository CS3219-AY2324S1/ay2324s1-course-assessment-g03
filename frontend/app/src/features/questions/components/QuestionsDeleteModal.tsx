import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useDeleteQuestion } from "../api/useDeleteQuestion";
import { useQuestions } from "../providers/QuestionsProvider";

const QuestionsDeleteModal = () => {
  const { isDeleteModalOpen, onDeleteModalClose, currQuestion } =
    useQuestions();
  const deleteQuestion = useDeleteQuestion();

  return (
    <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to delete this question?</ModalBody>
        <ModalFooter>
          <Button size="sm" variant="outline" onClick={onDeleteModalClose}>
            Cancel
          </Button>
          <Button
            disabled={!currQuestion?.id}
            isLoading={deleteQuestion.isLoading}
            size="sm"
            variant="outlineWarning"
            onClick={() => {
              if (currQuestion?.id) {
                deleteQuestion.mutate({ questionId: currQuestion.id });
              }
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default QuestionsDeleteModal;
