'use client'; // 클라이언트 컴포넌트로 지정

import React from 'react';

interface ModalContentWrapperProps {
  children: React.ReactNode;
}

export function ModalContentWrapper({children}: ModalContentWrapperProps) {
  // 모달 배경 클릭 시 닫히는 것을 방지하기 위한 이벤트 전파 중단
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="bg-white rounded-lg p-4 max-w-xl w-full"
      onClick={handleClick} // 클라이언트 컴포넌트 내에서 이벤트 핸들러 사용
    >
      {children}
    </div>
  );
}
