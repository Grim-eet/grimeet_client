import Link from 'next/link';

export const Navbar = () => {
  return (
    <>
      <header className="flex justify-between p-8 text-white">
        <Link href={'/'} className="test-2xl font-bold hover:text-gray-500">
          GRIMEET
        </Link>

        <main className="md:w-1/3 flex gap-4 justify-between ">
          <Link href={'/sketch'} className="hover:opacity-50">
            스케치북
          </Link>
          <Link href={'/feed'} className="hover:opacity-50">
            피드
          </Link>
          <Link href={'/mypage'} className="hover:opacity-50">
            마이페이지
          </Link>
        </main>

        <div className="flex gap-4">
          <Link href={'/login'} className="hover:text-gray-500">
            로그인
          </Link>
          <Link href={'/signup'} className="hover:text-gray-500">
            회원가입
          </Link>
        </div>
      </header>
    </>
  );
};
