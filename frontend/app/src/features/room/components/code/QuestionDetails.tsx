import { Box, Text } from "@chakra-ui/react";
import { useGetQuestionDetails } from "../../api/useGetQuestionDetails";

interface QuestionDetailsProps {
    questionId?: number
}

export const QuestionDetails = ({ questionId }: QuestionDetailsProps) => {

    const { isLoading, isError, data } = useGetQuestionDetails(questionId)

    if (isLoading) {
        return (
            <Box flex={1} padding={"0.75rem"} border="1px" borderColor={"ActiveBorder"} rounded="md" height="full">
                <Text>{"Loading..."}</Text>
            </Box>
        )
    }

    if (isError || !data) {
        return (
            <Box flex={1} padding={"0.75rem"} border="1px" borderColor={"ActiveBorder"} rounded="md" height="full">
                <Text>{"Choose a Question"}</Text>
            </Box>
        )
    }

    const { description } = data.data.question

    return (
        <Box flex={1} padding={"0.75rem"} border="1px" borderColor={"ActiveBorder"} rounded="md" height="full">
            <Text whiteSpace={"pre-wrap"}>{description}</Text>
        </Box>
    )
}