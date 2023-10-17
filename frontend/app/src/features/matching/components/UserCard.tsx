import { Card } from "@/components";
import { User } from "@/types/user";
import { UserInfo } from "@/components/UserInfo/UserInfo";

type UserCardProps = {
  user: User | undefined;
};

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <Card
      backgroundImage="linear-gradient(#242325,#171619)"
      boxShadow="inset 0 1px 2px #525154, 0 13px 10px rgba(0,0,0,.35)"
      w="50%"
    >
      <UserInfo user={user} />
    </Card>
  );
};
