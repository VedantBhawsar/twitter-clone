"use client";
import { Avatar, Button, MenuProps } from "antd";

import React, { useEffect, useState } from "react";
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
import { useAuth } from "@hooks/useAuth";
import { useUseStore } from "@/stores/useStore";

export const Post = ({ post }: any) => {
  const router = useRouter();
  const [user, setUser] = useState<{
    _id: string;
    name: string;
    surname: string;
    email: string;
    username: string;
    password: string;
    followers: string[];
    followings: string[];
    createdAt: string;
    images: {
      profileImage: string;
    };
  }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { fetchUser } = useAuth();
  const currentUser: any = useUseStore((state) => state.user);

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
          className={`${
            currentUser?._id === post?.author_id ? "flex" : "hidden"
          }   text-red-400 py-1 px-2 items-center w-44 text-md  font-bold flex gap-2`}
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
          <p>Follow @{user?.username}</p>
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
          <p>Add/remove @{user?.username}</p>
        </div>
      ),
    },
  ];

  const date = new Date(post?.createdAt);

  useEffect(() => {
    async function getUser() {
      const data = await fetchUser(post?.author_id);
      setUser(data);
    }
    if (!post._id && currentUser?._id !== post?.author_id) {
      console.error("sdhfsldkjf");
      getUser();
    }
  }, []);

  return (
    <div className="flex w-full items-start gap-8 md:gap-5 p-5 border-b-[1px] border-gray-600">
      <div className="avtar hidden md:flex">
        <Link href={`/profile/${currentUser?._id ?? user?._id}`}>
          <Image
            src={
              user?.images?.profileImage ?? currentUser?.images?.profileImage
            }
            width={70}
            height={70}
            alt="profile pic"
            className="hover:bg-gray-500/30 p-2 transition-all duration-300 cursor-pointer active:bg-gray-500/50 object-cover rounded-full"
          />
        </Link>
      </div>
      <div className="content flex flex-col w-full gap-5">
        <div className="flex gap-3 w-full">
          <div className="w-full flex flex-col gap-2 items-start cursor-pointer">
            <div className="flex gap-2 items-center">
              <div className="avtar flex md:hidden ">
                <Image
                  src={
                    currentUser?.images?.profileImage ??
                    user?.images?.profileImage
                  }
                  width={40}
                  height={40}
                  alt="profile pic"
                  className="hover:bg-gray-500/30 p-0 rounded-full transition-all duration-75 cursor-pointer active:bg-gray-500/50 object-cover"
                />
              </div>
              <Link
                href={`/profile/${currentUser?._id ?? user?._id}`}
                className="text-xl hover:underline underline-offset-2"
              >
                {currentUser?.name ?? user?.name}
              </Link>
              <h2 className="text-md md:text-xl text-gray-400/50">
                @{user?.username}
              </h2>
              <div className="text-md md:text-xl text-gray-400/50">{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</div>
            </div>
            <p className="text-md">{post?.message}</p>
            <Link href={`/post/${post?._id}`}>
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
            {post?.images && (
              <div className="flex flex-col md:flex-row w-full gap-2">
                {post?.images.map((image: string, index: number) => (
                  <div
                    key={index}
                    className="flex-1  relative flex w-full rounded-xl  overflow-hidden p-1 bg-gray-400/20 shadow-lg"
                    onClick={() => {
                      setImageUrl(image);
                      setIsModalOpen(true);
                    }}
                  >
                    <Image
                      src={image}
                      alt="post img"
                      width={1090}
                      height={1920}
                      className="w-full rounded-xl object-cover shadow-lg hover:cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}
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
        setImageUrl={setImageUrl}
      />
    </div>
  );
};
