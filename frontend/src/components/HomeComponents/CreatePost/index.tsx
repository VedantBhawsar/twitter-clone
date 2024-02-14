"use client";
import React, { useState } from "react";
import { Avatar, Button, Input } from "antd";
import {
  FileImageOutlined,
  GifOutlined,
  UnorderedListOutlined,
  CopyOutlined,
  BarChartOutlined,
  SmileOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { usePost } from "@hooks/usePost";
import { UploadModal } from "@components/ui/uploadModals/uploadModal";
import { BiCloset } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { create } from "zustand";

const imageStore = create((set) => ({
  images: [],
  addImage: (image: string) =>
    set((state: any) => ({
      images: [...state.images, image],
    })),
  removeAllImage: () =>
    set((state: any) => ({
      images: [],
    })),
  removeImage: (image: string) =>
    set((state: { images: string[] }) => ({
      images: state.images.filter((i) => i !== image),
    })),
}));

export const CreatePost = ({ currentUser }: any) => {
  const { createPost } = usePost();
  const [message, setMessage] = useState("");
  const images = imageStore((state: any) => state.images);
  const addImage = imageStore((state: any) => state.addImage);
  const removeImage = imageStore((state: any) => state.removeImage);
  const removeAllImage = imageStore((state: any) => state.removeAllImage);
  const url =
    "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";

  function clearFields() {
    setMessage("");
    removeAllImage();
  }

  return (
    <div className="flex flex-col items-start gap-5 p-5 border-b-[1px] border-gray-600">
      <div className="top section w-full flex gap-2 items-start">
        <Link href={`/profile/${currentUser?._id}`}>
          <Image
            src={currentUser?.images?.profileImage ?? url}
            width={60}
            height={60}
            className="hover:bg-gray-500/30 rounded-full p-2 transition-all duration-300 cursor-pointer active:bg-gray-500/50"
            alt="user pic"
          />
        </Link>
        <div className={"w-full"}>
          <Input.TextArea
            placeholder="What is happening?!"
            variant="borderless"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={
              "w-full min-h-28 max-h-28 h-28 resize-none placeholder:text-slate-400  text-md text-white"
            }
            size={"large"}
            style={{
              resize: "none",
            }}
          />
        </div>
      </div>
      <div className="flex gap-3">
        {images.length > 0 &&
          images?.map((img: string, index: number) => (
            <div key={index} className="relative">
              <div
                key={img}
                className="relative flex w-20 h-20 bg-white/20 border border-white/10 rounded-lg overflow-hidden"
              >
                <Image
                  src={img}
                  fill
                  alt="uplaod img"
                  className="rounded-lg object-cover hover:scale-125 transition-all duration-300"
                  loading="lazy"
                  quality={10}
                />
              </div>
              <button
                className="absolute -top-3 -right-4 p-2 rounded-full bg-black"
                onClick={() => removeImage(img)}
              >
                <CgClose />
              </button>
            </div>
          ))}
      </div>
      <div className="content w-full flex justify-between items-center">
        <div className="flex w-full justify-start ">
          <UploadModal addImage={addImage} images={images} />
        </div>
        <div className="flex">
          <Button
            onClick={async () =>
              await createPost(
                {
                  author_id: currentUser?._id,
                  message: message,
                  images: images,
                },
                clearFields
              )
            }
            type="primary"
            className={"rounded-full bg-blue-500 font-bold"}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};
