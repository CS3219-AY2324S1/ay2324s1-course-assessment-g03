import { Card } from "@/components";
import { User } from "@/types/user";
import { UserInfo } from "@/components/UserInfo/UserInfo";

type UserCardProps = {
  user: User | undefined;
};

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <Card w="full">
      <UserInfo user={user} />
    </Card>
  );
};
