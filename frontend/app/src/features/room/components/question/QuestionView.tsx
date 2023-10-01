import { Text, Box } from "@chakra-ui/react"

export const QuestionView: React.FC = () => {

    return (
        <Box height="full" border="1px" borderColor="ActiveBorder" rounded="md">
            <Text padding="4" textStyle="text-xs" textColor="white">
                Question Details
            </Text>
        </Box>
    )
}