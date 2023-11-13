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
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="medium">
            {title}
          </AlertDialogHeader>
          <AlertDialogBody>{description}</AlertDialogBody>
          <AlertDialogFooter>
            {!disableCancel && <Button onClick={onClose}>Cancel</Button>}
            {title === "Leave Room" ? (
              <Button ml={2} onClick={onConfirm} variant="outlineWarning">
                {confirmButtonText}
              </Button>
            ) : (
              <CustomButton ml={2} onClick={onConfirm}>
                {confirmButtonText}
              </CustomButton>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
