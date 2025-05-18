'use client';

import {Input} from '../../components/common/Input';
import loginimg from '../../../../public/images/loginimg.png';
import Image from 'next/image';
import pwdFindAction from '@/api/auth/pwdFindAction';
import {useState} from 'react';

export default function PwInquiry() {
  const [email, setEmail] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'nickname') {
      setNickname(value);
    }
    if (error) setError(null);
    if (message) setMessage(null);
  };

  const handlePwdFind = async () => {
    setError(null);
    setMessage(null);
    setIsLoading(true);

    if (!email || !nickname) {
      setError('이메일과 닉네임을 모두 입력해주세요.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await pwdFindAction();
      console.log(res);
      if (res && res.success) {
        setMessage('임시 비밀번호가 이메일로 발송되었습니다.');
      } else {
        setError(
          res?.message ||
            '비밀번호 찾기에 실패했습니다. 입력 정보를 확인해주세요.'
        );
      }
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
      );
    } finally {
      setIsLoading(false);
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
          <Input
            name={'email'}
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={handleChange}
          />
        </div>

        {/* 닉네임 입력 */}
        <div className="mb-4 w-full max-w-xs">
          <Input
            name={'nickname'}
            type="text"
            placeholder="닉네임을 입력하세요"
            value={nickname}
            onChange={handleChange}
          />
        </div>

        {/* 서버 메시지 표시 */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {message && <p className="text-green-500 text-sm mb-2">{message}</p>}

        {/* 로그인 버튼 */}
        <button
          className="w-full max-w-xs mt-5 mb-6 px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
          onClick={handlePwdFind}
          disabled={isLoading}
        >
          {isLoading ? '처리 중...' : '비밀번호 찾기'}
        </button>

        <div className="w-full max-w-xs border-t border-gray-300 my-4"></div>

        {/* 회원가입 링크 */}
        <div className="text-center w-full max-w-xs">
          <span className="text-sm text-gray-600">계정이 없으신가요? </span>
          <a href="/signup" className="text-sm font-semibold underline">
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
}
