import Image from 'next/image';

export const MainFeature = () => {
  return (
    <>
      <header className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold ">특징</h1>
        <div className="relative w-full h-[500px] rounded-xl">
          <Image
            src={'/grie2.jpg'}
            alt="그라데이션2"
            fill
            className="object-cover"
          />
          <main className="relative z-10 p-4"></main>
        </div>
      </header>
    </>
  );
};
