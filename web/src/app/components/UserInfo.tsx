import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { FiMoreHorizontal } from "react-icons/fi";

const UserInfo = ({
  profilePic,
  name,
  username,
  className,
}: {
  profilePic: string;
  name: string;
  username: string;
  className: string;
}) => {
  return (
    <div className={cn("flex items-center text-primary-foreground", className)}>
      <Avatar className="h-9 w-9">
        <AvatarImage src={profilePic} alt="Avatar" />
        <AvatarFallback>{username?.at(0)}</AvatarFallback>
      </Avatar>
      <div className="ml-4">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-muted-foreground">@{username}</p>
      </div>
      <div className="ml-auto font-medium">
        <FiMoreHorizontal />
      </div>
    </div>
  );
};

export default UserInfo;
