import { Box } from "@chakra-ui/react";

interface QuestionDetailsProps {
    details: string;
}

export const QuestionDetails = ({ details }: QuestionDetailsProps) => {
    return (
        <Box flex={1} border="1px" borderColor={"ActiveBorder"} rounded="md" height="full">
            {details}
        </Box>
    )
}