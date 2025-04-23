'use server';

import {LoginInput} from '@/types/auth';

export default async function loginAction(formData: LoginInput) {
  const {autoLogin, ...dataToSend} = formData;

  console.log(dataToSend);
  try {
    const res = await fetch(`${process.env.NEXT_SERVER_URL}api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    console.log(res.status);

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('로그인 실패했습니다.', error);
  }
}
