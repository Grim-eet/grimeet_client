"use client";

import React from "react";
import { useRouter } from "next/navigation";

export const HomeBtn = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 font-extrabold text-white rounded-md hover:"
    >
      GRIMEET
    </button>
  );
};
