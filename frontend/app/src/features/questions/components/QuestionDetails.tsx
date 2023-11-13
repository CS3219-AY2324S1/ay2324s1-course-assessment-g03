import {
  Text,
  Button,
  Tag,
  Link,
  HStack,
  Wrap,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { useQuestions } from "./QuestionsOutlet";
import { useNavigate, useParams } from "react-router-dom";
import { PiCaretLeftBold } from "react-icons/pi";
import { Question } from "@/types/question";

const QuestionDetails = () => {
  const { data } = useQuestions();
  const navigate = useNavigate();
  const params = useParams();

  const currQn: Partial<Question> | undefined = data?.data.questions.find(
    (qn: Partial<Question>) => qn.id === parseInt(params.questionId as string),
  );

  return (
    currQn && (
      <>
        <Button
          leftIcon={<PiCaretLeftBold />}
          variant="outline"
          onClick={() => navigate(-1)}
          placeSelf="start"
        >
          Back to Questions
        </Button>
        <HStack spacing={4}>
          <Text fontWeight="medium" fontSize="lg">
            {currQn.title}
          </Text>
          <Tag variant={currQn.paid_only ? "red" : "green"} borderRadius="full">
            {currQn.paid_only ? "Paid Only" : "Free"}
          </Tag>
        </HStack>
        <HStack spacing={4}>
          <Text fontSize="sm" fontWeight="medium" color="dark.300">
            Category
          </Text>
          <Text fontSize="sm">{currQn.category}</Text>
        </HStack>
        <HStack spacing={4}>
          <Text fontSize="sm" fontWeight="medium" color="dark.300">
            Difficulty
          </Text>
          <Tag
            variant={
              currQn.difficulty === "Easy"
                ? "green"
                : currQn.difficulty === "Medium"
                ? "yellow"
                : "red"
            }
            placeSelf="start"
          >
            {currQn.difficulty}
          </Tag>
        </HStack>
        <HStack spacing={4}>
          <Text fontSize="sm" fontWeight="medium" color="dark.300">
            Topics
          </Text>
          <HStack>
            {currQn?.topic_tags?.map((topic: string) => (
              <Tag key={topic}>{topic}</Tag>
            ))}
          </HStack>
        </HStack>
        <HStack spacing={4}>
          <Text fontSize="sm" fontWeight="medium" color="dark.300">
            URL
          </Text>
          <Link href={currQn.url} isExternal color="dark.100" fontSize="sm">
            {currQn.url}
          </Link>
        </HStack>
        <HStack spacing={4}>
          <Text fontSize="sm" fontWeight="medium" color="dark.300">
            Last Updated
          </Text>
          {currQn.updated_at && (
            <Text fontSize="sm">
              {new Date(currQn.updated_at).toLocaleString()}
            </Text>
          )}
        </HStack>
        <Text fontSize="sm" fontWeight="medium" color="dark.300">
          Description
        </Text>
        {currQn.languages && (
          <>
            <Text fontSize="sm">{currQn.description}</Text>
            <Text fontSize="sm" fontWeight="medium" color="dark.300">
              Languages
            </Text>
            <Wrap>
              {currQn.languages.map(language => (
                <Tag>{language}</Tag>
              ))}
            </Wrap>
          </>
        )}
        {/* <Text fontSize="sm" fontWeight="medium" color="dark.300">
          Code Snippets
        </Text>
        {currQn.code_snippets?.map(snippet => (
          <Text fontSize="sm">{snippet.code}</Text>
        ))} */}
        {currQn.test_cases && (
          <HStack spacing={4}>
            <Text fontSize="sm" fontWeight="medium" color="dark.300">
              Testcases
            </Text>
            {currQn.test_cases?.map(testcase => (
              <Text fontSize="sm">{testcase}</Text>
            ))}
          </HStack>
        )}
        {currQn.hints && (
          <VStack spacing={4} align="start">
            <Text fontSize="sm" fontWeight="medium" color="dark.300">
              Hints
            </Text>
            {currQn.hints.map(hint => (
              <Text fontSize="sm">{hint}</Text>
            ))}
          </VStack>
        )}
      </>
    )
  );
};

export default QuestionDetails;
