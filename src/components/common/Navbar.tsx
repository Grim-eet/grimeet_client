import Link from "next/link";

export const Navbar = () => {
  return (
    <>
      <header className="flex justify-between p-8 text-white">
        <div className="test-2xl font-bold">GRIMEET</div>
        <div className="flex gap-4">
          <Link href={"/"} className="hover:text-gray-500">
            로그인
          </Link>
          <Link href={"/"} className="hover:text-gray-500">
            회원가입
          </Link>
        </div>
      </header>
    </>
  );
};
