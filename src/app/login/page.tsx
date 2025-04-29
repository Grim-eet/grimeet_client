'use client';

import {useState} from 'react';
import loginimg from '../../../public/images/loginimg.png';
import Image from 'next/image';
import {LoginFieldErrors, LoginInput, LoginSchema} from '@/types/auth';
import loginAction from '@/api/auth/loginAction';
import {useRouter} from 'next/navigation';
import {LoginForm} from '../auth/login/LoginForm';
import googleAction from '@/api/auth/googleAction';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginInput>({
    email: '',
    password: '',
    autoLogin: false,
  });

  const [errors, setErrors] = useState<LoginFieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);

  //form 데이터 저장
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value, type, checked} = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name as keyof LoginInput]) {
      setErrors((prev) => {
        const newErrors = {...prev};
        delete newErrors[name as keyof LoginInput];
        return newErrors;
      });
    }
    if (formError) {
      setFormError(undefined);
    }
  };

  //로그인 제출
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setFormError(undefined);
    setIsLoading(true);

    const validationResult = LoginSchema.safeParse(formData);

    if (!validationResult.success) {
      const flatErrors = validationResult.error.flatten();
      const formattedErrors: LoginFieldErrors = {};
      for (const key in flatErrors.fieldErrors) {
        const typedKey = key as keyof LoginInput;
        if (flatErrors.fieldErrors.hasOwnProperty(typedKey)) {
          formattedErrors[typedKey] = flatErrors.fieldErrors[typedKey];
        }
      }
      setErrors(formattedErrors);
      setIsLoading(false);
      return;
    }

    console.log('로그인 data:', validationResult.data);

    try {
      const res = await loginAction(validationResult.data);

      console.log(res);
      if (res?.data) {
        console.log('로그인 성공');

        router.push('/');
      } else if (res?.error) {
        if (res.details) {
          const formattedErrors: LoginFieldErrors = {};
          for (const key in res.details) {
            const typedKey = key as keyof LoginInput;
            if (Object.prototype.hasOwnProperty.call(res.details, typedKey)) {
              formattedErrors[typedKey] = res.details[typedKey];
            }
          }
          setErrors(formattedErrors);
        }
        setFormError(
          typeof res.error === 'string'
            ? res.error
            : '로그인 정보를 확인해 주세요'
        );
      } else {
        alert('로그인을 실패했습니다. 다시 시도해주세요');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  //구글 로그인
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setGoogleError(null);
    setErrors({});
    setFormError(undefined);

    try {
      const googleAuthURl = await googleAction();

      if (!googleAuthURl) {
        console.error('구글 로그인 URL을 받지 못했습니다.');
        setIsGoogleLoading(false);
        return;
      }
      window.location.href = googleAuthURl;
    } catch (error) {
      console.error('구글 로그인에대해 실패 했습니다.');
    }
  };

  return (
    <div className="flex min-h-screen mx-5 md:mx-20 lg:mx-32 xl:mx-40 2xl:mx-60">
      {/* 왼쪽: 이미지 영역 */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center">
        <div className="w-3/4 max-w-md">
          <Image
            src={loginimg}
            alt="Login Image"
            className="w-full h-full rounded-3xl "
            fetchPriority="high"
            loading="eager"
            priority
          />
        </div>
      </div>

      {/* 오른쪽: 로그인 폼 영역 */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        <LoginForm onSubmit={handleSubmit}>
          <LoginForm.Title></LoginForm.Title>
          <LoginForm.Subtitle></LoginForm.Subtitle>
          <LoginForm.InputWrapper>
            <LoginForm.Input
              name="email"
              type="email"
              placeholder="이메일을 입력하세요"
              value={formData.email}
              onChange={handleChange}
              error={errors.email?.[0]}
            />
          </LoginForm.InputWrapper>

          <LoginForm.InputWrapper>
            <LoginForm.Input
              name="password"
              type="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
              error={errors.password?.[0]}
            />
          </LoginForm.InputWrapper>

          <LoginForm.Checkbox
            name="autoLogin"
            label="자동 로그인"
            checked={formData.autoLogin || false} // checked 상태 전달
            onChange={handleChange}
          />

          <LoginForm.Button isLoading={isLoading}>로그인</LoginForm.Button>

          <LoginForm.Divider />

          <LoginForm.LinksContainer>
            <LoginForm.Link href="/auth/idinquiry">아이디 찾기</LoginForm.Link>
            <LoginForm.Link href="/auth/pwinquiry">
              비밀번호 찾기
            </LoginForm.Link>
            {/* 경로 수정 */}
          </LoginForm.LinksContainer>

          <LoginForm.Divider />

          <LoginForm.SocialLoginContainer>
            {/* 소셜 로그인 버튼 클릭 핸들러 추가 필요 */}
            <LoginForm.SocialButton onClick={handleGoogleLogin}>
              Continue with Google
            </LoginForm.SocialButton>
            <LoginForm.SocialButton onClick={() => console.log('Kakao Login')}>
              Continue with kakao
            </LoginForm.SocialButton>
            <LoginForm.SocialButton onClick={() => console.log('Naver Login')}>
              Continue with naver
            </LoginForm.SocialButton>
          </LoginForm.SocialLoginContainer>

          <LoginForm.SignUpPrompt signupHref="/signup" />
        </LoginForm>
      </div>
    </div>
  );
}
