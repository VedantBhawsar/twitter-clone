"use client";
import { Modal } from "antd";
import Image from "next/image";
import React from "react";
import { FaRotateLeft } from "react-icons/fa6";

export const ImageModal = ({
  isModalOpen,
  setIsModalOpen,
  imageUrl,
  setImageUrl,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  imageUrl: string;
  setImageUrl: any;
}) => {
  const handleCancel = () => {
    setImageUrl("");
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title=""
        open={isModalOpen}
        onCancel={handleCancel}
        centered={true}
        className="min-w-[35%]"
      >
        <Image
          src={imageUrl}
          width={1080}
          height={1920}
          className={`w-full h-full rounded-md`}
          alt="post image"
          loading="eager"
        />
      </Modal>
    </>
  );
};
