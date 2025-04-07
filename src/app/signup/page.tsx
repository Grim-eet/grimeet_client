"use client";

import { Input } from "../components/common/Input";
import loginimg from "../../../public/images/loginimg.png";
import Image from "next/image";

export default function Signup() {
  return (
    <div className="flex min-h-screen mx-5 md:mx-20 lg:mx-32 xl:mx-40 2xl:mx-60">
      {/* 왼쪽: 이미지 영역 */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center">
        <div className="w-3/4 max-w-md">
          <Image
            src={loginimg}
            alt="Login Image"
            className="w-full h-full rounded-3xl "
            priority
          />
        </div>
      </div>

      {/* 오른쪽: 로그인 폼 영역 */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        <h1 className="font-bold text-2xl mb-2">GRIMEET</h1>
        <h2 className="font-bold text-xl mb-6">회원가입</h2>

        {/* 이메일 입력 */}
        <div className="mb-4 w-full max-w-xs">
          <Input inputName={"email"} />
        </div>

        {/* 비밀번호 입력 */}
        <div className="mb-4 w-full max-w-xs">
          <Input inputName={"password"} />
        </div>

        {/* 이름 입력 */}
        <div className="mb-4 w-full max-w-xs">
          <Input inputName={"name"} />
        </div>

        {/* 닉네임 입력 */}
        <div className="mb-4 w-full max-w-xs">
          <Input inputName={"nickname"} />
        </div>

        {/* 로그인 버튼 */}
        <button className="w-full max-w-xs mb-6 mt-5 px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500">
          로그인
        </button>

        <div className="w-full max-w-xs border-t border-gray-300 my-4"></div>

        {/* 회원가입 링크 */}
        <div className="text-center w-full max-w-xs">
          <span className="text-sm text-gray-600">계정이 있으신가요? </span>
          <a href="#" className="text-sm font-semibold underline">
            로그인
          </a>
        </div>
      </div>
    </div>
  );
}
