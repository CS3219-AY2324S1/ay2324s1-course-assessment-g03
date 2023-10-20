import { API_ENDPOINT, API_RESPONSE_STATUS } from "@/constants/api";
import { makeSuccessResponseSchema } from "@/lib/api";
import { backendApi } from "@/lib/axios";
import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { z } from "zod";

interface QuestionDetailsProps {
    questionId: number
}

const getQuestionDetailsResponseSchema = makeSuccessResponseSchema(z.object({
    question: z.object({
        description: z.string()
    })
}))

export const QuestionDetails = ({ questionId }: QuestionDetailsProps) => {

    const [details, setQuestionDetails] = useState<string>()
    const [loading, isLoading] = useState(true)

    useEffect(() => {
        async function getQuestionDetails() {
            const { data } = await backendApi.get(`${API_ENDPOINT.QUESTIONS}/${questionId}`)
            const questionData = getQuestionDetailsResponseSchema.parse(data)
            if (questionData.status === API_RESPONSE_STATUS.SUCCESS) {
                setQuestionDetails(questionData.data.question.description)
                isLoading(false)
            }
        }

        getQuestionDetails()
    }, [questionId])

    return (
        <Box flex={1} padding={"0.75rem"} border="1px" borderColor={"ActiveBorder"} rounded="md" height="full">
            <Text whiteSpace={"pre-wrap"}>{loading ? "Loading..." : details}</Text>
        </Box>
    )
}