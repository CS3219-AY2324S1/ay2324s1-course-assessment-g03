import { HStack, Icon, IconButton, Text } from "@chakra-ui/react";
import { PiCheckCircleBold, PiXBold, PiXCircleBold } from "react-icons/pi";

interface ToastProps {
  status: "success" | "error";
  message: string;
  onClose: () => void;
}

export const Toast = ({ status, message, onClose }: ToastProps) => (
  <HStack
    bg="dark.900"
    border="1px"
    borderRadius="md"
    borderColor={`${status === "success" ? "green" : "red"}.900`}
    color={`${status === "success" ? "green" : "red"}.500`}
    justifyContent="space-between"
    p={2}
    shadow="xl"
  >
    <Icon as={status === "success" ? PiCheckCircleBold : PiXCircleBold} />
    <Text color="dark.100" fontSize="sm">
      {message}
    </Text>
    <IconButton
      aria-label="Close"
      icon={<PiXBold />}
      onClick={onClose}
      variant="icon"
      size="sm"
    />
  </HStack>
);
