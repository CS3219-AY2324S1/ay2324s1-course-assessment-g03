import { Text } from "@chakra-ui/react";
import { useGetQuestionDetails } from "../../api/useGetQuestionDetails";

interface QuestionDetailsProps {
  questionId?: number;
}

export const QuestionDetails = ({ questionId }: QuestionDetailsProps) => {
  const { isLoading, isError, data } = useGetQuestionDetails(questionId);

  if (questionId === undefined) {
    return <Text>{"Choose a Question"}</Text>;
  }

  if (isLoading) {
    return <Text>{"Loading..."}</Text>;
  }

  if (isError || !data) {
    return <Text>{"Choose a Question"}</Text>;
  }

  const { description } = data.data.question;

  return <Text whiteSpace={"pre-wrap"}>{description}</Text>;
};
