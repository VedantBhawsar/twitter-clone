"use client";
import { Button, Input } from "antd";

import React, { useState } from "react";
import { CiSettings } from "react-icons/ci";

export const NotificationNavbar = () => {
  const [isActive, setIsActive] = useState(0);
  const tabs = ["All", "Verified", "Mentions"];
  return (
    <nav className={"flex flex-col gap-3 border-b-[1px] border-gray-600"}>
      <div
        id={"searchBar"}
        className="w-full p-3 flex items-center justify-between px-5"
      >
        <h2 className="font-bold text-2xl ">Notification</h2>
        <button className="p-2 rounded-full hover:text-white hover:bg-white/20 active:bg-white/30 transition-all duration-300">
          <CiSettings color="inherit" size={30} />
        </button>
      </div>
      <div className={"flex"}>
        {tabs.map((tab, index) => {
          return (
            <div
              key={index}
              className={`flex-1 flex justify-center p-3 ${
                isActive === index &&
                "border-blue-500 border-b-4 bg-gray-400/30 text-white  "
              } text-gray-400/60  hover:bg-gray-400/30 active:bg-gray-400/40  cursor-pointer transition-all duration-300`}
              onClick={() => {
                setIsActive((prev) => (prev === index ? 0 : index));
              }}
            >
              <h2
                className={
                  " font-bold text-sm md:text-md lg:text-xl select-none "
                }
              >
                {tab}
              </h2>
            </div>
          );
        })}
      </div>
    </nav>
  );
};
