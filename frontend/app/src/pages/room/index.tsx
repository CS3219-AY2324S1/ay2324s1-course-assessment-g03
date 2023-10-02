import { Page } from "@/components"
import { Collaborator, InfoBar } from "@/features/room"
import { VStack } from "@chakra-ui/react"

function RoomPage() {
    return (
        <Page display="grid" placeItems="center">
            <VStack marginBottom="4" flexDirection="column" align="left" height="full" width="full">
                <InfoBar difficulty={"Easy"} topic={"Data Structures & Algorithms"} />
                <Collaborator />
            </VStack>
        </Page >
    )
}

export default RoomPage