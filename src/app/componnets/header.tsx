import React from "react";
import Avatar from "./avatar";

interface props {
  user: any;
}

const Header = ({ user }: props) => {
  return (
    <div className="p-1 bg-slate-300  ">
      <div className="flex gap-3 items-center">
        <Avatar src={user?.image} size="h-16 w-16 rounded-full" />
        <p className="font-[cursive] text-xl">{user?.username}</p>
      </div>
    </div>
  );
};

export default Header;
