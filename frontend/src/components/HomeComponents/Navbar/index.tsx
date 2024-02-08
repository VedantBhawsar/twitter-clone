"use client";
import React, { useEffect, useState } from "react";

export const Navbar = () => {
  const [activeTab, setActiveTab] = React.useState(1);
  return (
    <nav className="flex h-16  max-h-[4.2rem] min-h-[3.5rem] select-none  border-b-[1px] border-gray-600">
      <div
        className={`flex-1 flex justify-center items-center ${
          activeTab === 1 && "bg-gray-400/20"
        } hover:bg-gray-400/10 cursor-pointer  active:bg-gray-400/20 transition-all duration-300 `}
        onClick={() => {
          setActiveTab(1);
        }}
      >
        <h2 className={` ${activeTab === 1 && "font-bold"} `}>For you</h2>
      </div>{" "}
      <div
        className={`flex-1 flex justify-center items-center hover:bg-gray-400/10 ${
          activeTab === 2 && "bg-gray-400/20"
        } cursor-pointer active:bg-gray-400/20 transition-all duration-300`}
        onClick={() => {
          setActiveTab(2);
        }}
      >
        <h2
          className={`${
            activeTab === 2 && "font-bold"
          } transition-all duration-300`}
        >
          Following
        </h2>
      </div>
    </nav>
  );
};
