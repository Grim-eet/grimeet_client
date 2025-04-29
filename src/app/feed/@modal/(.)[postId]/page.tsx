import {handleOpenComments} from '@/api/feed/feedAction';
import {FeedDetail} from '@/app/components/feed/FeedDetail';
import {ModalClose} from '@/app/components/feed/modal/ModalClose';
import {ModalContentWrapper} from '@/app/components/feed/modal/ModalContentWrapper';

export default async function FeedModal({
  params,
}: {
  params: Promise<{postId: string}>;
}) {
  const resolveParams = await params;
  const postId = resolveParams.postId;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <ModalClose />
      <ModalContentWrapper>
        <FeedDetail feedId={postId} onOpenComments={handleOpenComments} />
      </ModalContentWrapper>
    </div>
  );
}
