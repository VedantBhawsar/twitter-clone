"use client";
import { MyInput } from "@components/ui/MyInput";
import { Formiz, useForm } from "@formiz/core";
import { Button, Divider, Input } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { GrGithub, GrGoogle } from "react-icons/gr";

const LoginPage = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const form = useForm({ onSubmit: handleSubmit });

  function handleSubmit(value: { email: string; password: string }) {
    console.log(value);
  }

  return (
    <section className="absolute h-screen w-full bg bg-black z-10 flex items-center justify-center">
      <div className="h-fit w-[90%] sm:w-[70%] md:w-1/2 lg:w-2/5 xl:w-1/3 bg-gray-500/20 border rounded-lg border-gray-400/30 gap-5 flex flex-col p-10">
        <div className="flex items-center justify-center p-3">
          <h2 className="font-sans text-white font-bold text-2xl">Login</h2>
        </div>
        <Divider type="horizontal" className="text-white" />
        <Formiz connect={form} autoForm>
        <div className="flex flex-col gap-5">
          <MyInput
            placeholder="Email"
            type="text"
            size="large"
            name="email"
            required={true}
             className="py-3 px-3 placeholder:text-gray-700"
          />
          <MyInput
            placeholder="Password"
            type="password"
            size="large"
            name="password"
            required={true}
             className="py-3 px-3 placeholder:text-gray-700"
          />
        </div>
        <button type="submit"  className="h-12 bg-blue-500 active:bg-blue-700 hover:bg-blue-600 font-bold rounded-xl w-full mt-5 transition-all duration-300">
          Login
        </button>
        </Formiz>
        {/* <Divider type="horizontal" /> */}
        <div className="flex flex-col gap-3">
          <button className="flex items-center bg-white hover:bg-white/80 active:bg-white/90 text-black gap-5 p-2 px-5 rounded-full transition-all duration-300">
            <GrGoogle size={20} />
            <div className="flex flex-col items-start ">
              <h2 className="font-bold text-md">Continue with google</h2>
              <p className="text-gray-800 text-sm">google@gmail.com</p>
            </div>
          </button>
          <button className="flex items-center bg-white hover:bg-white/80 active:bg-white/90 text-black gap-5 p-2 px-5 rounded-full transition-all duration-300">
            <GrGithub size={20} />
            <div className="flex flex-col items-start ">
              <h2 className="font-bold text-md">Continue with github</h2>
              <p className="text-gray-800 text-sm">github@gmail.com</p>
            </div>
          </button>
        </div>
        <p>
          Create new account?{" "}
          <Link href={"/register"} className="">
            <Button type="link" className="p-0">
              Click here
            </Button>
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
