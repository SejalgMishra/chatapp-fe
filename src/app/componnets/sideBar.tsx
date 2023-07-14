import Avatar from "@/app/componnets/avatar";
import UserCard from "@/app/componnets/serchUserCard";
import { getGroup } from "@/redux/group/groupAction";
import { userDetails } from "@/redux/user/userAction";
import { getDataAPI } from "@/utilis/api";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import {
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import {
  AiOutlineCloseCircle,
  AiOutlineSearch,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

interface props {
  auth: any;
  classname: string;
}

const SideBar = ({ auth, classname }: props) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [recentChats, setRecentChats] = useState<any>([]);

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };
  const grp = useSelector((state) => state.grp.data);

  const dispatch = useDispatch();

  const location = usePathname();

  const router = useRouter();

  const inactive =
    "flex  font-[cursive] items-center gap-2 rounded-full m-2 p-1 bg-white";
  const active =
    "flex  font-[cursive] items-center gap-2 rounded-full m-2 p-1 bg-slate-400 ";

  const handleSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!search) return;
    try {
      const res: any = await getDataAPI(`serch?username=${search}`, auth.token);
      setUsers(res);
      dispatch(userDetails(res));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRecentChats = async () => {
    try {
      const res = await getDataAPI(`recent/${auth.data.id}`, auth.token);
      console.log(res);
      setRecentChats(res.filteredChats);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGroup = async () => {
    try {
      const res = await getDataAPI(`group/${auth.data.id}`, auth.token);
      console.log(res);
      dispatch(getGroup(res));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecentChats();
    fetchGroup();
  }, []);

  return (
    <div className={classname}>
      <div className="flex items-center gap-2 p-2 bg-slate-300 m-2 rounded-lg ">
        <Avatar src={auth?.data?.image} size="h-14 w-14 rounded-full" />
        <p className="text-lg">Welcome {auth?.data?.username}</p>
        <div>edit</div>
      </div>
      <div>
        <form onSubmit={handleSearch}>
          <div className="flex   items-center p-2 gap-2">
            <input
              type="text"
              name="search"
              value={search}
              id="search"
              title="Enter to Search"
              className="px-4 p-1 w-96 mx-1 border-b-2 outline-none relative rounded-full "
              onChange={(e) =>
                setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
              }
              placeholder="Enter to Search"
            />
            {search ? (
              <AiOutlineCloseCircle
                size={20}
                className="absolute left-[16%] text-slate-600 my-3"
                onClick={handleClose}
              />
            ) : null}
            <button className="bg-slate-300 text-white text-base p-3 rounded-full flex items-center">
              <AiOutlineSearch className="text-slate-900" />
            </button>
            <button className="bg-slate-300 text-white text-xl p-3 rounded-full flex items-center" onClick={() => router.push("/group")}>
              <AiOutlineUsergroupAdd className="text-slate-900" />
            </button>
          </div>
        </form>
        <div>
          <p className="text-center font-font text-lg text-white">
            Your Groups
          </p>
          {grp.length > 0
            ? grp.map((x) => (
                <div
                  className="bg-white m-2 rounded-full p-2 flex justify-between"
                  onClick={() => router.push(`/chat/${x.id}`)}
                  key={x.id}
                >
                  <div className="overflow-hidden">
                  <p className="font-[cursive]">{x.name}</p>
                  <p className="flex gap-1 ">{x.users.map((x)=> (
                    <span className="font-[cursive]">{x.username}{","}</span>
                  ))}</p>
                  </div>
                  <p className="flex items-center gap-1 mr-4 font-font">
                    {x.userId.length}{" "}
                    <AiOutlineUsergroupAdd className="text-slate-900" />
                  </p>
                </div>
              ))
            : null}
        </div>
        <div>
        <p className="text-center font-font text-lg text-white">
            Your Chats
          </p>
          {recentChats.map(
            (chat: {
              id: Key | null | undefined;
              receiverData: {
                id: any;
                image: string;
                username:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | PromiseLikeOfReactNode
                  | null
                  | undefined;
              };
              message:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | PromiseLikeOfReactNode
                | null
                | undefined;
            }) => (
              <a
                key={chat.id}
                className={
                  location === `/chatRoom/${chat.receiverData.id}`
                    ? active
                    : inactive
                }
                onClick={() => router.push(`/chatRoom/${chat.receiverData.id}`)}
              >
                <Avatar
                  src={chat.receiverData.image}
                  size="h-14 w-14 rounded-full"
                />
                <div className="flex flex-col">
                  <p>{chat.receiverData.username}</p>
                  {chat.message && <p>{chat.message}</p>}
                </div>
              </a>
            )
          )}
        </div>
      </div>
      <div className="users absolute w-96 mt-1 top-36 z-10">
        {search &&
          users?.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              border="border"
              children={undefined}
            />
          ))}
      </div>
    </div>
  );
};

export default SideBar;
