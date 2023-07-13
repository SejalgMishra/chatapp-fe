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
import { log } from "util";
import { Data } from "emoji-mart";
import { getMessage, postmsg } from "@/redux/chat/chatAction";

const ChatRoomPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const auth = useSelector((state) => state.auth);

  const msg = useSelector((state) => state.msg);

  console.log(msg);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.serchUserDetails);
  const [users, setUser] = useState<any>([]);

  const reciverId = user?.find(
    (x: { id: string | string[] | undefined }) => x.id === id
  );

  const rid = reciverId?.id;

  const dataa = users?.find(
    (x: { receiverData: any; id: string }) => x?.receiverData?.id == id
  );

  const dataId = dataa?.receiverData.id;

  console.log(rid, "rid");

  console.log(dataId, "dataId");

  console.log(auth.data.id, "auth.data.id");

  const token: any = localStorage.getItem("token");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<any>([]);

  const fetchdata = async () => {
    const res = await getDataAPI(
      `message/${rid ? rid : dataId}?userId=${auth.data.id}`,
      token
    );

    console.log(res);
    dispatch(getMessage(res));
  };

  const userDetails = async () => {
    const res = await getDataAPI(`recent/${auth.data.id}`, auth.token);
    console.log(res , "hghfgff");
    
    setUser(res.filteredChats);
  };

  useEffect(() => {
    fetchdata();
    userDetails();
  }, []);

  const filtermsg = msg?.data?.filter((x) => {
    return (
      (x.receiver === id && x.userId === auth.data.id) ||
      (x.userId === id && x.receiver === auth.data.id)
    );
  });

  const handlesubmit = async () => {
    const data = {
      message: text,
      receiver: rid ? rid : dataId,
      token,
    };
    if (data.message === "") {
      return;
    }
    try {
      const res = await postDataAPI(`message/${auth?.data.id}`, data, token);
      console.log(res);
      dispatch(postmsg(res));
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-black bg-opacity-20 h-screen">
      <SideBar
        auth={auth}
        classname={"bg-slate-900 w-[32%] h-screen hidden lg:block"}
      />
      <div className="w-full h-screen flex flex-col ">
        <Header user={reciverId ? reciverId : dataa?.receiverData} />


        <div className="flex flex-col overflow-y-scroll no-scrollbar">
          {filtermsg?.map(
            (
              message: { userId: any; message: any },
              index: Key | null | undefined
            ) => (
              <ChatRoom
                key={index}
                user={auth.data}
                id={reciverId ? reciverId : dataa?.receiverData}
                sentByCurrentUser={message.userId === auth.data.id}
                msg={message.message}
              />
            )
          )}
        </div>
        <div className="flex m-3 gap-2 items-center bottom-0 ">
          <InputEmoji
            value={text}
            onChange={setText}
            cleanOnEnter
            placeholder="Type a message"
          />
          <button className="p-4 bg-black rounded-full" onClick={handlesubmit}>
            <AiOutlineSend className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomPage;
