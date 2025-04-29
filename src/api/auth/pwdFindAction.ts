'use server';

export default async function () {
  try {
    const res = fetch(`${process.env.NEXT_SERVER_URL}/auth/email-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log((await res).status);

    if (!(await res).ok) {
      return {message: '이메일 인증에 실패했습니다.'};
    }

    const data = (await res).json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
