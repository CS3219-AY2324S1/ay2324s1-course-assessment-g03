import { User } from "@/types/user";

interface UserMessageProps {
  message: string;
  sender: User;
  isUser: boolean;
}

export const UserMessage = ({
  message,
  sender,
  isUser,
}: UserMessageProps): JSX.Element => {
  return (
    <div>
      <div>{message}</div>
    </div>
  );
};
