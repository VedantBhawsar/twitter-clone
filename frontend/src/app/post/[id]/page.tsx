"use client";
import { useUseStore } from "@/stores/useStore";
import { CreatePost } from "@components/HomeComponents/CreatePost";
import { Navbar } from "@components/HomeComponents/Navbar";
import { Post } from "@components/HomeComponents/Posts";
import { usePost } from "@hooks/usePost";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PostPage = () => {
  const { id } = useParams();
  const { fetchPost } = usePost();
  const [comments, setComments] = useState<
    {
      author_id: string;
      created_at: Date;
      message: string;
      tweet_id: string;
      __v?: number;
      _id: string;
    }[]
  >([
    {
      author_id: "",
      created_at: new Date(),
      message: "",
      tweet_id: "",
      __v: 0,
      _id: "",
    },
  ]);

  const [message, setMessage] = useState<any>("");
  const [post, setPost] = useState<any>({});
  const currentUser = useUseStore((state) => state.user);

  async function createComment() {
    try {
      const { data } = await axios.post(`/api/comment/create`, {
        author_id: currentUser,
        message: message,
        tweet_id: id,
      });
      comments.push(data);
      setMessage("");
    } catch (error: any) {
      console.log(error.message);
    }
  }

  const a = [3, 4, , 5, 2, 2, 2, 3, 4, 54];
  console.error(comments.reverse());

  useEffect(() => {
    async function getPost() {
      const data = await fetchPost(id as string);
      setPost(data);
    }
    async function getComments() {
      const { data } = await axios.get(`/api/comment/${id}`);
      setComments(data);
      console.error(data);
    }

    getPost();
    getComments();
  }, []);


  return (
    <main className="md:ml-72 flex-col flex-[2] flex w-full md:w-16  min-h-screen border-r-[1px] max-h-screen border-gray-600">
      <Navbar />
      <div className="flex flex-col overflow-y-scroll max-h-[90%]">
        {post._id && <Post post={post} />}
        <div className="flex w-full px-8 py-5 justify-between items-start border-b-[1px] border-gray-600 gap-5">
          <textarea
            className="w-full min-h-20 max-h-20 placeholder:text-black text-black p-4 outline-none rounded-lg"
            placeholder="Enter comment"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          />
          <button
            onClick={createComment}
            className="bg-blue-500 text-white px-3 py-1 rounded-md active:bg-blue-600 transition-all duration-300"
          >
            send
          </button>
        </div>
        {comments
          .map((comment: any, index: number) => {
            const date = new Date(comment.created_at);
            return (
              <div key={index} className="border-b-[1px] border-gray-600 p-5 flex justify-between">
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/profile/${comment.author_id}`}
                    className="underline underline-offset-2 text-gray-200 hover:text-blue-600 transition-all duration-200"
                  >
                    {comment.author_id}
                  </Link>
                  <p>{comment.message}</p>
                </div>
                <div>
                  <p>{date.toDateString()}</p>
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
};

export default PostPage;
