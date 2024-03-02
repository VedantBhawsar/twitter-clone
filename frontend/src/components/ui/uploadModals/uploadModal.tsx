import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Button, Modal } from "antd";
import { BsBrush } from "react-icons/bs";
import { BiBrush } from "react-icons/bi";

export const UploadModal = ({
  images,
  addImage,
}: {
  images:string[];
  addImage: any;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    setConfirmLoading(true);

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("upload_preset", "iug38uvw");

    fetch("https://api.cloudinary.com/v1_1/dydrdxj16/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        addImage(data.secure_url);
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
    setConfirmLoading(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  return (
    <>
      <Button type="link" onClick={showModal}
     disabled={images.length >= 3}
     className="text-white hover:text-white"
      >
        Upload Image
      </Button>
      <Modal
        title="Upload Image"
        open={open}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        className="w-[500px]"
      >
        <input
          id="file"
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor="file"
          className="flex min-h-32 items-center justify-center border bg-gray-100 rounded-md"
        >
          <div className="text-black text-lg flex items-center flex-col font-semibold">
            <BiBrush size={25} />
            Upload Image
          </div>
        </label>
      </Modal>
    </>
  );
};
