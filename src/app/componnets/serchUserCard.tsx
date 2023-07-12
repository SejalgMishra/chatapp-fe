import React from "react";
import Avatar from "./avatar";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

interface props {
  user: any;
  border: string;
  children: any;
}

const UserCard = ({ user, border, children }: props) => {
  const id = user.id;

  const router = useRouter()


  return (
    <div
      className={`flex p-2  shadow-md ${border} bg-slate-300 mx-3 z-10 `}
    > 
      <div>
        <a  onClick={() => router.push(`/chatRoom/${user.id}`)} className="flex items-center gap-4" >
          <Avatar src={user?.image} size="h-12 w-12 rounded-full " />

          <div className="ml-1" style={{ transform: "translateY(-2px)" }}>
            <span className="d-block">{user.username}</span>
          </div>
        </a>
      </div>

      {children}
    </div>
  );
};

export default UserCard;
