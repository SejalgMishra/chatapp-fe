import React from 'react'
import { useSelector } from 'react-redux'

interface props {
    src : string , 
    size:string
}

const Avatar = ({src, size} : props) => {

    return (
        <img src={src} alt="avatar" className={size}
        />
    )
}

export default Avatar