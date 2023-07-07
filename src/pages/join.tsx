import Button from "@/app/componnets/button";
import { postDataAPI } from "@/utilis/api";
import { Formik } from "formik";
import Image from "next/image";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
interface MyFormValues {
  username: string;
  password: string;
  email: string;
  image: any;
}

const JoinRoom = () => {
  const initialValues: MyFormValues = {
    username: "",
    password: "",
    email: "",
    image:
      "",
  };
  const [data, setData] = useState(initialValues);
  const [avatar, setAvatar] = useState(
    "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
  );

  const handleChangeInput = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const { username, email, image, password } = initialValues;

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      let media :any
      const response = await postDataAPI("user", {
        ...data,
        avatar
    }, "");
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  const ChangeAvatar = (e: any) => {
    const file = e.target.files[0];
    console.log(file);

    setAvatar(file.name);
    console.log(avatar);
    
  };

  const myimage =
    "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png";

  return (
    <>
      <div className="bg-slate-400 bg-opacity-50">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <form
            className="flex flex-col justify-center items-center h-screen bg-slate-600 max-w-screen-lg mx-auto py-32 "
            onSubmit={handleSubmit}
          >
            <h1 className="text-3xl mb-3 text-slate-950 font-bold">Chat App</h1>
            <div className="flex flex-col gap-4 bg-black bg-opacity-30 py-10 px-10 rounded-xl text-white">
              <div className="info_avatar overflow-hidden  w-40 h-40 rounded-full  mx-auto m-4 cursor-pointer">
                <label
                  id="file_up"
                  className=" w-40 h-40 rounded-full  mx-auto cursor-pointer "
                >
                  <img
                    src={avatar}
                    alt=""
                    className="w-full h-full  object-cover z-10  "
                  />
                  <span className=" bottom-[-45%] left-0 w-full h-[50%] hidden hover:opacity-100 text-center  bg-orange-300 duration-300 ease-in-out hover:bottom-[-10%]">
                    <i className="fas fa-camera" />
                    <p>Change</p>
                    <input
                      type="file"
                      name="image"
                      id="file_up"
                      className="object-fit "
                      accept="image/*"
                      value={image}
                      onChange={ChangeAvatar}
                    />
                  </span>
                </label>
              </div>
              <div className="flex flex-col ">
                <label htmlFor="username" className="text-xl">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-96 border rounded-lg p-1 text-slate-600"
                  onChange={handleChangeInput}
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="username" className="text-xl">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-96 border rounded-lg p-1  text-slate-600"
                  onChange={handleChangeInput}
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="username" className="text-xl">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-96 border rounded-lg p-1  text-slate-600"
                  onChange={handleChangeInput}
                />
              </div>
              <Button text={"Submit"} className={"mt-6 w-full rounded-lg"} />
            </div>
          </form>
        </Formik>
      </div>
    </>
  );
};

export default JoinRoom;
