"use client";
import { Avatar, Button, MenuProps } from "antd";

import React, { useState } from "react";
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
import { useRouter } from "next/navigation";
import { Dropdown, Space } from "antd";
import Link from "next/link";
import { TbTrash } from "react-icons/tb";
import { ImageModal } from "@components/Modals/imageModal";
import { BiUserPlus } from "react-icons/bi";
import { HiDocumentPlus } from "react-icons/hi2";

export const Post = ({ user }: any) => {
  const router = useRouter();
  const url =
    "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

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

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          className="text-red-400 py-1 px-2 items-center w-44 text-md  font-bold flex gap-2"
          onClick={() => {
            alert("hello");
          }}
        >
          <TbTrash />
          <p>Delete</p>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className="text-black items-center py-1 px-2 w-44 text-md font-bold flex gap-2"
          onClick={() => {
            alert("hello");
          }}
        >
          <BiUserPlus />
          <p>Follow @Vedant</p>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          className="text-black py-1 px-1 items-center w-44 text-md font-bold flex gap-2"
          onClick={() => {
            alert("hello");
          }}
        >
          <HiDocumentPlus />
          <p>Add/remove @Vedant</p>
        </div>
      ),
    },
  ];

  return (
    <div className="flex w-full items-start gap-8 md:gap-5 p-5 border-b-[1px] border-gray-600">
      <div className="avtar hidden md:flex">
        <Link href={`/profile/${user?._id}`}>
          <Image
            src={user?.images?.profileImage}
            width={70}
            height={70}
            alt="profile pic"
            className="hover:bg-gray-500/30 p-2 transition-all duration-300 cursor-pointer active:bg-gray-500/50 object-cover rounded-full"
          />
        </Link>
      </div>
      <div className="content flex flex-col w-full gap-5">
        <div className="flex gap-3">
          <div className="flex flex-col gap-2 items-start cursor-pointer">
            <div className="flex gap-2 items-center">
              <div className="avtar flex md:hidden ">
                <Image
                  src={user?.images?.profileImage}
                  width={40}
                  height={40}
                  alt="profile pic"
                  className="hover:bg-gray-500/30 p-0 transition-all duration-75 cursor-pointer active:bg-gray-500/50 object-cover"
                />
              </div>
              <Link
                href={`/profile/${user?._id}`}
                className="text-xl hover:underline underline-offset-2"
              >
                {user?.name}
              </Link>
              <h2 className="text-md md:text-xl text-gray-400/50">
                @{user?.username}
              </h2>
              <div className="text-md md:text-xl text-gray-400/50">6h</div>
            </div>
            <p className="text-md">
              We, from Bangalore, are looking for Professionals, who have done
              Internship for minimum 4 months to 6 months, at Product
              Development firms in MERN Stack Android Native Flutter Deep
              Learning, Computer Vision, NLP, PyTorch We have 6 months Project
              Work
            </p>
            <Link href={"/post/{id}"}>
              <Button
                type="link"
                className="p-0"
                onClick={() => {
                  console.log("go to explore");
                }}
              >
                Show more
              </Button>
            </Link>
            <div
              className="relative flex w-full rounded-xl  overflow-hidden p-3 bg-gray-400/20 shadow-lg"
              onClick={() => {
                setImageUrl(
                  "https://pbs.twimg.com/media/GEWlwP4XEAEmhW8?format=png&name=small"
                );
                setIsModalOpen(true);
              }}
            >
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
                className="w-1/2 rounded-xl border-2 hover:cursor-pointer shadow-lg"
                onClick={() => {
                  setImageUrl(
                    "https://pbs.twimg.com/media/GEWlwP4XEAEmhW8?format=png&name=small"
                  );
                  setIsModalOpen(true);
                }}
              />

              <Image
                src={
                  "https://pbs.twimg.com/media/GEWlwP4XEAEmhW8?format=png&name=small"
                }
                alt="post img"
                width={50}
                height={50}
                className="w-1/2 rounded-xl border-2 shadow-lg hover:cursor-pointer"
                onClick={() => {
                  setImageUrl(
                    "https://pbs.twimg.com/media/GEWlwP4XEAEmhW8?format=png&name=small"
                  );
                  setIsModalOpen(true);
                }}
              />
            </div>
          </div>

          <div className="more">
            <Dropdown
              menu={{ items }}
              placement="bottomRight"
              trigger={["click"]}
              className=""
              rootClassName="min-w-96"
              overlayClassName={"!min-w-64 !bg-black"}
            >
              <Button
                type="default"
                size="large"
                className="rounded-full text-white p-2  hover:text-blue-500 !hover:bg-blue-400/40 outline-none border-none hover:bg-blue-500/30"
                icon={<MoreOutlined className="!text-xl" />}
              />
            </Dropdown>
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
      <ImageModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        imageUrl={imageUrl}
      />
    </div>
  );
};
