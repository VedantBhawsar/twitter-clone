import React from "react";
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

export const CreatePost = () => {
  const url =
    "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";

  return (
    <div className="flex flex-col items-start gap-5 p-5 border-b-[1px] border-gray-600">
      <div className="top section w-full flex gap-2 items-start">
        <Avatar
          src={url}
          size={50}
          className="hover:bg-gray-500/30 p-2 transition-all duration-300 cursor-pointer active:bg-gray-500/50"
        />
        <div className={"w-full"}>
          <Input.TextArea
            placeholder="What is happening?!"
            variant="borderless"
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
      <div className="content w-full flex justify-between items-center">
        <div className="flex w-full justify-start ">
          <div>
            <Button
              icon={<FileImageOutlined />}
              type="link"
              size="large"
              className="text-white/50 "
            />
          </div>
          <div>
            <Button
              icon={<GifOutlined />}
              type="link"
              className="text-white/50 items-center"
              size="large"
            />
          </div>
          <div>
            <Button
              icon={<UnorderedListOutlined />}
              type="link"
              className="text-white/50"
              size="large"
            />
          </div>
          <div>
            <Button
              icon={<SmileOutlined />}
              type="link"
              className="text-white/50"
              size="large"
            />
          </div>
        </div>
        <div className="flex">
          <Button
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
