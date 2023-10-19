import { Page } from "@/components";
import { API_ENDPOINT, API_RESPONSE_STATUS } from "@/constants/api";
import { ROUTE } from "@/constants/route";
import { Collaborator, InfoBar } from "@/features/room";
import { Spinner, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { DIFFICULTY, DifficultyType, TOPIC_TAG, TopicTagType } from "@/constants/question";
import { User } from "@/types/user";
import { backendApi } from "@/lib/axios";
import { makeSuccessResponseSchema } from "@/lib/api";
import z from "zod";

interface RoomInfo {
  difficulty: DifficultyType[];
  topic: TopicTagType[];
  users: { connected: boolean; id: string; }[]
}


const getRoomInfoResponseSchema = makeSuccessResponseSchema(
  z.object({
    difficulty: z.array(z.nativeEnum(DIFFICULTY)),
    topic: z.array(z.nativeEnum(TOPIC_TAG)),
    users: z.array(z.object({
      connected: z.boolean(),
      id: z.string()
    }))
  })
)

const getUserInfoResponseSchema = makeSuccessResponseSchema(
  z.object({
    user: z.object({
      id: z.string(),
      email: z.string(),
      role: z.string(),
      name: z.string().nullable().optional().transform(val => val ?? undefined),
      avatarUrl: z.string().nullable().optional().transform(val => val ?? undefined),
    })
  })
)

function RoomPage() {

  const { roomId } = useParams();
  const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function getUserInfo(userId: string) {
      const { data } = await backendApi.get(`${API_ENDPOINT.USERS}/id/${userId}`)
      const userData = getUserInfoResponseSchema.parse(data)

      return userData.data.user
    }

    async function getRoomInfo() {
      try {
        const { data } = await backendApi.get(`${API_ENDPOINT.COLLABORATION}/room/${roomId}`)

        const response = getRoomInfoResponseSchema.parse(data)

        if (response.status === API_RESPONSE_STATUS.SUCCESS) {

          setRoomInfo(response.data)

          const { users } = response.data
          const pUsersData = users.map((user: { id: string; connected: boolean; }) => getUserInfo(user.id))
          const usersData = await Promise.all(pUsersData)
          setUsers(usersData)
          setLoading(false)
        }
      } catch (e) {
        console.error(e)
      }
    }
    getRoomInfo()
  }, [roomId, loading])

  if (loading || !roomInfo) return (<Spinner />)

  const { difficulty, topic } = roomInfo

  return (
    <Page display="grid" placeItems="center">
      <VStack
        marginBottom="4"
        flexDirection="column"
        align="left"
        height="full"
        width="full"
      >
        <InfoBar difficulty={difficulty} topic={topic} users={users} />
        {roomId ? (
          <Collaborator roomId={roomId} difficulty={difficulty} topic={topic} />
        ) : (
          <Navigate to={ROUTE.ROOT} />
        )}
      </VStack>
    </Page>
  );
}

export default RoomPage;
