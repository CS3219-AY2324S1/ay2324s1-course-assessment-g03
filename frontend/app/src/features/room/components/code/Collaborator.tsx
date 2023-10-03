import { Box, Text, Button, HStack, VStack } from "@chakra-ui/react";
import { Dropdown } from "@/components/Dropdown";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { CodeEditor, QuestionDetails } from "..";

export const Collaborator = () => {
  const [renderQuestion, setRenderQuestion] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const connectSocket = io("http://localhost:8000");
    setSocket(connectSocket);
    return () => {
      if (connectSocket) {
        connectSocket.disconnect();
        setSocket(null);
      }
    };
  }, []);

  //TODO: update options when in
  const options = (
    <HStack>
      <Dropdown
        size="sm"
        title="Question"
        placeholder="Select question"
        options={[]}
      />
      <Dropdown
        size="sm"
        title="Language"
        placeholder="Select language"
        options={[
          {
            id: 1,
            description: "Python",
          },
        ]}
      />
    </HStack>
  );

  const codeEditor = socket ? (
    <CodeEditor socket={socket} />
  ) : (
    <Box>Loading</Box>
  );

  const visibleView = (
    <HStack height="full" width="full">
      <VStack align="left" height="full" width="50%">
        {options}
        <QuestionDetails details={"Question Details"} />
      </VStack>
      <VStack align="left" height="full" width="50%">
        <Text textStyle="sm">Code</Text>
        {codeEditor}
      </VStack>
    </HStack>
  );

  const hiddenView = (
    <VStack align="left" height="full" width="full">
      {options}
      {codeEditor}
    </VStack>
  );

  return (
    <VStack align="left" height="full" width="full">
      <Box height="full" width="full">
        {renderQuestion ? visibleView : hiddenView}
      </Box>
      <Box>
        <Button
          size="xs"
          background="#3F3F46"
          textColor="white"
          onClick={() => setRenderQuestion(!renderQuestion)}
        >
          {renderQuestion ? "Hide" : "Show"} Question
        </Button>
      </Box>
    </VStack>
  );
};
