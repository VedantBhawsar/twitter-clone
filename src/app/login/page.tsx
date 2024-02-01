"use client";
import { Button, Divider, Input } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { GrGithub, GrGoogle } from "react-icons/gr";

const LoginPage = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  return (
    <section className="absolute h-screen w-full bg bg-black z-10 flex items-center justify-center">
      <div className="h-3/4 w-1/3 bg-gray-500/20 border rounded-lg border-gray-400/30 gap-5 flex flex-col p-10">
        <div className="flex items-center justify-center p-3">
          <h2 className="font-sans text-white font-bold text-2xl">Login</h2>
        </div>
        <Divider type="horizontal" className="text-white" />
        <div className="flex flex-col gap-5">
          <Input
            placeholder="Email"
            type="text"
            size="large"
            name="email"
            required={true}
            className="bg-gray-400/20 active:bg-gray-400/10 placeholder:text-white py-3 px-5 rounded-xl"
          />
          <Input
            placeholder="Password"
            type="password"
            size="large"
            name="password"
            required={true}
            className="bg-gray-400/20 active:bg-gray-400/10 placeholder:text-white py-3 px-5 rounded-xl"
          />
        </div>
        <Button
          type="primary"
          className="h-12 bg-blue-500 font-bold rounded-xl"
        >
          Login
        </Button>
        {/* <Divider type="horizontal" /> */}
        <div className="flex flex-col gap-5">
          <button className="flex items-center bg-white hover:bg-white/80 active:bg-white/90 text-black gap-5 p-2 px-5 rounded-full transition-all duration-300">
            <GrGoogle size={25} />
            <div className="flex flex-col items-start ">
              <h2 className="font-bold text-md">Continue with google</h2>
              <p className="text-gray-800 text-sm">google@gmail.com</p>
            </div>
          </button>
          <button className="flex items-center bg-white hover:bg-white/80 active:bg-white/90 text-black gap-5 p-2 px-5 rounded-full transition-all duration-300">
            <GrGithub size={25} />
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
