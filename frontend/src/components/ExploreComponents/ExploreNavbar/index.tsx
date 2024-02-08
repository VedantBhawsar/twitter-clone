"use client";
import React, { useState } from "react";
import { Input } from "antd";

export const ExploreNavbar = () => {
  const [isActive, setIsActive] = useState(0);
  const tabs = ["For you", "Trending", "News", "Sports", "Enntertainment"];

  return (
    <nav className={"flex flex-col gap-3 border-b-[1px] border-gray-600"}>
      <div id={"searchBar"} className="w-full p-3 ">
        <Input
          placeholder="Search"
          className="placeholder:text-gray-200 rounded-full py-3 !px-4 bg-gray-300/30 hover:bg-gray-300/20 focus:bg-gray-300/20 outline-none text-white border-[1px] border-gray-300/30 "
          size="large"
        />
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
