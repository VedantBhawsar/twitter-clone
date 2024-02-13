"use client";
import { ProfileMain } from "@components/ProfileComponents/ProfileMain";
import { ProfileNavbar } from "@components/ProfileComponents/ProfileNavbar";
import { useAuth } from "@hooks/useAuth";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect } from "react";

const ProfilePage = () => {
  const { user, currentUser ,fetchUser, validateToken, getCurrentUser } = useAuth();
  const {
    id,
  }: {
    id: string;
  } = useParams();

  useEffect(() => {
    async function getUser() {
      await fetchUser(id);
      await getCurrentUser()
    }
    getUser();
  }, []);

  return (
    <main className="md:ml-72 flex-col flex-[2] flex w-full md:w-16  min-h-screen border-r-[1px] max-h-screen border-gray-600">
      <ProfileNavbar user={user} currentUser={currentUser} />
      <ProfileMain user={user} currentUser={currentUser} />
      <div className="flex flex-col overflow-y-scroll max-h-[90%] gap-0">
        {/* <Notification /> */}
        {/* <Notification /> */}
        {/* <Notification /> */}
        {/* <Notification /> */}
        {/* <Notification /> */}
      </div>
    </main>
  );
};

export default ProfilePage;
