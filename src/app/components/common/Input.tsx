"use client";

import React from "react";

export const Input = ({ inputName }) => {
  const placeholderText =
    inputName === "email"
      ? "이메일을 입력하세요"
      : inputName === "password"
      ? "비밀번호를 입력하세요"
      : inputName === "phone"
      ? "전화번호를 입력하세요"
      : inputName === "nickname"
      ? "닉네임을 입력하세요"
      : inputName === "name"
      ? "이름을 입력하세요"
      : "";

  return (
    <div className="relative w-full">
      <label className="top-1 left-2 text-white text-sm">{inputName}</label>
      <input
        type={inputName === "password" ? "password" : "text"}
        placeholder={placeholderText}
        className="w-full h-9 border border-gray-300 rounded-md pl-2  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
