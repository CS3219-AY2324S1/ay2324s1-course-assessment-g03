import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { CustomButton } from "..";

interface CustomModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CustomModal = ({
  title,
  description,
  isOpen,
  onClose,
}: CustomModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{description}</Text>
          </ModalBody>

          <ModalFooter>
            <CustomButton colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </CustomButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
