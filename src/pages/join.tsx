"use client"
import Button from "@/app/componnets/button";
import { login } from "@/redux/auth/authAction";
import { postDataAPI } from "@/utilis/api";
import { Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
interface MyFormValues {
  username: string;
  password: string;
  email: string;
  image: any;
}

const JoinRoom = () => {
  const Schema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    image: Yup.mixed(),
  });
  const initialValues: MyFormValues = {
    username: "",
    password: "",
    email: "",
    image: "",
  };
  const [data, setData] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);

  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarURL, setAvatarURL] = useState<string>("");

  const router = useRouter()
  const dispatch = useDispatch()

  const handleChangeInput = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const { username, email, image, password } = data;

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (isSubmit) {
        return; // Prevent multiple submissions
      }

      setIsSubmit(true);
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("image", avatar);

      const response = await postDataAPI("user", formData, "");
      console.log("response", response);
      if (response.status !== 200) {
        setIsSubmit(false);
        toast.error(`${response.msg}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.success("Successfully logged in !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch(login(response));
        localStorage.setItem("token" ,JSON.stringify(response.data.token))
        router.push("/chatRoom/chat")
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  const ChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      setAvatar(file);
      setAvatarURL(URL.createObjectURL(file));
    }
  };

  const myimage =
    "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png";

  return (
    <>
      <div className="bg-slate-400 bg-opacity-50">
        <ToastContainer />
        <Formik
          initialValues={initialValues}
          validate={(initialValues: MyFormValues) => {
            const errors: Partial<MyFormValues> = {};

            if (!initialValues.username) {
              errors.username = "Username is required";
            }
            if (!initialValues.email) {
              errors.email = "Email is required";
            }
            if (!initialValues.password) {
              errors.password = "Password is required";
            }
            if (initialValues.password.length < 6) {
              errors.password = "Password must have 6 character long";
            }

            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <form
              className="flex flex-col justify-center items-center h-screen bg-slate-600 max-w-screen-lg mx-auto py-32 "
              onSubmit={handleSubmit}
            >
              <h1 className="text-3xl mb-3 text-slate-950 font-bold">
                Chat App
              </h1>
              <div className="flex flex-col gap-4 bg-black bg-opacity-30 py-10 px-10 rounded-xl text-white">
                <div className="info_avatar overflow-hidden  w-40 h-40 rounded-full  mx-auto m-4 cursor-pointer">
                  <label
                    id="file_up"
                    className=" w-40 h-40 rounded-full  mx-auto cursor-pointer "
                  >
                    <img
                      src={avatarURL ? avatarURL : myimage}
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
                    value={username}
                    className="w-96 border rounded-lg p-1 text-slate-600"
                    onChange={handleChangeInput}
                  />
                   {errors.username && touched.username ? (
                    <p className="text-black bg-red-600">{errors.username}</p>
                  ) : null}
                </div>
               
                <div className="flex flex-col">
                  <label htmlFor="username" className="text-xl">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
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
                    value={password}
                    className="w-96 border rounded-lg p-1  text-slate-600"
                    onChange={handleChangeInput}
                  />
                </div>
                <Button
                  text={"Submit"}
                  className={"mt-6 w-full rounded-lg"}
                  onclick={undefined}
                  disabled={undefined}
                />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default JoinRoom;
