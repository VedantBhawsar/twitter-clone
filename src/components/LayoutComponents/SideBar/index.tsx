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
import { Avatar, MenuProps, Flex, Layout, Menu, Button, Input } from "antd";
import { CardItem, FollowItem } from "@components/ui/Items";
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation";

export function SideBar1() {
  const [isActive, setIsActive] = React.useState<string[]>(["1"]);
  const pathName = usePathname();
  const router = useRouter();
  const segment = useSelectedLayoutSegment();
  const menuRef = useRef(null);

  const items = [
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
      link: "/profile",
    },

    {
      icon: <MoreOutlined className="!text-xl" />,
      label: "More",
      title: "more",
      link: "/more",
    },
  ];

  const menuItems: MenuProps["items"] = items.map((item, index) => ({
    key: String(index + 1),
    icon: item.icon,
    label: item.label,
    className:
      "!py-2 !min-h-14 h-10 !max-h-14 !items-center select-none !justify-center !px-5 !rounded-lg hover:bg-blue-700  hover:text-white bg-black",
    title: item.title,
  }));

  React.useEffect(() => {
    const index = items.findIndex((item) => item.title === segment);
    if (index !== -1) {
      setIsActive([String(index + 1)]);
    }
  }, [segment]);

  return (
    <div className="hidden w-72 flex-1 fixed md:flex flex-col h-screen justify-between p-3 border-r-[1px] border-gray-600 ">
      <Menu
        ref={menuRef}
        theme="dark"
        mode="vertical"
        defaultValue={["1"]}
        onClick={({ key }) => {
          router.push(`/${items[parseInt(key) - 1].title}`);
        }}
        items={menuItems}
        rootClassName="flex flex-col gap-1 text-xl font-bold bg-black overflow-scroll "
      />
      <div className="flex p-2 gap-4 items-center justify-between hover:bg-white/10 active:bg-white/20 rounded-lg cursor-pointer transition-all duration-300 border-2 border-gray-500/40">
        <div className="flex gap-2 ">
          <Avatar size={50} icon={<UserOutlined />} />
          <Flex vertical>
            <h2 className="select-none">Vedant</h2>
            <h2 className="text-gray-500 font-normal select-none">@Vedant</h2>
          </Flex>
        </div>
        <Button
          className="hover:bg-white/20 transition-all duration-300 rounded-full z-10"
          icon={<MoreOutlined className="!text-2xl text-white " />}
          type="text"
        />
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
