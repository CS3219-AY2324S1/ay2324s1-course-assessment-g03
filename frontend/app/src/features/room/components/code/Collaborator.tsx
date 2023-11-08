import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Text, HStack, VStack, Spinner, useToast } from "@chakra-ui/react";
import io, { Socket } from "socket.io-client";
import { useAuth } from "@/hooks";
import { env } from "@/lib/env";
import { CustomButton } from "@/components";
import { Dropdown } from "@/components/Dropdown";
import { DifficultyType, TopicTagType } from "@/constants/question";
import { SOCKET_API_ENDPOINT, WEBSOCKET_PATH } from "@/constants/api";
import {
  LANGUAGES,
  DEFAULT_LANGUAGE,
  DEFAULT_LANGUAGE_KEY,
  LanguageKeyType,
} from "@/constants/language";
import { InfoBar } from "@/features/room";
import { CodeEditor, QuestionDetails } from "@/features/room/components/code";
import { useGetQuestionOptions } from "@/features/room/api/useGetQuestionOptions";
import { usePostSubmission } from "../../api/usePostSubmission";

interface CollaboratorProps {
  roomId: string;
  topic: TopicTagType[];
  difficulty: DifficultyType[];
  questionId?: number;
  language: LanguageKeyType;
  users: { id: string; connected: boolean }[];
}

export const Collaborator = ({
  roomId,
  topic,
  difficulty,
  questionId,
  language,
  users,
}: CollaboratorProps) => {
  const [renderQuestion, setRenderQuestion] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState(
    LANGUAGES[language] ?? DEFAULT_LANGUAGE,
  );
  const [activeQuestionId, setActiveQuestionId] = useState(questionId);
  // Lifted state from `CodeEditor` component
  const [doc, setDoc] = useState<string | null>(null);
  const toast = useToast();
  const { mutate: markAsComplete } = usePostSubmission();

  const id = useAuth().data?.user?.id;

  // Check if  user came from create room
  const location = useLocation();
  const cameFromCreate = location.state?.fromCreate;

  useEffect(() => {
    const connectSocket = io(`${env.VITE_BACKEND_URL}`, {
      path: WEBSOCKET_PATH.COLLABORATION,
      withCredentials: true,
      query: {
        roomId: roomId,
        userId: id,
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

  const { isLoading, isError, data } = useGetQuestionOptions(difficulty, topic);

  const [width, setWidth] = useState(window.innerWidth / 2);
  const [isDragging, setIsDragging] = useState(false);

  const startResizing = useCallback(
    mouseDownEvent => {
      const minWidth = 400;
      const maxWidth = window.innerWidth - 400;

      setIsDragging(true);
      document.body.style.userSelect = "none";

      const startWidth = width;
      const startPositionX = mouseDownEvent.clientX;

      const onMouseMove = mouseMoveEvent => {
        let currentWidth = startWidth + mouseMoveEvent.clientX - startPositionX;

        // Enforce min and max constraints
        if (currentWidth < minWidth) {
          currentWidth = minWidth;
        } else if (currentWidth > maxWidth) {
          currentWidth = maxWidth;
        }

        setWidth(currentWidth);
      };

      const onMouseUp = () => {
        document.body.style.userSelect = "auto";
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [width],
  );

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

  const questionOptions = data.data.questions.map(({ id, title }) => {
    return { value: id, label: title };
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
  };

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
    <HStack justifyContent="space-between">
      <Box display="flex" gap={4}>
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
      </Box>
      <InfoBar
        showCopyLink={cameFromCreate}
        copyLinkCallback={copyToClipboard}
        difficulty={difficulty}
        topic={topic}
        users={users}
      />
    </HStack>
  );

  const VisibleView = (
    <HStack height="100%" width="full">
      <VStack align="left" height="100%" w={`${width}px`} pr={2} overflow="auto">
        <QuestionDetails questionId={activeQuestionId} />
      </VStack>
      <Box
        w={2}
        height="100%"
        bg="light.500"
        cursor="col-resize"
        _hover={{
          bg: "light.400",
        }}
        transition="background 0.2s"
        onMouseDown={startResizing}
      />
      <VStack
        align="left"
        flexGrow={1}
        maxW={`${window.innerWidth - width}`}
      >
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
    <VStack align="left" height="100%">
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
    <VStack align="left" height="80vh" width="full" mt={5} gap={4}>
      {Options}
      {renderQuestion ? VisibleView : HiddenView}
      <HStack
        justifyContent="space-between"
        position="fixed"
        bottom={0}
        left={0}
        w="full"
        background="light.500"
        p={4}
      >
        <CustomButton
          colorScheme="light"
          onClick={() => setRenderQuestion(!renderQuestion)}
        >
          {renderQuestion ? "Hide" : "Show"} Question
        </CustomButton>
        <CustomButton onClick={handleMarkAsComplete}>
          Mark as complete
        </CustomButton>
      </HStack>
    </VStack>
  );
};
