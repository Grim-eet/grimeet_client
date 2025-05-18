'use server';

import {LoginInput, LoginSchema} from '@/types/auth';
import {cookies} from 'next/headers';

interface AuthApiResponse {
  refreshToken: string;
  isPasswordChangeRequired: boolean;
  isDormant: boolean;
}

async function authenticateUser(formData: LoginInput): Promise<{
  success: boolean;
  data?: AuthApiResponse;
  message?: string;
}> {
  const {autoLogin, ...dataToSend} = formData;

  console.log('autoLogin:', autoLogin);

  console.log('API 요청 데이터:', dataToSend);
  try {
    const res = await fetch(`${process.env.NEXT_SERVER_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    const responseBody = await res.json();

    if (!res.ok) {
      console.error('API 인증 실패:', responseBody);
      const errorMessage =
        responseBody?.message ||
        responseBody?.error ||
        '로그인에 실패했습니다.';
      return {success: false, message: errorMessage};
    }

    console.log('API 인증 성공 응답:', responseBody);
    if (!responseBody || typeof responseBody.refreshToken !== 'string') {
      console.error('API 응답 형식 오류: refreshToken 누락');
      return {success: false, message: '서버 응답 형식이 올바르지 않습니다.'};
    }

    return {success: true, data: responseBody as AuthApiResponse};
  } catch (error) {
    console.error('API 호출 중 예외 발생:', error);
    return {success: false, message: '서버 통신 중 오류가 발생했습니다.'};
  }
}

export default async function loginAction(formData: LoginInput) {
  const validationResult = LoginSchema.safeParse(formData);
  if (!validationResult.success) {
    console.error(
      'Server Action: 유효성 검사 실패:',
      validationResult.error.flatten()
    );
    return {
      error: '입력값을 확인해주세요.',
      details: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    const authRes = await authenticateUser(validationResult.data);

    if (authRes?.success && authRes.data?.refreshToken) {
      console.log('Server Action: 인증 성공, refreshToken 수신');
      const refreshToken = authRes.data.refreshToken;
      const cookieStore = await cookies();

      cookieStore.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 15 * 60,
      });
      console.log('Server Action: refreshToken 쿠키 설정 완료');

      return {
        success: true,
        data: {
          isPasswordChangeRequired: authRes.data.isPasswordChangeRequired,
          isDormant: authRes.data.isDormant,
        },
      };
    } else {
      console.error(
        'Server Action: 인증 실패 또는 응답 데이터 오류',
        authRes?.message
      );
      return {
        error: authRes?.message || '아이디 또는 비밀번호를 확인해주세요.',
      };
    }
  } catch (error) {
    console.error('Server Action: 예외 발생', error);
    return {error: '로그인 처리 중 서버 오류가 발생했습니다.'};
  }
}
