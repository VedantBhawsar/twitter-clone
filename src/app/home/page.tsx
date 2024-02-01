"use client";
import React from "react";
import { Button, Tabs, TabsProps } from "antd";
import { Navbar } from "@components/HomeComponents/Navbar";
import { Post } from "@components/HomeComponents/Posts";
import { CreatePost } from "@components/HomeComponents/CreatePost";

const HomePage = () => {
  const [activeTab, setActiveTab] = React.useState(1);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "For you",
    },
    {
      key: "2",
      label: "Following",
    },
  ];

  return (
    <main className="md:ml-72 flex-col flex-[2] flex w-full md:w-16  min-h-screen border-r-[1px] max-h-screen border-gray-600">
      <Navbar />
      <div className="flex flex-col overflow-y-scroll max-h-[90%]">
        <CreatePost />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </main>
  );
};

export default HomePage;
