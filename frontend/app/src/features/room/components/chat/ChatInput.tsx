import { COMMUNICATION_SOCKET_API } from "@/constants/socket";
import { useAuth } from "@/hooks";
import { Flex, Input, Button, FormControl } from "@chakra-ui/react";
import { FormEvent, useRef, useState } from "react";
import { Socket } from "socket.io-client";

interface ChatInputProps {
  socket: Socket;
}
const ChatInput = ({ socket }: ChatInputProps) => {
  const user = useAuth().data?.user;
  const [inputMessage, setInputMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      socket.emit(COMMUNICATION_SOCKET_API.CHAT_MESSAGE, {
        userId: user?.id,
        message: inputMessage,
      });
      setInputMessage("");
      inputRef.current?.focus();
    }
  };

  return (
    <form onSubmit={handleSendMessage}>
      <FormControl mt={2}>
        <Flex w="100%" gap={2}>
          <Input
            ref={inputRef}
            placeholder="Type Something..."
            border="none"
            borderRadius="md"
            _focus={{ border: "1px solid dark.300" }}
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
          />
          <Button
            type="submit"
            bg="black"
            borderRadius="md"
            _hover={{
              bg: "primary.600",
            }}
            disabled={!inputMessage.trim()}
            fontWeight="semibold"
          >
            Send
          </Button>
        </Flex>
      </FormControl>
    </form>
  );
};

export default ChatInput;
