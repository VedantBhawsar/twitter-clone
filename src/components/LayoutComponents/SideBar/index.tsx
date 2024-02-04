"use client";
import React, { useRef } from "react";
import {
  MoreOutlined,
  UsergroupAddOutlined,
  MailOutlined,
  BookOutlined,
  ContainerOutlined,
  BellOutlined,
  UserOutlined,
  HomeFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { Avatar, MenuProps, Flex, Layout, Menu, Button, Input, Dropdown } from "antd";
import { CardItem, FollowItem } from "@components/ui/Items";
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation";
import Link from "next/link";
import { TbTrash } from "react-icons/tb";

export function SideBar1() {
  const [isActive, setIsActive] = React.useState<string[]>(["1"]);
  const pathName = usePathname();
  const router = useRouter();
  const segment = useSelectedLayoutSegment();
  const menuRef = useRef(null);

  const links = [
    {
      icon: <HomeFilled className="!text-xl" />,
      label: "Home",
      title: "home",
      link: "/home",
    },
    {
      icon: <SearchOutlined className="!text-xl" />,
      label: "Explore",
      title: "explore",
      link: "/explore",
    },
    {
      icon: <BellOutlined className="!text-xl" />,
      label: "Notifications",
      title: "notifications",
      link: "/notifications",
    },

    {
      icon: <MailOutlined className="!text-xl" />,
      label: "Message",
      title: "message",
      link: "/message",
    },
    {
      icon: <BookOutlined className="!text-xl" />,
      label: "Lists",
      title: "lists",
      link: "/lists",
    },
    {
      icon: <ContainerOutlined className="!text-xl" />,
      label: "Bookmarks",
      title: "bookmarks",
      link: "/bookmarks",
    },
    {
      icon: <UsergroupAddOutlined className="!text-xl" />,
      label: "Communities",
      title: "communities",
      link: "/communities",
    },
    {
      icon: <UserOutlined className="!text-xl" />,
      label: "Profile",
      title: "profile",
      link: "/profile/fsdfsdfsdf",
    },

    {
      icon: <MoreOutlined className="!text-xl" />,
      label: "More",
      title: "more",
      link: "/more",
    },
  ];

  
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button
        type="text"
        className="text-red-400 items-center w-44 text-md  font-bold flex gap-2"
        onClick={()=>{
          alert('hello')
        }}
        >
         <TbTrash/>
         <p>Delete</p>
        </Button>
      ),
      className:"text-green-500"
    },
  ];

  return (
    <div className="hidden w-72 flex-1 fixed md:flex flex-col h-screen justify-between p-3 border-r-[1px] border-gray-600 ">
      <nav className="flex flex-col gap-2 text-xl font-bold bg-black overflow-scroll">
        {links.map((item, index) => {
          return (
            <Link href={item.link} key={index}>
              <div
                className={`flex gap-3 drop-shadow-md ${
                  segment === item.title
                    ? "bg-blue-700"
                    : "bg-gray-500/10 text-white/50"
                } !py-2 !min-h-14 h-10 !max-h-14 items-center select-none !px-5 !rounded-xl hover:bg-blue-700  hover:text-white bg-black transition-all duration-200`}
              >
                {item.icon}
                <p>{item.label}</p>
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="flex p-2 gap-4 items-center justify-between hover:bg-white/10 active:bg-white/20 rounded-lg cursor-pointer transition-all duration-300 border-2 border-gray-500/40">
        <div className="flex gap-2 ">
          <Avatar size={50} icon={<UserOutlined />} />
          <Flex vertical>
            <h2 className="select-none">Vedant</h2>
            <h2 className="text-gray-500 font-normal select-none">@Vedant</h2>
          </Flex>
        </div>
        <div className="more z-10">
          <Dropdown menu={{ items }} placement="bottomRight" className="">
            <Button
              className="hover:bg-white/20 transition-all duration-300 rounded-full z-10"
              icon={<MoreOutlined className="!text-2xl text-white " />}
              type="text"
            />
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export function SideBar2() {
  const pathName = usePathname();
  return (
    <div className="hidden xl:flex flex-1 w-[80%] relative h-screen  flex-col">
      <div
        id={"searchBar"}
        className={`w-full p-3 ${pathName === "/explore" && "hidden"} `}
      >
        <Input
          placeholder="Search"
          className="placeholder:text-gray-200 rounded-full py-3 !px-4 bg-gray-300/30 hover:bg-gray-300/20 focus:bg-gray-300/20 outline-none text-white border-[1px] border-gray-300/30 "
          size="large"
        />
      </div>
      <div className="flex flex-col h-[100%] overflow-y-scroll">
        <div
          id={"what's-happing-container"}
          className={`w-full p-3 ${pathName === "/explore" && "hidden"}`}
        >
          <div className="rounded-xl border-none bg-gray-400/40 ">
            <h2 className={"text-white  font-bold text-lg p-5"}>
              What&apos;s happening
            </h2>
            {Array(4)
              .fill("")
              .map((_, index) => {
                return <CardItem key={index} />;
              })}
            <Button
              type="link"
              onClick={() => {
                console.log("go to explore");
              }}
            >
              Show more
            </Button>
          </div>
        </div>

        <div id={"recommondated-follow"} className="w-full p-3">
          <div className="rounded-xl border-none bg-gray-400/40 ">
            <h2 className={"text-white  font-bold text-lg p-5"}>
              Who to follow
            </h2>
            {Array(4)
              .fill("")
              .map((_, index) => {
                return <FollowItem key={index} />;
              })}
            <Button
              type="link"
              onClick={() => {
                console.log("go to explore");
              }}
            >
              Show more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
