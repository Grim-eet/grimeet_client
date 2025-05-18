'use server';

import {SignupInput} from '@/types/auth';

//회원가입 서버액션
export default async function signupAction(formData: SignupInput) {
  const {confirmPassword, ...dataToSend} = formData;

  console.log('confirmPassword:', confirmPassword);

  console.log(
    'Data being sent to API (excluding confirmPassword):',
    dataToSend
  );

  const apiUrl = `${process.env.NEXT_SERVER_URL}/auth/register`;

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    const responseBody = await res.text();

    console.log(`API Response Status: ${res.status}`);
    console.log(`API Response Body: <<<${responseBody}>>>`);

    if (!res.ok) {
      let errorMessage = `API Error (${res.status})`;
      try {
        const errorJson = JSON.parse(responseBody);
        errorMessage += `: ${
          errorJson.message || JSON.stringify(errorJson) || responseBody
        }`;
      } catch (e) {
        console.error('Failed to parse error response:', e);
        errorMessage += `: ${responseBody}`;
      }
      console.error('Detailed Error:', errorMessage);
      throw new Error(errorMessage);
    }

    if (res.status === 201) {
      try {
        console.log(responseBody);
        const data = responseBody;
        return data;
      } catch (e) {
        console.error('Failed to parse success response (201):', e);
      }
    } else {
      console.log(
        `API Success (Status: ${res.status}) Response Body: ${responseBody}`
      );
    }
  } catch (error) {
    console.error('Signup action failed:', error);
    throw error;
  }
}
