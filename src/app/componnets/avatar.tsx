import React from "react";
interface props {
  src: string;
  size: string;
}

const Avatar = ({ src, size }: props) => {
  return <img src={src} alt="avatar" className={size} />;
};

export default Avatar;
