import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps,
  Button,
} from "@chakra-ui/react";
import { CustomButton } from "..";

interface CustomAlertProps extends Omit<AlertDialogProps, "children"> {
  onConfirm: () => void;
  title: string;
  description: string;
  confirmButtonText: string;
  disableCancel?: boolean;
}

export const CustomAlert = ({
  isOpen,
  leastDestructiveRef,
  onClose,
  onConfirm,
  title,
  description,
  confirmButtonText,
  disableCancel,
}: CustomAlertProps) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={leastDestructiveRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>
          <AlertDialogBody>{description}</AlertDialogBody>
          <AlertDialogFooter>
            {!disableCancel && <Button onClick={onClose}>Cancel</Button>}
            <CustomButton colorScheme="primary" onClick={onConfirm} ml={3}>
              {confirmButtonText}
            </CustomButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
