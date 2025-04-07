"use client";

import { Input } from "../components/common/Input";
import loginimg from "../../../public/images/loginimg.png";
import Image from "next/image";

export default function Login() {
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
        <h2 className="font-bold text-xl mb-6">로그인</h2>

        {/* 이메일 입력 */}
        <div className="mb-4 w-full max-w-xs">
          <Input inputName={"email"} />
        </div>

        {/* 비밀번호 입력 */}
        <div className="mb-4 w-full max-w-xs">
          <Input inputName={"password"} />
        </div>

        {/* 자동 로그인 체크박스 */}
        <div className="mb-6 flex items-center w-full max-w-xs">
          <input
            type="checkbox"
            id="auto-login"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="auto-login" className="ml-2 text-sm">
            자동 로그인
          </label>
        </div>

        {/* 로그인 버튼 */}
        <button className="w-full max-w-xs mb-6 px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500">
          로그인
        </button>

        <div className="w-full max-w-xs border-t border-gray-300 my-4"></div>

        {/* 계정 찾기 링크 */}
        <div className="flex justify-center space-x-4 mb-6 w-full max-w-xs">
          <a href="#" className="text-sm text-gray-600">
            이메일 찾기
          </a>
          <a href="#" className="text-sm text-gray-600">
            비밀번호 찾기
          </a>
        </div>

        <div className="w-full max-w-xs border-t border-gray-300 my-4"></div>

        {/* 소셜 로그인 */}
        <div className="flex flex-col space-y-3 w-full max-w-xs mb-6">
          <button className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500">
            Continue with Google
          </button>
          <button className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500">
            Continue with kakao
          </button>
          <button className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500">
            Continue with naver
          </button>
        </div>

        {/* 회원가입 링크 */}
        <div className="text-center w-full max-w-xs">
          <span className="text-sm text-gray-600">계정이 없으신가요? </span>
          <a href="#" className="text-sm font-semibold underline">
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
}
