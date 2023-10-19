import { Box, Text, Button, HStack, VStack, Spinner } from "@chakra-ui/react";
import { Dropdown } from "@/components/Dropdown";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { CodeEditor, QuestionDetails } from "@/features/room/components/code";
import { LANGUAGES, DEFAULT_LANGUAGE } from "@/constants/language";
import { SingleValue } from "chakra-react-select";
import { LanguageSupport } from "node_modules/@codemirror/language/dist";
import { env } from "@/lib/env";
import { API_ENDPOINT, API_RESPONSE_STATUS, WEBSOCKET_PATH } from "@/constants/api";
import { DifficultyType, TopicTagType } from "@/constants/question";
import { useAuth } from "@/hooks";
import { makeSuccessResponseSchema } from "@/lib/api";
import z from "zod";
import { backendApi } from "@/lib/axios";

interface CollaboratorProps {
  roomId: string;
  topic: TopicTagType[];
  difficulty: DifficultyType[];
}

const getQuestionOptionsResponseSchema = makeSuccessResponseSchema(
  z.object({
    questions: z.array(z.object({
      id: z.number(),
      title: z.string()
    }))
  })
)

export const Collaborator = ({ roomId, topic, difficulty }: CollaboratorProps) => {
  const [renderQuestion, setRenderQuestion] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState(DEFAULT_LANGUAGE);
  const [questionOptions, setQuestionOptions] = useState<{ label: string; value: string; }[]>([]);
  const [questionId, setQuestionId] = useState(0);
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    async function getQuestionOptions() {
      try {
        const difficultyParams = difficulty.map((d) => `difficulty=${d}`).join("&")
        const topicParams = topic.map((t) => `topic=${t.replace(/\s/g, '%20')}`).join("&")

        const { data } = await backendApi.get(`${API_ENDPOINT.QUESTIONS}?${difficultyParams}&${topicParams}`)

        if (data.status === API_RESPONSE_STATUS.SUCCESS) {
          const response = getQuestionOptionsResponseSchema.parse(data)
          const { questions } = response.data
          setQuestionOptions(questions.map((q) => { return { label: q.title, value: String(q.id) } }))
          setLoading(false)
        }
      } catch (error) {
        console.log("error here")
        console.log(error)
      }
    }
    getQuestionOptions()
  }, [topic, difficulty])


  const handleLanguageChange = (
    e: SingleValue<{
      label: string;
      value: LanguageSupport;
    }>,
  ) => {
    setCurrentLanguage(e?.value ?? DEFAULT_LANGUAGE);
  };


  if (loading || !id) { return <Spinner /> }

  const options = (
    <HStack>
      <Dropdown
        size="sm"
        title="Question"
        placeholder="Select Question"
        options={questionOptions}
        onChangeHandler={(e) => setQuestionId(Number(e?.value ?? 0))}
      />
      <Dropdown
        size="sm"
        title="Language"
        placeholder="Select language"
        options={Object.entries(LANGUAGES).map(
          ([languageName, languageSupport]) => ({
            label: languageName,
            value: languageSupport,
          }),
        )}
        onChangeHandler={handleLanguageChange}
      />
    </HStack>
  );

  const codeEditor = socket ? (
    <CodeEditor socket={socket} roomId={roomId} language={currentLanguage} />
  ) : (
    <Spinner />
  );

  const visibleView = (
    <HStack height="full" width="full">
      <VStack align="left" height="full" width="50%">
        {options}
        <QuestionDetails questionId={questionId} />
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
          colorScheme="light"
          onClick={() => setRenderQuestion(!renderQuestion)}
        >
          {renderQuestion ? "Hide" : "Show"} Question
        </Button>
      </Box>
    </VStack>
  );
};
