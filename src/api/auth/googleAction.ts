'use server';

export default async function googleAction() {
  try {
    const res = await fetch(
      `${process.env.NEXT_SERVER_URL}/social-account/connect/google`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(res.status);

    if (!res.ok) {
      const errorData = await res
        .json()
        .catch(() => ({message: '구글 로그인 실패'}));
      console.error(errorData.message);
    }
    const data = await res.json();
    const googleAuthURl = data.url;
    return googleAuthURl;
  } catch (error) {
    console.error('구글 로그인 중 오류가 발생했습니다.');
  }
}
