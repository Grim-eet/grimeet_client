"use client";

import { HomeBtn } from "../components/common/HomeBtn";
import { SideMenu } from "../components/common/SideMenu";
import { SketchbookCard } from "../components/sketchbook/card";

export default function SketchbookPage() {
  return (
    <>
      <div className="flex w-full">
        <div className="flex flex-col">
          <div className="flex items-center justify-center mt-5 mb-5">
            <HomeBtn />
          </div>
          <SideMenu />
        </div>
        <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-9/12 h-full p-20 gap-8">
          <SketchbookCard />
          <SketchbookCard />
          <SketchbookCard />
          <SketchbookCard />
          <SketchbookCard />
          <SketchbookCard />
          <SketchbookCard />
        </div>
      </div>
    </>
  );
}
