import SideBar from "@/app/componnets/sideBar";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputEmoji from "react-input-emoji";
import { AiOutlineSend } from "react-icons/ai";
import { postDataAPI } from "@/utilis/api";


const groupRoom = () => {
  const router = useRouter();
  const { gid } = router.query;
  const auth = useSelector((state) => state.auth);
  const grp = useSelector((state) => state.grp.data);
  console.log(grp);

  const [text, setText] = useState("");


  const grpData = grp?.find((x : { id : string}) => x.id == gid);
  console.log(grpData);

  const ids = grpData?.users.map((x) => (x.id))
  console.log(ids);

  
  const token:any = localStorage.getItem("token")

  const handlesubmit = async () => {
    const data = {
      message: text,
      receiver : ids ,
      token,
      type :"GROUP"
    };
    if (data.message === "") {
      return;
    }
    try {
      const res = await postDataAPI(`message/${auth?.data.id}`, data, token);
      console.log(res);
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between bg-slate-900 bg-opacity-20">
      <SideBar
        auth={auth}
        classname={"bg-slate-900 w-[32%] h-screen hidden lg:block"}
      />
      <div className="w-full m-2">
        <div>
          <div className="p-1 bg-slate-100 shadow-xl rounded-lg m-2 px-2">
            {" "}
            <h1 className="font-[cursive] text-3xl">{grpData?.name}</h1>
            <p className="flex gap-2 font-font">
              {grpData?.users.map(
                (x: {
                  username:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | React.PromiseLikeOfReactNode
                    | null
                    | undefined;
                }) => (
                  <p>{x.username}</p>
                )
              )}
            </p>
          </div>
        </div>
        <div className="flex m-3 gap-2 items-center bottom-0 ">
          <InputEmoji
            value={text}
            onChange={setText}
            cleanOnEnter
            placeholder="Type a message"
          />
          <button className="p-4 bg-black rounded-full" onClick={handlesubmit} >
            <AiOutlineSend className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default groupRoom;
