import { Text } from "@chakra-ui/react";
import { useGetQuestionDetails } from "../../api/useGetQuestionDetails";

interface QuestionDetailsProps {
  questionId?: number;
}

export const QuestionDetails = ({ questionId }: QuestionDetailsProps) => {
  const { isLoading, isError, data } = useGetQuestionDetails(questionId);

  if (questionId === undefined) {
    return <Text fontSize="sm">{"Choose a Question"}</Text>;
  }

  if (isLoading) {
    return <Text fontSize="sm">{"Loading..."}</Text>;
  }

  if (isError || !data) {
    return <Text fontSize="sm">{"Choose a Question"}</Text>;
  }

  const { description } = data.data.question;

  return (
    <Text whiteSpace={"pre-wrap"} fontSize="sm">
      {description}
    </Text>
  );
};
