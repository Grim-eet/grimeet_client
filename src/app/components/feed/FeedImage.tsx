import Image from 'next/image';

export const FeedImage = () => {
  return (
    <div>
      <div className="relative aspect-[1/1.2] ">
        <Image
          src={'/images/duck.jpg'}
          alt="오리"
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-cover rounded-md"
        />
      </div>
    </div>
  );
};
