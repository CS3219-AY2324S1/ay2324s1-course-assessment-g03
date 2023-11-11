import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface SubmissionsCodeModal {
  code: string;
  isOpen: boolean;
  onClose: () => void;
}

const SubmissionsCodeModal = ({
  code,
  isOpen,
  onClose,
}: SubmissionsCodeModal) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Code</ModalHeader>
      <ModalCloseButton />
      <ModalBody>{code}</ModalBody>
      <ModalFooter></ModalFooter>
    </ModalContent>
  </Modal>
);

export default SubmissionsCodeModal;
