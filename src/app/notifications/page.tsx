import { NotificationNavbar } from "@components/NotificationComponents/Navbar";
import { Notification } from "@components/NotificationComponents/Notification";
import React from "react";

const NotificationPage = () => {
  return (
    <main className="md:ml-72 flex-col flex-[2] flex w-full md:w-16  min-h-screen border-r-[1px] max-h-screen border-gray-600">
      <NotificationNavbar />

      <div className="flex flex-col overflow-y-scroll max-h-[90%] gap-0">
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
      </div>
    </main>
  );
};

export default NotificationPage;
