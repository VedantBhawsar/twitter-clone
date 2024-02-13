"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

export const ProfileNavbar = ({ user, currentUser }: any) => {
  const [activeTab, setActiveTab] = useState(1);
  const router = useRouter();
  return (
    <nav className="flex h-16  max-h-[4.2rem] gap-5 min-h-[3.5rem] select-none items-center px-5 border-b-[1px] border-gray-600">
      <button
        className="p-3 rounded-full  hover:bg-gray-400/10 active:bg-gray-400/40 transition-all duration-300"
        onClick={() => {
          router.back();
        }}
      >
        <IoIosArrowBack size={25} />
      </button>
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">{user?.name}</h1>
        <p className="text-sm text-gray-300/80">41 posts</p>
      </div>
    </nav>
  );
};
