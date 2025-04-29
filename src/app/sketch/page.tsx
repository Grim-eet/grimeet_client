"use client";

import { SketchbookSidebar } from "../components/sketchbook/sidebar";
// import { Palette } from "../components/sketchbook/pallete";
import dynamic from "next/dynamic";
const Pallete = dynamic(
  () => import("../components/sketchbook/pallete").then((mod) => mod.Palette),
  {
    ssr: false,
  }
);

export default function SketchPage() {
  return (
    <>
      <div className="flex w-full h-screen">
        <SketchbookSidebar />
        <div className="flex-1 flex flex-col">
          <Pallete />
        </div>
      </div>
    </>
  );
}
