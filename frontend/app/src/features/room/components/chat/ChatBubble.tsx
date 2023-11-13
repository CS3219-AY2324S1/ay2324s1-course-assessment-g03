import { useEffect, useState } from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  useDisclosure,
  Box,
  SlideFade,
} from "@chakra-ui/react";
import { BsChatLeftTextFill } from "react-icons/bs";
import { ChatBox } from "./Chatbox";
import { useChatStore } from "@/stores/useChatStore";
import { pulse } from "@/theme";

interface ChatBubbleProps {
  roomId: string;
}

const ChatBubble = ({ roomId }: ChatBubbleProps) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  useEffect(() => {
    // Subscribe to message changes
    const unsubscribe = useChatStore.subscribe(
      state => state.messages,
      newMessages => {
        if (!isOpen && newMessages.length > 0) {
          setShowNotifications(true); // Show notification if new messages arrive and popover is closed
        }
      },
    );

    // If user opened the chat, reset notifications
    if (isOpen) {
      setShowNotifications(false);
    }

    return () => unsubscribe();
  }, [isOpen]);

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="top-end"
      closeOnBlur
    >
      <PopoverTrigger>
        <Box position="absolute" right={4} bottom={4}>
          <Button
            colorScheme="primary"
            _hover={{
              backgroundColor: "primary.700",
            }}
            variant="solid"
            borderRadius="full"
            size="md"
          >
            <BsChatLeftTextFill />
            {showNotifications && (
              <Box
                position="absolute"
                top="-0.5"
                right="-0.5"
                bg="white"
                borderRadius="full"
                fontSize="xs"
                px={1.5}
                py={1.5}
                animation={`${pulse} 1.5s ease-in-out infinite`}
              />
            )}
          </Button>
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <SlideFade in={isOpen}>
          <PopoverCloseButton />
          <PopoverHeader>Chat</PopoverHeader>
          <PopoverBody>
            <ChatBox roomId={roomId} />
          </PopoverBody>
        </SlideFade>
      </PopoverContent>
    </Popover>
  );
};

export default ChatBubble;
