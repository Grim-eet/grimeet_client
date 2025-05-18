'use server';

export interface VerifyPayload {
  email: string;
  code: string;
}

export interface VerifyResponse {
  success: boolean;
  message: string;
}

export default async function emailVerifyAction(
  payload: VerifyPayload
): Promise<VerifyResponse> {
  console.log(payload);
  try {
    const res = await fetch(
      `${process.env.NEXT_SERVER_URL}/auth/email-code/verify`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error('이메일 인증 과정중 오류가 발생했습니다.');
    }

    return data;
  } catch (error) {
    console.error('Email Verification Error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '인증 중 오류 발생',
    };
  }
}
