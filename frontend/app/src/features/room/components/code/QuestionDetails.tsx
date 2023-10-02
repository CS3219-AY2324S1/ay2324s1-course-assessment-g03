import { Box } from "@chakra-ui/react";

interface Props {
    details: string;
}

export const QuestionDetails: React.FC<Props> = ({ details }) => {
    return (
        <Box flex={1} border="1px" borderColor={"ActiveBorder"} rounded="md" height="full">
            {details}
        </Box>
    )
}