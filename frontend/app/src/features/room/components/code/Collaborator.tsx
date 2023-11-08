import { useState } from "react";
import {
  Box,
  Text,
  Button,
  HStack,
  VStack,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { Socket } from "socket.io-client";
import { Dropdown } from "@/components/Dropdown";
import { DifficultyType, TopicTagType } from "@/constants/question";
import { SOCKET_API_ENDPOINT } from "@/constants/api";
import {
  LANGUAGES,
  DEFAULT_LANGUAGE,
  DEFAULT_LANGUAGE_KEY,
  LanguageKeyType,
} from "@/constants/language";
import { CodeEditor, QuestionDetails } from "@/features/room/components/code";
import { useGetQuestionOptions } from "@/features/room/api/useGetQuestionOptions";
import { usePostSubmission } from "../../api/usePostSubmission";
import { useAuth } from "@/hooks";

interface CollaboratorProps {
  roomId: string;
  topic: TopicTagType[];
  difficulty: DifficultyType[];
  questionId?: number;
  language: LanguageKeyType;
  users: { id: string; connected: boolean }[];
  socket: Socket;
}

export const Collaborator = ({
  roomId,
  topic,
  difficulty,
  questionId,
  language,
  users,
  socket
}: CollaboratorProps) => {
  const [renderQuestion, setRenderQuestion] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState(
    LANGUAGES[language] ?? DEFAULT_LANGUAGE,
  );
  const [activeQuestionId, setActiveQuestionId] = useState(questionId);
  // Lifted state from `CodeEditor` component
  const [doc, setDoc] = useState<string | null>(null);
  const toast = useToast();
  const { mutate: markAsComplete } = usePostSubmission();

  const id = useAuth().data?.user?.id;

  const { isLoading, isError, data } = useGetQuestionOptions(difficulty, topic);

  if (isLoading || !socket) return <Spinner />;
  if (isError || !data) return <Text>Errored</Text>;

  socket.on(SOCKET_API_ENDPOINT.CHANGE_QUESTION_RESPONSE, (qId: number) => {
    setActiveQuestionId(qId);
  });

  socket.on(
    SOCKET_API_ENDPOINT.CHANGE_LANGUAGE_RESPONSE,
    (language: LanguageKeyType) => {
      setCurrentLanguage(LANGUAGES[language]);
    },
  );

  const questionOptions = data.data.questions.map(({ id, title }: { id: number, title: string }) => {
    return { value: id, label: title };
  });

  const handleMarkAsComplete = () => {
    if (!doc || !activeQuestionId) {
      toast({
        status: "error",
        title: "Cannot submit empty code or question",
      });
      return;
    }

    const languageKey = Object.keys(LANGUAGES).find(
      key => LANGUAGES[key] === currentLanguage,
    );

    if (!languageKey) {
      toast({
        status: "error",
        title: "Cannot submit code with no selected language",
      });
      return;
    }

    // Get first user that is NOT the current user
    const otherUserId = users.find(user => user.id !== id)?.id;

    markAsComplete({
      submission: {
        code: doc,
        questionId: activeQuestionId.toString(),
        lang: languageKey,
        ...(otherUserId ? { otherUserId } : {}),
      },
    });
  };

  const Options = (
    <HStack>
      <Dropdown
        size="sm"
        title="Question"
        placeholder="Select Question"
        value={activeQuestionId}
        options={questionOptions}
        onChangeHandler={e => {
          setActiveQuestionId(Number(e?.value ?? 0));
          socket.emit(SOCKET_API_ENDPOINT.CHANGE_QUESTION, e?.value ?? 0);
        }}
      />
      <Dropdown
        size="sm"
        title="Language"
        placeholder="Select language"
        value={currentLanguage}
        options={Object.entries(LANGUAGES).map(
          ([languageName, languageSupport]) => ({
            label: languageName,
            value: languageSupport,
          }),
        )}
        onChangeHandler={e => {
          setCurrentLanguage(e?.value ?? DEFAULT_LANGUAGE);
          socket.emit(
            SOCKET_API_ENDPOINT.CHANGE_LANGUAGE,
            e?.label ?? DEFAULT_LANGUAGE_KEY,
          );
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
        <CodeEditor
          doc={doc}
          setDoc={setDoc}
          socket={socket}
          roomId={roomId}
          language={currentLanguage}
        />
      </VStack>
    </HStack>
  );

  const HiddenView = (
    <VStack align="left" height="full" width="full">
      {Options}
      <CodeEditor
        doc={doc}
        setDoc={setDoc}
        socket={socket}
        roomId={roomId}
        language={currentLanguage}
      />
    </VStack>
  );

  return (
    <VStack align="left" height="full" width="full">
      <Box height="full" width="full">
        {renderQuestion ? VisibleView : HiddenView}
      </Box>
      <HStack justifyContent="space-between">
        <Button
          size="xs"
          colorScheme="light"
          onClick={() => setRenderQuestion(!renderQuestion)}
        >
          {renderQuestion ? "Hide" : "Show"} Question
        </Button>
        <Button
          size="xs"
          colorScheme="primary"
          variant="solid"
          onClick={handleMarkAsComplete}
        >
          Mark as complete
        </Button>
      </HStack>
    </VStack>
  );
};
