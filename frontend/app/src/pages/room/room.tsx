import { VStack, Flex } from "@chakra-ui/react"
import { CodeEditor, RoomDetails } from "@/features/room"

function RoomPage() {

    return (
        <VStack align={"left"} spacing="4" height="100vh" >
            <RoomDetails />
            <Flex flex={1} width="100%">
                <CodeEditor />
            </Flex>
        </VStack>
    )
}

export default RoomPage