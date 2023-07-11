import Header from "@/app/componnets/header";
import SideBar from "@/app/componnets/sideBar";
import { useRouter } from "next/router";
import { AiOutlineSend } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import InputEmoji from "react-input-emoji";
import { Key, useEffect, useState } from "react";
import ChatRoom from "@/app/componnets/chatRoom";
import { getDataAPI, postDataAPI } from "@/utilis/api";
import { usePathname } from "next/navigation";

const ChatRoomPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const auth = useSelector((state) => state.auth);

  const user = useSelector((state) => state.user.serchUserDetails);

  
  

  const reciverId = user?.find(
    (x: { id: string | string[] | undefined }) => x.id === id
  );

  const rid = reciverId?.id;

  const token: any = localStorage.getItem("token");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<any>([]);
  const [users, setUser] = useState<any>([]);

  const fetchdata = async () => {
    const message = await getDataAPI(`message/${rid}`, token);
    setMessages(message);
  };

  const userDetails = async () => {
    const res = await getDataAPI("recent", auth.token);
    setUser(res);
  };

  useEffect(() => {
    fetchdata();
    userDetails();
  }, []);

  const data = users?.find(
    (x: { receiverData: any; id: string }) => x?.receiverData?.id === id
  );

  const handlesubmit = async () => {
    // send text to server and clear the input field
    const data = {
      message: text,
      receiver: rid,
      token,
    };
    try {
      const res = await postDataAPI(
        `message/${auth?.data.data.response.id}`,
        data,
        token
      );
      fetchdata();
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-black bg-opacity-20">
      <SideBar auth={auth} />
      <div className="w-full h-screen flex flex-col justify-between">
        <Header user={reciverId ? reciverId : data?.receiverData} />

        <div className="flex flex-col overflow-hidden">
          {messages.map(
            (
              message: { userId: any; message: any },
              index: Key | null | undefined
            ) => (
              <ChatRoom
                key={index}
                user={auth.data.data.response}
                sentByCurrentUser={
                  message.userId === auth.data.data.response.id
                }
                msg={message.message}
              />
            )
          )}
          <div className="bottom-0 flex m-3 gap-2 items-center  ">
            <InputEmoji
              value={text}
              onChange={setText}
              cleanOnEnter
              placeholder="Type a message"
            />
            <button
              className="p-4 bg-black rounded-full"
              onClick={handlesubmit}
            >
              <AiOutlineSend className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomPage;
