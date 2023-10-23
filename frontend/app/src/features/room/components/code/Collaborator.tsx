import { useEffect, useState } from "react";
import { Box, Text, Button, HStack, VStack, Spinner } from "@chakra-ui/react";
import io, { Socket } from "socket.io-client";
import { useAuth } from "@/hooks";
import { env } from "@/lib/env";
import { Dropdown } from "@/components/Dropdown";
import { DifficultyType, TopicTagType } from "@/constants/question";
import { SOCKET_API_ENDPOINT, WEBSOCKET_PATH } from "@/constants/api";
import { LANGUAGES, DEFAULT_LANGUAGE, DEFAULT_LANGUAGE_KEY, LanguageKeyType } from "@/constants/language";
import { CodeEditor, QuestionDetails } from "@/features/room/components/code";
import { useGetQuestionOptions } from "@/features/room/api/useGetQuestionOptions";

interface CollaboratorProps {
  roomId: string;
  topic: TopicTagType[];
  difficulty: DifficultyType[];
  questionId?: number;
  language: LanguageKeyType;
}

export const Collaborator = ({ roomId, topic, difficulty, questionId, language }: CollaboratorProps) => {
  const [renderQuestion, setRenderQuestion] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState(LANGUAGES[language] ?? DEFAULT_LANGUAGE);
  const [activeQuestionId, setActiveQuestionId] = useState(questionId ?? 0);

  const id = useAuth().data?.user?.id

  useEffect(() => {
    const connectSocket = io(`${env.VITE_BACKEND_URL}`, {
      path: WEBSOCKET_PATH.COLLABORATION,
      withCredentials: true,
      query: {
        roomId: roomId,
        userId: id
      },
    });
    setSocket(connectSocket);
    return () => {
      if (connectSocket) {
        connectSocket.disconnect();
        setSocket(null);
      }
    };
  }, [roomId, id]);

  const { isLoading, isError, data } = useGetQuestionOptions(difficulty, topic)

  if (isLoading || !socket) return (<Spinner />)
  if (isError || !data) return (<Text>Errored</Text>)

  socket.on(SOCKET_API_ENDPOINT.CHANGE_QUESTION_RESPONSE, (qId: number) => {
    setActiveQuestionId(qId)
  })

  socket.on(SOCKET_API_ENDPOINT.CHANGE_LANGUAGE_RESPONSE, (language: LanguageKeyType) => {
    setCurrentLanguage(LANGUAGES[language])
  })

  const questionOptions = data.data.questions.map(({ id, title }) => { return { value: id, label: title } })

  const Options = (
    <HStack>
      <Dropdown
        size="sm"
        title="Question"
        placeholder="Select Question"
        value={activeQuestionId ?? undefined}
        options={questionOptions}
        onChangeHandler={(e) => {
          setActiveQuestionId(Number(e?.value ?? 0))
          socket.emit(SOCKET_API_ENDPOINT.CHANGE_QUESTION, e?.value ?? 0)
        }}
      />
      <Dropdown
        size="sm"
        title="Language"
        placeholder="Select language"
        value={currentLanguage ?? DEFAULT_LANGUAGE}
        options={Object.entries(LANGUAGES).map(
          ([languageName, languageSupport]) => ({
            label: languageName,
            value: languageSupport,
          }),
        )}
        onChangeHandler={(e) => {
          setCurrentLanguage(e?.value ?? DEFAULT_LANGUAGE)
          socket.emit(SOCKET_API_ENDPOINT.CHANGE_LANGUAGE, e?.label ?? DEFAULT_LANGUAGE_KEY)
        }}
      />
    </HStack>
  );


  const VisibleView = (
    <HStack height="full" width="full">
      <VStack align="left" height="full" width="50%">
        {Options}
        <QuestionDetails questionId={activeQuestionId} />
      </VStack>
      <VStack align="left" height="full" width="50%">
        <Text textStyle="sm">Code</Text>
        <CodeEditor socket={socket} roomId={roomId} language={currentLanguage} />
      </VStack>
    </HStack>
  );

  const HiddenView = (
    <VStack align="left" height="full" width="full">
      {Options}
      <CodeEditor socket={socket} roomId={roomId} language={currentLanguage} />
    </VStack>
  );

  return (
    <VStack align="left" height="full" width="full">
      <Box height="full" width="full">
        {renderQuestion ? VisibleView : HiddenView}
      </Box>
      <Box>
        <Button
          size="xs"
          colorScheme="light"
          onClick={() => setRenderQuestion(!renderQuestion)}
        >
          {renderQuestion ? "Hide" : "Show"} Question
        </Button>
      </Box>
    </VStack>
  );
};
