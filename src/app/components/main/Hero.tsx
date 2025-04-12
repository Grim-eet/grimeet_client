import Image from 'next/image';

export const Hero = () => {
  return (
    <div className="w-full h-full ">
      <div className="relative h-[500px] w-full rounded-xl">
        <Image
          src={'/grie.jpg'}
          alt="메인 이미지"
          fill
          className="object-cover rounded-md"
          quality={100}
          priority
        />
        <header className="relative z-10 p-4 flex flex-col justify-center items-center font-bold text-2xl">
          <h1>그림으로 연결되는 우리</h1>
          <h2>그리밋 당장 시작하세요!</h2>
        </header>
      </div>
    </div>
  );
};
