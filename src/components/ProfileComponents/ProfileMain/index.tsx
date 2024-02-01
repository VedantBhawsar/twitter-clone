"use client";
import { Post } from "@components/HomeComponents/Posts";
import { Button } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { BiCloudDownload, BiPaint, BiUndo } from "react-icons/bi";
import { ImOffice } from "react-icons/im";

export const ProfileMain = () => {
  const [selected, setSelected] = useState(0);
  const subSections: string[] = [
    "Posts",
    "Replies",
    "Highlights",
    "Media",
    "Likes",
  ];

  return (
    <section className="relative flex h-screen flex-col overflow-y-scroll">
      <div className="relative w-full min-h-52 ">
        <Image
          src={
            "https://pbs.twimg.com/profile_images/1380090681360674819/XPGDbCRR_400x400.jpg"
          }
          alt="Picture of the author"
          fill
          className="object-cover p-1 -z-10"
        />
        <button className="absolute bottom-5 right-5  bg-black/30 hover:bg-black/40 active:bg-black/50 flex text-gray-300 px-4 p-2 items-center gap-1 font-bold rounded-md">
          <BiPaint size={18} />
          <p>Edit</p>
        </button>
      </div>
      <div className="flex flex-col px-5 gap-5">
        <div className="flex items-center justify-between ">
          <div className="relative h-56 w-56 -mt-24 rounded-full cursor-pointer ">
            <Image
              src={
                "https://pbs.twimg.com/profile_images/1380090681360674819/XPGDbCRR_400x400.jpg"
              }
              fill
              alt="Picture of the author"
              className="aspect-square object-cover rounded-full p-1 bg-black "
            />
          </div>
          <button
            // type="primary"
            className="text-lg border-2 border-gray-400 rounded-full px-5 py-2 hover:bg-white/20 active:bg-white/30 transition-all duration-300 font-bold"
          >
            Edit profile
          </button>
        </div>

        <div className="">
          <h1 className="text-3xl font-bold text-white-900">Vedant</h1>
          <p className="text-md  text-gray-300">@vedant</p>
        </div>

        <div className="flex">
          <p className="text-lg">
            Full stack dev | open for opportunities and to Collaborate | Nextjs,
            TS, Tailwind, React Native Lorem ipsum dolor sit amet.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <p className="flex  items-center gap-3 text-md text-gray-500">
              <ImOffice />
              Software developer/Programmer/Software engineer
            </p>
            <p className="flex  items-center gap-3 text-md text-gray-500">
              <ImOffice />
              Software developer/Programmer/Software engineer
            </p>
          </div>
          <div className="flex gap-2">
            <p className="flex items-center gap-3 text-md text-gray-500">
              <ImOffice />
              Software developer/Programmer/Software engineer
            </p>
            <p className="flex  items-center gap-3 text-md text-gray-500">
              <ImOffice />
              Software developer/Programmer/Software engineer
            </p>
          </div>
        </div>

        <div className="flex gap-3 text-xl">
          <button className="flex gap-2 items-center cursor-pointer">
            <span className="font-bold">38</span>
            <p className="text-gray-400 hover:text-gray-500 active:text-gray-600 transition-all duration-300 ">
              Followers
            </p>
          </button>
          <button className="flex gap-2 items-center cursor-pointer">
            <span className="font-bold">12</span>
            <p className="text-gray-400">Following</p>
          </button>
        </div>

        <nav className="flex items-center h-20">
          {subSections.map((subSection, index) => {
            return (
              <button
                key={index}
                className={`flex-1 hover:bg-gray-400/10 ${
                  selected === index
                    ? "border-b-4 border-blue-400"
                    : "border-b border-gray-400/20"
                } flex items-center justify-center p-5 transition-all duration-300`}
                onClick={() => setSelected(index)}
              >
                <p
                  className={
                    index === selected
                      ? "font-bold transition-all duration-300"
                      : ""
                  }
                >
                  {subSection}
                </p>
              </button>
            );
          })}
        </nav>

        {/* <div className="flex flex-col">
          <Post />
          <Post />
        </div> */}
      </div>
    </section>
  );
};
