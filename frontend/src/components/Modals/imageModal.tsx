"use client";
import { Button, Space, Modal } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { BsExclamationCircleFill } from "react-icons/bs";

export const ImageModal = ({
  isModalOpen,
  setIsModalOpen,
  imageUrl
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  imageUrl:string
}) => {

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title=""
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        centered={true}
className="min-w-[70%] min-h-[70%]"
      >
        <Image
          src={
            "https://pbs.twimg.com/media/GEWlwP4XEAEmhW8?format=png&name=small"
          }
          width={50}
          height={50}
          className={'w-full h-full'}
          alt="post image"
        />
      </Modal>
    </>
  );
};
