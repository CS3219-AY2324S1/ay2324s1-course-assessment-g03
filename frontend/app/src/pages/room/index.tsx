import { Page } from "@/components"
<<<<<<< HEAD
import { ROUTE } from "@/constants/route";
import { Collaborator, InfoBar } from "@/features/room"
import { VStack } from "@chakra-ui/react"
import { useParams, Navigate } from "react-router-dom";

function RoomPage() {

    const { roomId } = useParams();

    console.log(roomId)

=======
import { Collaborator, InfoBar } from "@/features/room"
import { VStack } from "@chakra-ui/react"

function RoomPage() {
>>>>>>> db2103e (Add collab-service frontend)
    return (
        <Page display="grid" placeItems="center">
            <VStack marginBottom="4" flexDirection="column" align="left" height="full" width="full">
                <InfoBar difficulty={"Easy"} topic={"Data Structures & Algorithms"} />
<<<<<<< HEAD
                // TODO: Add Error message if room id not passed as prop
                {roomId ? <Collaborator roomId={roomId} /> : <Navigate to={ROUTE.ROOT} />}
=======
                <Collaborator />
>>>>>>> db2103e (Add collab-service frontend)
            </VStack>
        </Page >
    )
}

export default RoomPage