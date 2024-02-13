"use client";
import { MyInput } from "@components/ui/MyInput";
import { Formiz, useForm } from "@formiz/core";
import { isEmail, isNotEmptyString } from "@formiz/validations";
import { useAuth } from "@hooks/useAuth";
import { Button, Divider, Input } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { GrGithub, GrGoogle } from "react-icons/gr";
import { MoonLoader } from "react-spinners";

interface UserType {
  name: string;
  dob: Date;
  email: string;
  password: string;
  surname: string;
}

const RegisterPage = () => {
  const { handleRegister, isLoading, validateUsername, validateEmail } =
    useAuth();

  const form = useForm({ onSubmit: handleRegister });

  return (
    <section className="absolute h-screen w-full bg bg-black z-10 flex items-center justify-center">
      <div className="h-fit w-[90%] sm:w-[70%] md:w-1/2 lg:w-2/5 xl:w-1/3 bg-gray-500/20 border rounded-lg border-gray-400/30 gap-5 flex flex-col p-10">
        <div className="flex items-center justify-center p-3">
          <h2 className="font-sans text-white font-bold text-2xl">Register</h2>
        </div>
        <Divider
          style={{
            borderStyle: "solid",
          }}
          className="border-white/20 p-0 m-0"
        />
        <Formiz connect={form} autoForm>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <MyInput
                placeholder="First Name"
                type="text"
                name="name"
                required={true}
                className="py-3 px-3 placeholder:text-gray-700"
                validations={[
                  {
                    handler: isNotEmptyString(),
                    message: "Name can't be empty",
                  },
                ]}
              />
              <MyInput
                placeholder="Last Name"
                type="text"
                name="surname"
                required={true}
                className="py-3 px-3 placeholder:text-gray-700"
              />
            </div>

            <MyInput
              placeholder="Username"
              type="text"
              name="username"
              required={true}
              validationsAsync={[
                {
                  handler: async (value: any) => {
                    const isAlreadyUsed = await validateUsername(value);
                    return isAlreadyUsed;
                  },
                  message: "Username already used, please select another one.",
                },
              ]}
              className="py-3 px-5 placeholder:text-gray-700"
            />

            <MyInput
              placeholder="Email"
              type="text"
              name="email"
              required={true}
              className="py-3 px-5 placeholder:text-gray-700"
              validationsAsync={[
                {
                  handler: async (value: any) => {
                    const isAlreadyUsed = await validateEmail(value);
                    return isAlreadyUsed;
                  },
                  message: "Email already exist, please login.",
                },
              ]}
              validations={[
                {
                  handler: isEmail(),
                  message: "Email is invalid",
                },
              ]}
            />

            <MyInput
              placeholder="Password"
              type="password"
              name="password"
              required={true}
              className="py-3 px-5 placeholder:text-gray-700"
              validations={[
                {
                  handler: (value: string) => value.length >= 8,
                  message: "Password must be greater than 8",
                },
              ]}
            />

            <MyInput
              type="date"
              placeholder="Date of Birth"
              name="dob"
              required={true}
              className="py-3 px-5 placeholder:text-gray-700"
            />
          </div>
          {isLoading ? (
            <div
              className={`h-12 flex items-center justify-center bg-blue-700 cursor-not-allowed  font-bold rounded-xl w-full mt-5 transition-all duration-300`}
            >
              <MoonLoader size={25} color="#fff" />
            </div>
          ) : (
            <button
              disabled={!form.isValid ?? isLoading}
              type="submit"
              className={`h-12 bg-blue-500 font-bold rounded-xl w-full mt-5 transition-all duration-300 ${
                form.isValid
                  ? "active:bg-blue-700 hover:bg-blue-600"
                  : "cursor-not-allowed"
              }`}
            >
              Login
            </button>
          )}
        </Formiz>
        <Divider
          style={{
            borderStyle: "solid",
          }}
          className="border-white/20 p-0 m-0"
        />
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
          <Link href={"/login"} className="">
            <Button type="link" className="p-0">
              Click here
            </Button>
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;
