import { Avatar, Button } from "antd";
import React from "react";
import {
  MoreOutlined,
  WechatOutlined,
  HeartOutlined,
  CopyOutlined,
  BarChartOutlined,
  RetweetOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { CiChat1 } from "react-icons/ci";
import Image from "next/image";
export const Post = () => {
  const url =
    "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";

  const reactions = [
    {
      icon: <HeartOutlined />,

      className: "text-white/50 flex items-center gap-2",
      value: 287,
    },
    {
      icon: <WechatOutlined />,

      className: "text-white/50 flex items-center gap-2",
      value: 23,
    },
    {
      icon: <RetweetOutlined />,

      className: "text-white/50 flex items-center gap-2",
      value: 56,
    },
    {
      icon: <BarChartOutlined />,
      className: "text-white/50 flex items-center gap-2",
      value: 2,
    },
    {
      icon: <BarChartOutlined />,
      className: "text-white/50 flex items-center gap-2",
      value: 22,
    },
  ];

  return (
    <div className="flex w-full items-start gap-8 md:gap-5 p-5 border-b-[1px] border-gray-600">
      <div className="avtar hidden md:flex">
        <Avatar
          src={url}
          size={50}
          className="hover:bg-gray-500/30 p-2 transition-all duration-300 cursor-pointer active:bg-gray-500/50 object-cover"
        />
      </div>
      <div className="content flex flex-col w-full gap-5">
        <div className="flex gap-3">
          <div className="flex flex-col gap-2 items-start">
            <div className="flex gap-2 items-center">
              <div className="avtar flex md:hidden ">
                <Avatar
                  src={url}
                  size={40}
                  className="hover:bg-gray-500/30 p-2 transition-all duration-300 cursor-pointer active:bg-gray-500/50 object-cover"
                />
              </div>
              <h2 className="text-xl">vedant bhavsar</h2>
              <h2 className="text-md md:text-xl text-gray-400/50">@Vedant</h2>
              <div className="text-md md:text-xl text-gray-400/50">6h</div>
            </div>
            <p className="text-md">
              We, from Bangalore, are looking for Professionals, who have done
              Internship for minimum 4 months to 6 months, at Product
              Development firms in MERN Stack Android Native Flutter Deep
              Learning, Computer Vision, NLP, PyTorch We have 6 months Project
              Work
            </p>
            <Button
              type="link"
              className="p-0"
              onClick={() => {
                console.log("go to explore");
              }}
            >
              Show more
            </Button>

            <div className="relative flex w-full rounded-xl  overflow-hidden p-3 bg-gray-400/20 shadow-lg">
              <Image
                src={
                  "https://pbs.twimg.com/media/GEWlwP4XEAEmhW8?format=png&name=small"
                }
                alt="post img"
                width={50}
                height={50}
                className="w-full rounded-xl border-2 object-cover shadow-lg hover:cursor-pointer"
              />
            </div>

            <div className="relative flex w-full rounded-xl  overflow-hidden p-3 bg-gray-400/20 shadow-lg gap-3">
              <Image
                src={
                  "https://pbs.twimg.com/media/GEWlwP4XEAEmhW8?format=png&name=small"
                }
                alt="post img"
                width={50}
                height={50}
                className="w-1/2 rounded-xl border-2 hover:cursor-pointer shadow-lg
                "
              />
              <Image
                src={
                  "https://pbs.twimg.com/media/GEWlwP4XEAEmhW8?format=png&name=small"
                }
                alt="post img"
                width={50}
                height={50}
                className="w-1/2 rounded-xl border-2 shadow-lg hover:cursor-pointer"
              />
            </div>
          </div>
          <div className="more">
            <Button
              type="default"
              className="rounded-full text-white hover:text-blue-500 !hover:bg-blue-400/40 outline-none border-none hover:bg-blue-500/30"
              icon={<MoreOutlined className="text-inherit" />}
            />
          </div>
        </div>
        <div className="flex w-full flex-wrap justify-between">
          {reactions.map((reaction, index) => {
            return (
              <div key={index}>
                <Button
                  icon={reaction.icon}
                  type="link"
                  size="large"
                  className={reaction.className}
                >
                  {reaction.value}
                </Button>
              </div>
            );
          })}
          <div>
            <Button
              icon={<CopyOutlined />}
              type="link"
              className="text-white/50"
              size="large"
            />
            <Button
              icon={<ShareAltOutlined />}
              type="link"
              className="text-white/50"
              size="large"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
