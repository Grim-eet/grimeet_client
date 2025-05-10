'use client';

import React from 'react';
import {SignupInput} from '@/types/auth';
import {cn} from '@/utils/cn';
import {Input} from '../../components/common/Input';

interface SignupFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  error?: string;
}

const SignupFormRoot: React.FC<SignupFormProps> = ({
  className,
  children,
  error,
  ...props
}) => {
  return (
    <form
      className={cn('w-full max-w-xs flex flex-col items-center', className)}
      {...props}
      noValidate
    >
      {children}
      {error && (
        <p className="mt-2 text-sm text-red-600 text-center w-full">{error}</p>
      )}
    </form>
  );
};

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
const Title: React.FC<TitleProps> = ({className, children, ...props}) => (
  <h1
    className={cn('font-bold text-2xl mb-2 text-center', className)}
    {...props}
  >
    {children}
  </h1>
);

interface SubtitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
const Subtitle: React.FC<SubtitleProps> = ({className, children, ...props}) => (
  <h2
    className={cn('font-bold text-xl mb-6 text-center', className)}
    {...props}
  >
    {children}
  </h2>
);

interface InputWrapperProps extends React.HTMLAttributes<HTMLDivElement> {}
const InputWrapper: React.FC<InputWrapperProps> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('mb-4 w-full', className)} {...props}>
    {children}
  </div>
);

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {}
const Divider: React.FC<DividerProps> = ({className, ...props}) => (
  <div
    className={cn('w-full border-t border-gray-300 my-4', className)}
    {...props}
  ></div>
);

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}
const Link: React.FC<LinkProps> = ({className, children, ...props}) => (
  <a
    className={cn('text-sm text-gray-600 hover:underline', className)}
    {...props}
  >
    {children}
  </a>
);

interface FormInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'name'
  > {
  name: keyof SignupInput | 'verificationCode';
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  value,
  onChange,
  error,
  className,
  ...props
}) => {
  const {type, placeholder, maxLength, ...rest} = props;

  return (
    <div className="w-full">
      <Input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        {...rest}
        aria-invalid={error ? 'true' : 'false'}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  className,
  children,
  isLoading,
  ...props
}) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={cn(
        'w-full px-4 py-2 mb-6 mt-5 bg-blue-600 text-white rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    >
      {isLoading ? '처리 중...' : children}
    </button>
  );
};

interface LoginPromptProps extends React.HTMLAttributes<HTMLDivElement> {
  loginHref: string;
}

const LoginPrompt: React.FC<LoginPromptProps> = ({
  loginHref,
  className,
  ...props
}) => {
  return (
    <div className={cn('text-center w-full ', className)} {...props}>
      <span className="text-sm text-gray-600">계정이 있으신가요?</span>
      <Link
        href={loginHref}
        className="font-semibold underline mx-5 hover:text-white"
      >
        로그인
      </Link>
    </div>
  );
};

export const SignupForm = Object.assign(SignupFormRoot, {
  Title,
  Subtitle,
  InputWrapper,
  Input: FormInput,
  Button,
  Divider,
  Link,
  LoginPrompt,
});
