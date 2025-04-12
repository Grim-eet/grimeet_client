'use client';

import {useState} from 'react';
import {FeedDetail} from './FeedDetail';
import {FeedImage} from './FeedImage';
import {FeedTitle} from './FeedTitle';
import Link from 'next/link';

export const FeedRoot = ({feedId}: {feedId: string}) => {
  const [isCommentDrawerOpen, setIsCommentDrawerOpen] = useState(false);

  const handleOpenCommentDrawer = () => {
    setIsCommentDrawerOpen(!isCommentDrawerOpen);
  };

  console.log(isCommentDrawerOpen);

  return (
    <>
      <div className="pb-16">
        <nav>
          <FeedTitle />
        </nav>
        <main className="max-w-[600px] mx-auto px-4 pt-4 space-y-4">
          <Link href={`/feed/${feedId}`} scroll={false}>
            <FeedImage />
          </Link>
          <FeedDetail onOpenComments={handleOpenCommentDrawer} />
        </main>
      </div>
    </>
  );
};
