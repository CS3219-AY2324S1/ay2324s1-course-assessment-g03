import { Text } from "@chakra-ui/react";

interface SystemMessageProps {
  message: string;
}

export const SystemMessage = ({ message }: SystemMessageProps): JSX.Element => (
  <Text textAlign="center" color="grey">
    {message}
  </Text>
);
