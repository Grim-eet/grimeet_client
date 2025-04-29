'use client';

import {useRouter} from 'next/navigation';

export const ModalClose = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
    >
      <span className="material-symbols-outlined">close</span>
    </button>
  );
};
