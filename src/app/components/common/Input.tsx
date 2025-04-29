'use client';

import {cn} from '@/utils/cn';
import React from 'react';

// input 요소가 받을 수 있는 모든 표준 속성을 포함하도록 Props 타입 정의
// 기존 inputName 대신 표준 name 속성을 사용하고, 필요한 다른 속성 추가
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // inputName 대신 표준 'name' prop 사용 권장
  name: string;
  // 필요하다면 label을 위한 prop 추가 가능
  label?: string;
}

// 구조 분해 할당으로 props를 받고, input 요소에 전달
export const Input: React.FC<InputProps> = ({
  name,
  label, // 라벨 prop 사용 (선택적)
  type = 'text', // 기본 type을 text로 설정
  className,
  ...props // value, onChange, placeholder, maxLength 등 나머지 모든 InputHTMLAttributes 포함
}) => {
  const placeholderText =
    name === 'email'
      ? '이메일을 입력하세요'
      : name === 'password'
      ? '비밀번호를 입력하세요'
      : name === 'phone'
      ? '전화번호를 입력하세요'
      : name === 'nickname'
      ? '닉네임을 입력하세요'
      : name === 'name'
      ? '이름을 입력하세요'
      : '';

  return (
    <div className="relative w-full">
      {/* label prop이 있으면 표시 */}
      {label && (
        // 스타일은 필요에 맞게 조정
        <label
          htmlFor={name}
          className="absolute -top-5 left-0 text-sm text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={name} // label과 연결하기 위한 id
        name={name} // input 요소의 name 속성
        type={type}
        placeholder={placeholderText}
        className={cn(
          'w-full h-9 border text-black border-gray-300 rounded-md pl-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500',
          className
        )}
        {...props} // value, onChange, placeholder, maxLength 등 나머지 props 전달
      />
    </div>
  );
};
