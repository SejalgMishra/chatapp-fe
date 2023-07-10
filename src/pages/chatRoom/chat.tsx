import SideBar from '@/app/componnets/sideBar'
import React from 'react'
import { useSelector } from 'react-redux';

const ChatRoom = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div>
        <SideBar auth={auth} />
    </div>
  )
}

export default ChatRoom