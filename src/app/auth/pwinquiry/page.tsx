'use client';

import {Input} from '../../components/common/Input';
import loginimg from '../../../../public/images/loginimg.png';
import Image from 'next/image';
import pwdFindAction from '@/api/auth/pwdFindAction';
import {useState} from 'react';

export default function PwInquiry() {
  const [emailId, setEmailId] = useState();

  const handleChange = () => {};

  const handlePwdFind = async () => {
    try {
      const res = await pwdFindAction();
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

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
        <h2 className="font-bold text-xl mb-6">비밀번호 찾기</h2>

        {/* 이메일 입력 */}
        <div className="mb-4 w-full max-w-xs">
          <Input name={'email'} onChange={handleChange} />
        </div>

        {/* 닉네임 입력 */}
        <div className="mb-4 w-full max-w-xs">
          <Input name={'nickname'} onChange={handleChange} />
        </div>

        {/* 로그인 버튼 */}
        <button
          className="w-full max-w-xs mt-5 mb-6 px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={handlePwdFind}
        >
          비밀번호 찾기
        </button>

        <div className="w-full max-w-xs border-t border-gray-300 my-4"></div>

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
