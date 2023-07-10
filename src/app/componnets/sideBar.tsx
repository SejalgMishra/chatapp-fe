import Avatar from "@/app/componnets/avatar";
import Button from "@/app/componnets/button";
import UserCard from "@/app/componnets/serchUserCard";
import { userDetails } from "@/redux/user/userAction";
import { getDataAPI } from "@/utilis/api";
import { useState } from "react";
import { AiOutlineCloseCircle, AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

interface props {
  auth: any;
}

const SideBar = ({ auth }: props) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  const dispatch = useDispatch();

  const handleSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!search) return;

    try {
      const res: any = await getDataAPI(`serch?username=${search}`, auth.token);
      console.log(res);
      setUsers(res);
      dispatch(userDetails(res));
      console.log(users);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" bg-slate-900 w-[32%] h-screen">
        <div className=" m-2 rounded-lg p-2 bg-slate-300 flex">
        <div className="flex items-center gap-2">
          <Avatar
            src={auth?.data?.data?.response?.image}
            size="h-14 w-14 rounded-full"
          />
          <p className="text-lg">
            Welcome {auth?.data?.data?.response?.username}
          </p>
          <div>edit</div>
        </div>
      </div>
      <div>
        <form onSubmit={handleSearch}>
          <div className="flex  w-96 items-center p-2">
            <input
              type="text"
              name="search"
              value={search}
              id="search"
              title="Enter to Search"
              className="px-4 p-1 w-96 mx-1 border-b-2 outline-none relative "
              onChange={(e) =>
                setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
              }
              placeholder="Enter to Search"
            />
            {search ? (
              <AiOutlineCloseCircle
                size={20}
                className="absolute left-[15%] text-slate-600 my-3"
                onClick={handleClose}
              />
            ) : null}
            <button className="bg-slate-300 text-white text-base p-3   rounded-full flex items-center">
              <AiOutlineSearch className="text-slate-900" />
            </button>
          </div>
        </form>
      </div>
      <div className="users absolute w-96 mt-1">
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
