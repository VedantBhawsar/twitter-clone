import { Button } from "antd";
import React from "react";
import { BiCloudDownload, BiUndo } from "react-icons/bi";

export const ConnectionLoss = () => {
  return (
    <div className="flex flex-col p-10 items-center gap-3">
      <BiCloudDownload size={80} className={"text-gray-400"} />
      <p className={"text-gray-400"}>
        Looks like you lost your connection. Please check it and try again.
      </p>
      <Button
        type="primary"
        className="flex items-center gap-2 text-md itemscen bg-blue-500 py-5 rounded-full font-bold"
      >
        <BiUndo size={20} />
        Refresh
      </Button>
    </div>
  );
};
