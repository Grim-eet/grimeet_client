'use client';

import {useState} from 'react';
import loginimg from '../../../public/images/loginimg.png';
import Image from 'next/image';
import {LoginFieldErrors, LoginInput, LoginSchema} from '@/types/auth';
import loginAction from '@/api/auth/loginAction';
import {useRouter} from 'next/navigation';
import {LoginForm} from '../auth/login/LoginForm';

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
      router.push('/');
    } catch (error) {
      console.error(error);
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
            </LoginForm.Link>{' '}
            {/* 경로 수정 */}
          </LoginForm.LinksContainer>

          <LoginForm.Divider />

          <LoginForm.SocialLoginContainer>
            {/* 소셜 로그인 버튼 클릭 핸들러 추가 필요 */}
            <LoginForm.SocialButton onClick={() => console.log('Google Login')}>
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

// {/* <h1 className="font-bold text-2xl mb-2">GRIMEET</h1>
// <h2 className="font-bold text-xl mb-6">로그인</h2>

// {/* 이메일 입력 */}
// <div className="mb-4 w-full max-w-xs">
//   <Input name={'email'} />
// </div>

// {/* 비밀번호 입력 */}
// <div className="mb-4 w-full max-w-xs">
//   <Input name={'password'} />
// </div>

// {/* 자동 로그인 체크박스 */}
// <div className="mb-6 flex items-center w-full max-w-xs">
//   <input
//     type="checkbox"
//     id="auto-login"
//     className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//   />
//   <label htmlFor="auto-login" className="ml-2 text-sm">
//     자동 로그인
//   </label>
// </div>

// {/* 로그인 버튼 */}
// <button className="w-full max-w-xs mb-6 px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500">
//   로그인
// </button>

// <div className="w-full max-w-xs border-t border-gray-300 my-4"></div>

// {/* 계정 찾기 링크 */}
// <div className="flex justify-center space-x-4 mb-6 w-full max-w-xs">
//   <a href="/auth/idinquiry" className="text-sm text-gray-600">
//     아이디 찾기
//   </a>
//   <a href="/aut/pwinquiry" className="text-sm text-gray-600">
//     비밀번호 찾기
//   </a>
// </div>

// <div className="w-full max-w-xs border-t border-gray-300 my-4"></div>

// {/* 소셜 로그인 */}
// <div className="flex flex-col space-y-3 w-full max-w-xs mb-6">
//   <button className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500">
//     Continue with Google
//   </button>
//   <button className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500">
//     Continue with kakao
//   </button>
//   <button className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500">
//     Continue with naver
//   </button>
// </div>

// {/* 회원가입 링크 */}
// <div className="text-center w-full max-w-xs">
//   <span className="text-sm text-gray-600">계정이 없으신가요? </span>
//   <a href="/signup" className="text-sm font-semibold underline">
//     회원가입
//   </a>
// </div> */}
