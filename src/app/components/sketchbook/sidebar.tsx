import { useState } from "react";
import save from "../../../../public/images/save.png";
import exportIcon from "../../../../public/images/export.png";
import share from "../../../../public/images/share.png";
import undo from "../../../../public/images/undo.png";
import minimize from "../../../../public/images/minimize.png";
import expand from "../../../../public/images/expand.png";

import Image from "next/image";

export const SketchbookSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* 확장된 사이드바 */}
      <div
        className={`flex flex-col h-screen bg-[#120b1e] border-r border-gray-200 p-4 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-0 opacity-0 overflow-hidden" : "w-52 opacity-100"
        }`}
      >
        <div className="mb-6">
          <h1 className="text-xl font-semibold">Menu</h1>
        </div>

        <div className="flex flex-col space-y-2">
          <button
            className={`w-full text-left px-3 py-2 rounded hover:bg-gray-200 hover:text-black transition-colors ${
              isCollapsed ? "w-0 opacity-0 overflow-hidden" : "w-52 opacity-100"
            }`}
          >
            <Image src={save} alt="save" className="inline-block mr-2" />
            저장하기
          </button>
          <button
            className={`w-full text-left px-3 py-2 rounded hover:bg-gray-200 hover:text-black transition-colors ${
              isCollapsed ? "w-0 opacity-0 overflow-hidden" : "w-52 opacity-100"
            }`}
          >
            <Image
              src={exportIcon}
              alt="export"
              className="inline-block mr-2"
            />
            내보내기
          </button>
          <button
            className={`w-full text-left px-3 py-2 rounded hover:bg-gray-200 hover:text-black transition-colors ${
              isCollapsed ? "w-0 opacity-0 overflow-hidden" : "w-52 opacity-100"
            }`}
          >
            <Image src={share} alt="share" className="inline-block mr-2" />
            공유하기
          </button>
          <button
            className={`w-full text-left px-3 py-2 rounded hover:bg-gray-200 hover:text-black transition-colors ${
              isCollapsed ? "w-0 opacity-0 overflow-hidden" : "w-52 opacity-100"
            }`}
          >
            <Image src={undo} alt="undo" className="inline-block mr-2" />
            되돌리기
          </button>
          <button
            className={`w-full text-left px-3 py-2 rounded hover:bg-gray-200 hover:text-black transition-colors ${
              isCollapsed ? "w-0 opacity-0 overflow-hidden" : "w-52 opacity-100"
            }`}
            onClick={toggleSidebar}
          >
            <Image
              src={minimize}
              alt="minimize"
              className="inline-block mr-2"
            />
            축소하기
          </button>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-200">
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-200 transition-colors">
            Profile
          </button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-200 transition-colors text-gray-600">
            ← 나가기
          </button>
        </div>
      </div>

      {/* 축소된 상태에서 보여질 버튼 */}
      <div
        className={`fixed left-0 top-1/2 transform -translate-y-1/2 z-10 ${
          isCollapsed ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity duration-300 ease-in-out`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <button
          onClick={toggleSidebar}
          className={`bg-[#120b1e] text-white p-2 rounded-r-lg shadow-md transition-all ${
            isHovering ? "scale-110" : "scale-100"
          }`}
        >
          {/* 확장 아이콘 (>) */}
          {isHovering ? ">" : ">"}
        </button>
      </div>
    </>
  );
};
