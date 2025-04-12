export interface FeedDetailProps {
  onOpenComments: () => void;
  feedId?: string;
}

export const FeedDetail = ({onOpenComments, feedId}: FeedDetailProps) => {
  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex-1 min-w-0">
        <p className="line-clamp-1 truncate text-sm">
          대충 적어보는 남의 작품 소개
        </p>
      </div>
      <div className=" flex items-center gap-3 flex-shrink-0 ">
        <span>1925</span>
        <button onClick={onOpenComments}>comment</button>
        <button>좋아요</button>
      </div>
    </div>
  );
};
