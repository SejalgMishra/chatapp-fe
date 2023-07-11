import React from "react";
import Avatar from "./avatar";

interface Props {
  user: any;
  sentByCurrentUser: any;
  msg :any
}

const ChatRoom = ({ user, sentByCurrentUser , msg }: Props) => {
  const messageContainerClass = sentByCurrentUser ? "justify-end" : "justify-start";
  const messageClass = sentByCurrentUser
    ? "bg-blue-600 bg-opacity-50 rounded-br-full rounded-tl-full rounded-bl-full p-2 px-3 mt-2 mr-2 font-[cursive]"
    : "bg-gray-300 bg-opacity-50 rounded-bl-full rounded-tr-full rounded-br-full p-2 px-3 mt-2 mr-2 font-[cursive]";

  return (
    <div className={`flex items-center gap-3 mr-7 ${messageContainerClass}`}>
      {!sentByCurrentUser && <Avatar src={user?.image} size="h-10 w-10 rounded-full" />}
      <p className={messageClass}>{msg}</p>
      {sentByCurrentUser && <Avatar src={user?.image} size="h-10 w-10 rounded-full" />}
    </div>
  );
};

export default ChatRoom;
