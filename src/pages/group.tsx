import Avatar from "@/app/componnets/avatar";
import SideBar from "@/app/componnets/sideBar";
import { allUser } from "@/redux/user/userAction";
import { getDataAPI, postDataAPI } from "@/utilis/api";
import React, { useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BiArrowBack, BiCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import InputEmoji from "react-input-emoji";
import { useRouter } from "next/router";

const Group = () => {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user.allUser);
  const token: any = localStorage.getItem("token");
  const [users, setUsers] = useState<any[]>([]);
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const router = useRouter()

  const fetchUser = async () => {
    try {
      const res = await getDataAPI("user", token);
      dispatch(allUser(res));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const selectUser = (id: any) => {
    const selectedUserIndex = users.indexOf(id);
    if (selectedUserIndex === -1) {
      // User is not selected, add to the array
      setUsers([...users, id]);
    } else {
      // User is already selected, remove from the array
      const updatedUsers = [...users];
      updatedUsers.splice(selectedUserIndex, 1);
      setUsers(updatedUsers);
    }
  };

  const createGroup = async () => {
    const data = {
      users: users,
      userId: auth.data.id,
      name : text
    };
    try {
      const res = await postDataAPI("group", data, token);
      setUsers([])
      router.push(`chat/${res?.id}`)
    } catch (error) {}
  };
  const myimage =
  "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png";

  return (
    <div className="flex">
      <SideBar
        classname={"bg-slate-900 w-[32%] h-screen hidden lg:block"}
        auth={auth}
      />
      <div className="flex flex-col w-full">
        <div className="flex justify-between p-3 bg-slate-300 bg-opacity-70 m-3">
          <BiArrowBack
            size={24}
            className="p-2 border rounded-full h-10 w-10 border-black"
          />

          {users.length > 0 ? (
            <div className="flex items-center gap-2 w-[50%]">
              <InputEmoji
                value={text}
                onChange={setText}
                cleanOnEnter
                placeholder="Add your Group Name"
              />{" "}
              <button
                className="p-2 bg-blue-950  text-lg text-white font-font rounded-full"
                onClick={createGroup}
              >
                Create
              </button>{" "}
            </div>
          ) : (
            <div>
              {" "}
              <h1 className="text-4xl font-[cursive]">Wanna Create Group?</h1>
            </div>
          )}
        </div>
        <div className="flex flex-col overflow-y-scroll h-screen m-0.5 no-scrollbar">
          {user?.map((x) => (
            <div
              key={x.id}
              className="flex justify-between items-center p-3 bg-slate-900 bg-opacity-10 m-4 rounded-xl"
            >
              <div className="flex gap-2 items-center">
                <Avatar src={x.image ? x.image :myimage} size="h-14 w-14 rounded-full" />
                <p className="font-font text-xl">{x.username}</p>
              </div>
              <div className="mr-6" onClick={() => selectUser(x.id)}>
                {users.includes(x.id) ? (
                  <AiFillCheckCircle size={20} />
                ) : (
                  <BiCircle size={20} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Group;
