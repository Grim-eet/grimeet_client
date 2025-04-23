import {z} from 'zod';

/* 
"name": "홍길동",
  "email": "testUser@example.com",
  "password": "test1234!#",
  "nickname": "둘리",
  "phoneNumber": "010-1234-5678"
*/

// 회원가입 타입 정의
export const SignupSchema = z
  .object({
    name: z.string().min(1, {message: '이름을 입력하세요'}),
    email: z
      .string()
      .email({message: '유효한 이메일 주소를 입력하세요'})
      .min(1, {message: '이메일을 입력해주세요'}),
    password: z.string().min(8, {
      message: '비밀번호는 대소문자, 특수문자 포함 최소 8자 이상이어야 합니다.',
    }),
    nickname: z.string().min(1, {message: '닉네임을 입력해주세요'}),
    phoneNumber: z
      .string()
      .min(1, {message: '휴대폰 번호를 입력해주세요.'})
      .regex(/^[0-9]+$/, {message: '숫자만 입력해주세요.'})
      .length(11, {message: '휴대폰 번호는 11자리여야 합니다.'}),
    confirmPassword: z
      .string()
      .min(1, {message: '비밀번호 확인을 입력해주세요.'}),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type SignupInput = z.infer<typeof SignupSchema>;

//에러 상태를 위한 타입정의
export type FieldErrors = {
  [K in keyof SignupInput]?: string[];
} & {_form?: string[]}; // 폼 레벨 에러

// 로그인 타입 정의
export const LoginSchema = z.object({
  email: z.string().email({message: '유효한 이메일 주소를 입력해주세요'}),
  password: z.string().min(1, {message: '비밀번호를 입력해주세요'}),
  autoLogin: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export type LoginFieldErrors = {
  [K in keyof LoginInput]?: string[];
} & {_form?: string[]};
