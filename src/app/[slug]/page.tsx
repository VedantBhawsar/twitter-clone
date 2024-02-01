"use client";
import React from "react";
import { notFound, useRouter } from "next/navigation";
import { Button } from "antd";
import Link from "next/link";
import { TbError404 } from "react-icons/tb";

const Page404 = () => {
  const router = useRouter();

  return (
    <div className="absolute transform top-0 left-0 flex flex-col items-center text-4xl font-boldz z-10 bg-black h-full w-full justify-center gap-3">
      <TbError404 size={50} />
      <h2 className="text-2xl font-sans">Page Not found</h2>
      <Button
        className="rounded-full bg-blue-400 font-bold "
        type="primary"
        onClick={() => {
          router.back();
        }}
      >
        Go Back
      </Button>
    </div>
  );
};

export default Page404;
