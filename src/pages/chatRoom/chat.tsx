import SideBar from '@/app/componnets/sideBar'
import React from 'react'
import { useSelector } from 'react-redux';

const ChatRoom = () => {
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  

  return (
    <div>
        <SideBar auth={auth} classname={"bg-slate-900 lg:w-[32%] h-screen w-full"} />
    </div>
  )
}

export default ChatRoom