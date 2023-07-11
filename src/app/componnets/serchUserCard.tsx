import React from "react";
import Avatar from "./avatar";
import Link from "next/link";
import { useParams } from "next/navigation";

interface props {
  user: any;
  border: string;
  children: any;
}

const UserCard = ({ user, border, children }: props) => {
  const id = user.id;
  console.log(user.id);

  return (
    <div
      className={`flex p-2 align-items-center justify-content-between w-100 shadow-md ${border} bg-slate-300 mx-3 z-10 `}
    >
      <div>
        <Link href={`/chatRoom/${id}`} className="flex items-center gap-4">
          <Avatar src={user?.image} size="h-12 w-12 rounded-full " />

          <div className="ml-1" style={{ transform: "translateY(-2px)" }}>
            <span className="d-block">{user.username}</span>
          </div>
        </Link>
      </div>

      {children}
    </div>
  );
};

export default UserCard;
