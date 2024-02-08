import React from "react";
import { ExploreNavbar } from "@components/ExploreComponents/ExploreNavbar";
import { Tag } from "@components/ExploreComponents/Tag";

function ExplorePage() {
  return (
    <main className="md:ml-72 flex-col flex-[2] flex w-full md:w-16  min-h-screen border-r-[1px] max-h-screen border-gray-600">
      <ExploreNavbar />

      <div className="flex flex-col overflow-y-scroll max-h-[90%]">
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
      </div>
    </main>
  );
}

export default ExplorePage;
