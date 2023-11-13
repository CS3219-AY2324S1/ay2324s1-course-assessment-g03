import { useGetUserInfo } from "../../api/useGetUserInfo"
import { Text, Spinner, Avatar, HStack, VStack } from "@chakra-ui/react"

type RoomUserInfoProps = {
    user: {
        id: string;
        connected: boolean;
    }
}

export const RoomUserInfo = ({ user }: RoomUserInfoProps) => {

    const { id } = user

    const { isLoading, isError, data } = useGetUserInfo(id)

    if (isLoading) return (<Spinner />)

    if (isError || !data) return (<Text>Errored</Text>)

    const { name, avatarUrl, email } = data.data.user

    return (
        <HStack gap={2}>
            <Avatar name={name} src={avatarUrl} />
            <VStack alignItems="start" gap="0">
                <Text textStyle="heading-xs">{name ?? email}</Text>
            </VStack>
        </HStack>
    )
}