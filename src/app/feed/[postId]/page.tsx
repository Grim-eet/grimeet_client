import {FeedContain} from '@/app/components/feed/FeedContain';

export default async function FeedPostPage({
  params,
}: {
  params: Promise<{postId: string}>;
}) {
  const resolveParams = await params;
  const postId = resolveParams.postId;
  console.log(postId);

  return (
    <div className="">
      <FeedContain />
    </div>
  );
}
