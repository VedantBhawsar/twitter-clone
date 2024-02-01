import { Avatar, Button } from "antd";
import React from "react";
import { MoreOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
export const CardItem: React.FC = () => {
  return (
    <div className="flex justify-between cursor-pointer items-start px-5 py-3 hover:bg-gray-600/30 transition-all duration-300">
      <div className={"flex flex-col"}>
        <p className="text-xs text-gray-400">Trending</p>
        <h1 className="text-md text-white font-bold">Card content</h1>
        <p className="text-xs text-gray-400">1,095 posts</p>
      </div>
      <div
        className={
          "hover:text-blue-900  text-white p-1 hover:bg-blue-400/10 rounded-full transition-all duration-300 "
        }
      >
        <Button
          className={"p-0"}
          type="link"
          icon={<MoreOutlined className="text-xl font-bold text-white" />}
        />
      </div>
    </div>
  );
};

export const FollowItem: React.FC = () => {
  return (
    <div className="flex justify-between cursor-pointer items-start px-5 py-3 hover:bg-gray-600/30 transition-all duration-300">
      <div className="flex gap-2 items-center ">
        <Avatar className="" icon={<UserOutlined className="!text-xl" />} />
        <div className={"flex flex-col"}>
          <h1 className="text-md text-white font-bold">Vedant bhavsar</h1>
          <p className="text-xs text-gray-400">@vedant</p>
        </div>
      </div>
      <div
        className={
          "hover:text-blue-900  text-white p-1 hover:bg-blue-400/10 rounded-full transition-all duration-300 "
        }
      >
        <Button className={"p-0 px-3 rounded-full font-bold"} type="primary">
          Follow
        </Button>
      </div>
    </div>
  );
};
