// interface FeedItemPageProps {
//   params: { id: string };
// }

export default async function FeedItemPage() {
  // 예시: params.id를 사용하여 특정 피드 데이터 가져오기
  // const feedData = await fetchFeedData(params.id);

  return (
    <div>
      <main className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">피드 상세</h1>
        {/* 실제 피드 상세 내용을 보여줄 컴포넌트 */}

        {/* <p>전체 페이지 컨텐츠 (ID: {params.id})</p> */}
      </main>
    </div>
  );
}
