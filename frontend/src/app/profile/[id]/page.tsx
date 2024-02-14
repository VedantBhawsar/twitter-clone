"use client";
import { usePostStore } from "@/stores/postStore";
import { Post } from "@components/HomeComponents/Posts";
import { ProfileMain } from "@components/ProfileComponents/ProfileMain";
import { ProfileNavbar } from "@components/ProfileComponents/ProfileNavbar";
import { useAuth } from "@hooks/useAuth";
import { usePost } from "@hooks/usePost";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect } from "react";

const ProfilePage = () => {
  const { user, currentUser, fetchUser, validateToken, getCurrentUser } =
    useAuth();
  const { fetchPosts } = usePost();
  const posts = usePostStore((state: any) => state?.posts);
  const {
    id,
  }: {
    id: string;
  } = useParams();

  useEffect(() => {
    async function getUser() {
      await fetchUser(id);
      await getCurrentUser();
      await fetchPosts();
    }
    getUser();
  }, []);

  return (
    <main className="md:ml-72 flex-col flex-[2] flex w-full md:w-16  min-h-screen border-r-[1px] max-h-screen border-gray-600 overflow-y-scroll">
      <ProfileNavbar
        user={user}
        currentUser={currentUser}
        postcount={
          posts?.filter((post: any) => post.author_id === currentUser?._id)
            .length
        }
      />
      <ProfileMain user={user} currentUser={currentUser} />
      <div className="flex flex-col max-h-[25%] gap-0">
        {posts
          ?.filter((post: any) => post.author_id === currentUser?._id)
          .map((post: any) => (
            <Post key={post._id} post={post} />
          ))}
      </div>
    </main>
  );
};

export default ProfilePage;
