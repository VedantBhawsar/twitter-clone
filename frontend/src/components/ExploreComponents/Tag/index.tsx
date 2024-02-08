'use client'
import React from "react";
import { MoreOutlined } from "@ant-design/icons";
import { Button } from "antd";
export const Tag = () => {
  return (
    <div
      className={
        "flex justify-between items-start p-8 px-5 w-full border-b-[1px] border-gray-600 hover:bg-gray-400/10 transition-all duration-300 cursor-pointer"
      }
    >
      <div>
        <p className="text-gray-400 ">Trending in India</p>
        <h2 className={"text-xl md:text-2xl font-bold"}>#Oscars2024</h2>
        <p className="text-gray-400 hover:underline">90.9k posts</p>
      </div>
      <div className="more  rounded-full">
        <Button
          type="default"
          size={"large"}
          className="!rounded-full text-white hover:text-blue-500 !hover:bg-blue-400/40 outline-none border-none hover:bg-blue-500/30"
          icon={<MoreOutlined className="text-inherit" />}
        />
      </div>
    </div>
  );
};
