"use client";
import { Formik } from "formik";
import { ToastContainer } from "react-toastify";
import Button from "../app/componnets/button";
import { useState } from "react";
import { AiOutlineWechat } from "react-icons/ai";
import { postDataAPI } from "@/utilis/api";
import { useDispatch } from "react-redux";
import { login } from "@/redux/auth/authAction";
import { useRouter } from "next/router";
import { ResponseType } from "axios";

interface MyFormValues {
  username: string;
  password: string;
}

export default function Home() {
  const initialValues: MyFormValues = {
    username: "",
    password: "",
  };
  const [data, setData] = useState(initialValues);

  const dispatch = useDispatch();
  const router = useRouter()

  const handleChangeInput = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res = await postDataAPI("login", data, "");
      console.log("res", res);
      dispatch(login(res));
      localStorage.setItem("token", res?.token);
      router.push("/chatRoom/chat")
    } catch (error) {
      console.log(error);
    }
  };

  const { username, password } = data;
  return (
    <div className="bg-slate-400 bg-opacity-30">
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validate={(initialValues: MyFormValues) => {
          const errors: Partial<MyFormValues> = {};

          if (!initialValues.username) {
            errors.username = "Username is required";
          }
          if (!initialValues.password) {
            errors.password = "Password is required";
          }

          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <form
            className="flex flex-col justify-center items-center h-screen  max-w-screen-lg mx-auto py-32 "
            onSubmit={handleSubmit}
          >
            <AiOutlineWechat size={60} />
            <h1 className="text-3xl mb-3 text-slate-950 font-bold">Chat App</h1>
            <div className="flex flex-col gap-4 bg-black bg-opacity-60 py-10 px-10 rounded-xl text-white">
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
            <div className="flex gap-1">
              <p className="font-font">not Registered?</p> <span className="font-font underline" onClick={()=>router.push("/join")}>Register</span>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
