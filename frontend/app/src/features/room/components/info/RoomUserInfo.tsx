import { useGetUserInfo } from "../../api/useGetUserInfo"
import { Text, Spinner, Avatar, HStack, VStack, Icon } from "@chakra-ui/react"

type RoomUserInfoProps = {
    user: {
        id: string;
        connected: boolean;
    }
}

export const RoomUserInfo = ({ user }: RoomUserInfoProps) => {

    const { id, connected } = user

    const { isLoading, isError, data } = useGetUserInfo(id)

    if (isLoading) return (<Spinner />)

    if (isError || !data) return (<Text>Errored</Text>)

    const { name, avatarUrl, email } = data.data.user

    return (
        <HStack gap="0.75rem">
            <Avatar name={name} src={avatarUrl} />
            <VStack alignItems="start" gap="0">
                <Text textStyle="heading-xs">{name ?? email}</Text>
                <HStack>
                    <Icon viewBox='0 0 200 200' color={connected ? "green.500" : "red.500"}>
                        <path
                            fill='currentColor'
                            d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
                        />
                    </Icon>
                    <Text textAlign={"center"}>{connected ? "Online" : "Offline"}</Text>
                </HStack>
            </VStack>
        </HStack>
    )
}