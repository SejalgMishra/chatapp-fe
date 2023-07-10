import Header from "@/app/componnets/header";
import SideBar from "@/app/componnets/sideBar";
import { useRouter } from "next/router";
import { AiOutlineSend } from "react-icons/ai";
import { useSelector } from "react-redux";
import InputEmoji from "react-input-emoji";
import { useState } from "react";

const ChatRoomPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const auth = useSelector((state) => state.auth);

  const user = useSelector((state) => state.user.data);

  console.log(user);

  const reciverId = user.find(
    (x: { id: string | string[] | undefined }) => x.id === id
  );

  console.log(reciverId);
  const [text, setText] = useState("");

  // Rest of your component code

  return (
    <div className="flex">
      <SideBar auth={auth} />
      <div className="w-full h-screen flex flex-col justify-between">
        <Header user={reciverId} />
        <div className="bottom-0 flex m-3 gap-2 items-center">
        <InputEmoji
            value={text}
            onChange={setText}
            cleanOnEnter
            placeholder="Type a message"            
          />
          <button className="p-4 bg-black rounded-full">
            <AiOutlineSend className="text-white" />
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default ChatRoomPage;
