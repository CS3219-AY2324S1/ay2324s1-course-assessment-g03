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
import { useQuestions } from "./QuestionsOutlet";

const DeleteQuestionModal = () => {
  const { isDeleteModalOpen, onDeleteModalClose, currQn } = useQuestions();
  const deleteQuestion = useDeleteQuestion();

  return (
    <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to delete this question?</ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={onDeleteModalClose}>
            Cancel
          </Button>
          <Button
            disabled={!currQn?.id}
            isLoading={deleteQuestion.isLoading}
            variant="outlineWarning"
            onClick={() => {
              if (currQn?.id) {
                deleteQuestion.mutate({ questionId: currQn.id });
              }
              onDeleteModalClose();
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteQuestionModal;
