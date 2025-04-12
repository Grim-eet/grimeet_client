'use client';

import {FeedDetail} from '@/app/components/feed/FeedDetail';
import {useRouter} from 'next/navigation';

export default async function FeedModal({params}: {params: {postId: string}}) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const handleOpenComments = () => {
    console.log('댓글열기');
  };
  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg p-4 max-w-xl w-full"
        onClick={(e) => e.stopPropagation}
      >
        <FeedDetail
          feedId={params.postId}
          onOpenComments={handleOpenComments}
        />
      </div>
    </div>
  );
}
