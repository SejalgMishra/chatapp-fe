import React, { useState } from "react";
import Avatar from "./avatar";
import { IoIosArrowDropdown } from "react-icons/io";

interface props {
  user: any;
}

const Header = ({ user }: props) => {
  const [show, setShow] = useState<boolean>(false);

  const toggleDelete = () => {
    setShow(!show);
  };

  return (
    <div className="p-1 bg-slate-100 shadow-xl rounded-lg m-2 flex justify-between items-center ">
      <div className="flex gap-3 items-center">
        <Avatar src={user?.image} size="h-16 w-16 rounded-full" />
        <p className="font-[cursive] text-xl">{user?.username}</p>
      </div>
      <div onClick={toggleDelete}>
          <IoIosArrowDropdown className="dropdown h-9 w-9 text-blue-950 mr-16" />
          {show && (
            <div className="origin-top-left absolute z-10 mt-2 w-24 rounded-md shadow-lg py-1 bg-blue-950  ring-1 ring-black ring-opacity-5 focus:outline-none">
              <a  className="block px-4 py-2 text-sm text-white ">
                Profile
              </a>
              <a  className="block px-4 py-2 text-sm text-white">
                Clear chat
              </a>
              
            </div>
          )}
        </div>
    </div>
  );
};

export default Header;
