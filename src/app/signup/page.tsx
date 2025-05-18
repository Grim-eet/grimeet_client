'use client';

import React, {useState} from 'react';
import Image from 'next/image';
import loginimg from '../../../public/images/loginimg.png';

import {FieldErrors, SignupInput, SignupSchema} from '@/types/auth';
import {SignupForm} from '../auth/signup/SignupForm';
import signupAction from '@/api/auth/signupAction';
import emailCodeActions from '@/api/auth/emailCodeActions';
import emailVerifyAction from '@/api/auth/emailVerifyAction';

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

  const [verificationCode, setVerificationCode] = useState('');
  const [emailVerificationStatus, setEmailVerificationStatus] = useState<
    'idle' | 'sending' | 'sent' | 'verifying' | 'verified' | 'error'
  >('idle');

  const [emailVerificationError, setEmailVerificationError] = useState<
    string | null
  >(null);
  const [IsVerificationCodeInputVisible, setIsVerificationCodeInputVisible] =
    useState(false);

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

    if (name === 'email') {
      setEmailVerificationStatus('idle');
      setEmailVerificationError(null);
      setIsVerificationCodeInputVisible(false);
      setVerificationCode('');
    }
  };

  const handleSendVerificationCode = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setEmailVerificationError('유효한 이메일 주소를 입력해주세요.');
      setEmailVerificationStatus('error');
      return;
    }

    setEmailVerificationStatus('sending');
    setEmailVerificationError(null);
    setIsVerificationCodeInputVisible(false);

    try {
      const res = await emailCodeActions(formData.email);
      if (res?.message) {
        setEmailVerificationStatus('sent');
        setIsVerificationCodeInputVisible(true);
      } else {
        throw new Error('인증번호 발송 요청에 실패했습니다.');
      }
    } catch (error) {
      setEmailVerificationError(
        error instanceof Error ? error.message : '인증번호 발송 중 오류 발생'
      );
      setEmailVerificationStatus('error');
      setIsVerificationCodeInputVisible(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setEmailVerificationError('인증번호를 입력해주세요');
      return;
    }

    setEmailVerificationStatus('verifying');
    setEmailVerificationError(null);

    try {
      const result = await emailVerifyAction({
        email: formData.email,
        code: verificationCode,
      });

      if (result.success) {
        setEmailVerificationStatus('verified');
        setEmailVerificationError(null);
        setIsVerificationCodeInputVisible(false);
      } else {
        throw new Error(result.message || '인증번호가 일치하지 않습니다.');
      }
    } catch (error) {
      setEmailVerificationError(
        error instanceof Error ? error.message : '인증번호 확인 중 오류 발생'
      );
      setEmailVerificationStatus('error');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setFormError(undefined);

    if (emailVerificationStatus !== 'verified') {
      setFormError('이메일 인증을 완료해주세요.');
      window.scrollTo(0, 0);
      return;
    }

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
          error={
            formError ||
            errors._form?.[0] ||
            (emailVerificationError ?? undefined)
          }
        >
          <SignupForm.Title>GRIMEET</SignupForm.Title>
          <SignupForm.Subtitle>회원가입</SignupForm.Subtitle>

          <SignupForm.InputWrapper className="flex flex-col items-end space-x-2">
            <div className="w-full flex-grow">
              <SignupForm.Input
                name="email"
                type="email"
                placeholder="이메일"
                value={formData.email}
                onChange={handleChange}
                error={errors.email?.[0]}
                disabled={
                  emailVerificationStatus === 'sending' ||
                  emailVerificationStatus === 'sent' ||
                  emailVerificationStatus === 'verifying' ||
                  emailVerificationStatus === 'verified'
                }
              />
            </div>
            <SignupForm.Button
              type="button"
              onClick={handleSendVerificationCode}
              isLoading={emailVerificationStatus === 'sending'}
              disabled={
                !formData.email ||
                !!errors.email ||
                emailVerificationStatus === 'sending' ||
                emailVerificationStatus === 'sent' ||
                emailVerificationStatus === 'verified'
              }
              className="whitespace-nowrap h-10 px-3"
            >
              {emailVerificationStatus === 'sent' ||
              emailVerificationStatus === 'verifying' ||
              emailVerificationStatus === 'verified'
                ? '발송 완료'
                : '이메일 인증번호 발송'}
            </SignupForm.Button>
          </SignupForm.InputWrapper>

          {emailVerificationStatus === 'verified' && (
            <p className="text-green-600 text-sm mt-1">이메일 인증 완료</p>
          )}

          {IsVerificationCodeInputVisible && (
            <SignupForm.InputWrapper className=" flex flex-col ">
              <div className="flex-grow">
                <SignupForm.Input
                  name="verificationCode"
                  type="text"
                  placeholder="인증번호 입력"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </div>
              <SignupForm.Button
                type="button"
                onClick={handleVerifyCode}
                isLoading={emailVerificationStatus === 'verifying'}
                disabled={
                  !verificationCode ||
                  emailVerificationStatus === 'verifying' ||
                  emailVerificationStatus === 'verified'
                }
                className="whitespace-nowrap h-10 px-3"
              >
                인증 확인
              </SignupForm.Button>
            </SignupForm.InputWrapper>
          )}

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

          <SignupForm.Button
            isLoading={isLoading}
            disabled={emailVerificationStatus !== 'verified' || isLoading}
          >
            회원가입
          </SignupForm.Button>

          <SignupForm.Divider />

          <SignupForm.LoginPrompt loginHref="/login" />
        </SignupForm>
      </div>
    </div>
  );
}
