"use client";

import { SketchbookSidebar } from "../components/sketchbook/sidebar";
import { Palette } from "../components/sketchbook/pallete";

export default function SketchPage() {
  return (
    <>
      <div className="flex w-full h-screen">
        <SketchbookSidebar />
        <div className="flex-1 flex flex-col">
          <Palette />
        </div>
      </div>
    </>
  );
}
