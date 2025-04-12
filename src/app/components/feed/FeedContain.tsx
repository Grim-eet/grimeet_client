import {FeedRoot} from './FeedRoot';

export const FeedContain = () => {
  const feedMap = Array.from({length: 8}, (_, i) => ({id: `${i + 1}`}));

  return (
    <div>
      {feedMap.map((item) => (
        <FeedRoot key={item.id} feedId={item.id} />
      ))}
      <div className="sticky w-full bottom-6 flex justify-end pr-4">
        <button
          type="button"
          className="rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
        >
          글쓰기 아이콘
        </button>
      </div>
    </div>
  );
};
