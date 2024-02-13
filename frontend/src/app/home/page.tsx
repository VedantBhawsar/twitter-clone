"use client";
import React, { useEffect } from "react";
import { Button, Tabs, TabsProps } from "antd";
import { Navbar } from "@components/HomeComponents/Navbar";
import { Post } from "@components/HomeComponents/Posts";
import { CreatePost } from "@components/HomeComponents/CreatePost";
import { useAuth } from "@hooks/useAuth";

const HomePage = () => {
  const [activeTab, setActiveTab] = React.useState(1);
  const { currentUser, validateToken, getCurrentUser } = useAuth();
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


   useEffect(() => {
    async function getUser() {
      if (!currentUser) {
        await validateToken();
        await getCurrentUser();
      }
    }
    getUser();
  }, []);

  return (
    <main className="md:ml-72 flex-col flex-[2] flex w-full md:w-16  min-h-screen border-r-[1px] max-h-screen border-gray-600">
      <Navbar />
      <div className="flex flex-col overflow-y-scroll max-h-[90%]">
        <CreatePost />
        <Post user={currentUser} />
        <Post currentUser={currentUser} />
        <Post currentUser={currentUser} />
        <Post currentUser={currentUser} />
        <Post currentUser={currentUser} />
        <Post currentUser={currentUser} />
        <Post currentUser={currentUser} />
      </div>
    </main>
  );
};

export default HomePage;
