'use server';

export default async function emailCodeActions(email: string) {
  const payload = {email: email};
  try {
    const res = await fetch(`${process.env.NEXT_SERVER_URL}/auth/email-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log(email);
    if (!res.ok) throw new Error('이메일 인증 번호 오류 발생');

    console.log(res.status);

    return {message: '이메일 인증 번호를 발생했습니다.'};
  } catch (error) {
    console.error(error, '인증번호 발생 중 오류가 발생했습니다');
  }
}
