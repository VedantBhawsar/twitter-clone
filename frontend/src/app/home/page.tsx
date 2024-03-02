"use client";
import React, { use, useEffect, useState } from "react";
import { Button, Tabs, TabsProps } from "antd";
import { Navbar } from "@components/HomeComponents/Navbar";
import { Post } from "@components/HomeComponents/Posts";
import { CreatePost } from "@components/HomeComponents/CreatePost";
import { useAuth } from "@hooks/useAuth";
import { usePost } from "@hooks/usePost";
import { usePostStore } from "@/stores/postStore";
import { TailSpin } from "react-loader-spinner";
import { useUseStore } from "@/stores/useStore";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [loading, setLoading] = useState(false);
  const { validateToken, parseCookies } = useAuth();
  const { fetchPosts } = usePost();
  const posts = usePostStore((state: any) => state?.posts);
  const addPost = usePostStore((state: any) => state?.addPost);
  const setPosts = usePostStore((state: any) => state.setPosts);
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
  const currentUser = useUseStore((state: any) => state.user);
  useEffect(() => {
    async function fetchposts() {
      if (currentUser._id) {
        await fetchPosts();
        setLoading(false);
        return;
      } else {
        const cookie = parseCookies();
        if (cookie?.token) {
          await validateToken();
          return;
        }
        router.push("/login");
        return;
      }
    }
    fetchposts();
  }, [currentUser?._id]);

  return (
    <main className="md:ml-72 flex-col flex-[2] flex w-full md:w-16  min-h-screen border-r-[1px] max-h-screen border-gray-600">
      <Navbar />
      <div className="flex flex-col overflow-y-scroll max-h-[90%]">
        <CreatePost currentUser={currentUser} />
        {loading ? (
          <div className="w-full p-10 flex justify-center items-center">
            <TailSpin
              visible={true}
              height="40"
              width="40"
              color="#fff"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          posts
            ?.reverse()
            .map((post: any) => (
              <Post currentUser={currentUser} post={post} key={post?._id} />
            ))
        )}
      </div>
    </main>
  );
};

export default HomePage;
