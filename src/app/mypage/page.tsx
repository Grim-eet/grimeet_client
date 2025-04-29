"use client";

import { HomeBtn } from "../components/common/HomeBtn";
import { SideMenu } from "../components/common/SideMenu";

export default function MyPage() {
  return (
    <>
      <div className="flex w-full">
        <div className="flex flex-col">
          <div className="flex items-center justify-center mt-5 mb-5">
            <HomeBtn />
          </div>
          <SideMenu />
        </div>
        <div className="flex items-center justify-center w-full h-screen">
          <div className="flex items-center justify-center flex-col gap-4">
            <h1 className="text-white text-3xl font-bold">마이페이지</h1>
            <h2 className="text-gray-600 text-xl font-bold">
              여러분의 계정을 여기서 관리하세요
            </h2>
            <div className="w-96 h-28 bg-gray-800 border-1 border-gray-700 rounded-xl"></div>
            <div className="w-96 h-28 bg-gray-800 border-1 border-gray-700 rounded-xl"></div>
          </div>
        </div>
      </div>
    </>
  );
}
