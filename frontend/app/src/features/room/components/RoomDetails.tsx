import { Box, HStack } from "@chakra-ui/react"

export const RoomDetails = () => {
    return (
        <HStack border="1px" borderColor="ActiveBorder" rounded="md" padding="3" justifyContent={"space-between"}>
            <HStack>
                <Box>Shem</Box>
                <Box>Joel</Box>
            </HStack>
            <HStack>
                <Box>Easy</Box>
                <Box>DSA</Box>
            </HStack>
        </HStack>
    )
}