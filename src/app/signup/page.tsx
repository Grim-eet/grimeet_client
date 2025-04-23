'use client';

import React, {useState} from 'react';
import Image from 'next/image';
import loginimg from '../../../public/images/loginimg.png';

import {FieldErrors, SignupInput, SignupSchema} from '@/types/auth';
import {SignupForm} from '../auth/signup/SignupForm';
import signupAction from '@/api/auth/signupAction';

export default function Signup() {
  const [formData, setFormData] = useState<SignupInput>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    nickname: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | undefined>(undefined);

  const formatPhoneNumber = (phoneNumber: string): string => {
    if (phoneNumber && phoneNumber.length === 11) {
      return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    return phoneNumber;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof SignupInput]) {
      setErrors((prev) => {
        const newErrors = {...prev};
        delete newErrors[name as keyof SignupInput];
        return newErrors;
      });
    }
    if (formError) {
      setFormError(undefined);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setFormError(undefined);
    setIsLoading(true);

    const validationResult = SignupSchema.safeParse(formData);

    if (!validationResult.success) {
      const flatErrors = validationResult.error.flatten();
      const formattedErrors: FieldErrors = {};
      for (const key in flatErrors.fieldErrors) {
        const typedKey = key as keyof SignupInput;
        if (flatErrors.fieldErrors.hasOwnProperty(typedKey)) {
          formattedErrors[typedKey] = flatErrors.fieldErrors[typedKey];
        }
      }
      if (flatErrors.formErrors.length > 0) {
        if (!formattedErrors.confirmPassword) {
          formattedErrors.confirmPassword = [];
        }
        formattedErrors.confirmPassword.push(...flatErrors.formErrors);
      }
      setErrors(formattedErrors);
      setIsLoading(false);
      return;
    }

    console.log('Validated data:', validationResult.data);

    const validatedData = validationResult.data;

    const formattedPhoneNumber = formatPhoneNumber(validatedData.phoneNumber);

    const dataToSend: SignupInput = {
      ...validatedData,
      phoneNumber: formattedPhoneNumber,
    };

    console.log('Data to send:', dataToSend);

    try {
      await signupAction(dataToSend);
    } catch (error) {
      console.error('Signup failed:', error);
      setFormError(
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen mx-5 md:mx-20 lg:mx-32 xl:mx-40 2xl:mx-60">
      {/* 왼쪽: 이미지 영역 */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center">
        <div className="w-3/4 max-w-md">
          <Image
            src={loginimg}
            alt="Signup Image"
            className="w-full h-full rounded-3xl "
            priority
          />
        </div>
      </div>

      {/* 오른쪽: 회원가입 폼 영역 */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        <SignupForm
          onSubmit={handleSubmit}
          error={formError || errors._form?.[0]}
        >
          <SignupForm.Title>GRIMEET</SignupForm.Title>
          <SignupForm.Subtitle>회원가입</SignupForm.Subtitle>

          <SignupForm.InputWrapper>
            <SignupForm.Input
              name="email"
              type="email"
              placeholder="이메일"
              value={formData.email}
              onChange={handleChange}
              error={errors.email?.[0]}
            />
          </SignupForm.InputWrapper>

          <SignupForm.InputWrapper>
            <SignupForm.Input
              name="password"
              type="password"
              placeholder="비밀번호 (8자 이상)"
              value={formData.password}
              onChange={handleChange}
              error={errors.password?.[0]}
            />
          </SignupForm.InputWrapper>

          <SignupForm.InputWrapper>
            <SignupForm.Input
              name="confirmPassword"
              type="password"
              placeholder="비밀번호 확인"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword?.[0]}
            />
          </SignupForm.InputWrapper>

          <SignupForm.InputWrapper>
            <SignupForm.Input
              name="name"
              type="text"
              placeholder="이름"
              value={formData.name}
              onChange={handleChange}
              error={errors.name?.[0]}
            />
          </SignupForm.InputWrapper>

          <SignupForm.InputWrapper>
            <SignupForm.Input
              name="nickname"
              type="text"
              placeholder="닉네임"
              value={formData.nickname}
              onChange={handleChange}
              error={errors.nickname?.[0]}
            />
          </SignupForm.InputWrapper>

          <SignupForm.InputWrapper>
            <SignupForm.Input
              name="phoneNumber"
              type="tel"
              placeholder="휴대폰 번호 ('-' 제외)"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={errors.phoneNumber?.[0]}
              maxLength={11}
            />
          </SignupForm.InputWrapper>

          <SignupForm.Button isLoading={isLoading}>회원가입</SignupForm.Button>

          <SignupForm.Divider />

          <SignupForm.LoginPrompt loginHref="/login" />
        </SignupForm>
      </div>
    </div>
  );
}
