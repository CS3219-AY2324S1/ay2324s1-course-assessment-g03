import { Box, Text, Button, HStack, VStack } from "@chakra-ui/react";
import { Dropdown } from "@/components/Dropdown";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { CodeEditor, QuestionDetails } from "..";
import { LANGUAGES } from "../../constants/languages";
import { SingleValue } from "chakra-react-select";
import { LanguageSupport } from "node_modules/@codemirror/language/dist";

interface CollaboratorProps {
  roomId: string;
}

export const Collaborator = ({ roomId }: CollaboratorProps) => {
  const [renderQuestion, setRenderQuestion] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState(LANGUAGES.Python)

  useEffect(() => {
    const connectSocket = io("http://localhost:8005", {
      query: {
        roomId: roomId
      }
    });
    setSocket(connectSocket);
    return () => {
      if (connectSocket) {
        connectSocket.disconnect();
        setSocket(null);
      }
    };
  }, [roomId]);

  const handleLanguageChange = (e: SingleValue<{
    label: string;
    value: LanguageSupport;
  }>) => {
    setCurrentLanguage(e?.value ?? LANGUAGES.Python)
  }

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
        options={Object.entries(LANGUAGES).map(([languageName, languageSupport]) => ({ label: languageName, value: languageSupport }))}
        onChangeHandler={handleLanguageChange}
      />
    </HStack>
  );

  const codeEditor = socket ? (
    <CodeEditor socket={socket} roomId={roomId} language={currentLanguage} />
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
      </Box >
    </VStack >
  );
};
