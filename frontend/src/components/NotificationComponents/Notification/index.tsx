import { Avatar } from "antd";
import Link from "next/link";
import React from "react";
import { BiBell } from "react-icons/bi";

export const Notification = () => {
  return (
    <div className="flex gap-5  items-start p-3  border-b-2">
      <div>
        <BiBell color="blue" size={40} />
      </div>
      <div className="text-white/80 flex flex-col gap-2 p-1">
        <Avatar size={40} className="bg-gray-200/10">
          sd
        </Avatar>
        <h2 className="text-xl">
          New notifications for{" "}
          <Link href={"/"} className="font-bold hover:underline">
            Lorem
          </Link>
        </h2>
      </div>
    </div>
  );
};
