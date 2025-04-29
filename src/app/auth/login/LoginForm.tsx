'use client';

import React from 'react';
import {Input} from '@/app/components/common/Input';
import {cn} from '@/utils/cn';
import {LoginInput} from '@/types/auth';

interface LoginFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  error?: string;
}

export const LoginFormRoot: React.FC<LoginFormProps> = ({
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
const Title: React.FC<TitleProps> = ({className, children, ...props}) => {
  return (
    <h1
      className={cn('font-bold text-2xl mb-2 text-center', className)}
      {...props}
    >
      {children}
    </h1>
  );
};

interface SubtitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
const Subtitle: React.FC<SubtitleProps> = ({className, children, ...props}) => {
  return (
    <h2
      className={cn('font-bold text-xl mb-6 text-center', className)}
      {...props}
    >
      {children}
    </h2>
  );
};

interface InputWrapperProps extends React.HTMLAttributes<HTMLDivElement> {}
const InputWrapper: React.FC<InputWrapperProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('mb-4 w-full', className)} {...props}>
      {children}
    </div>
  );
};

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {}
const Divider: React.FC<DividerProps> = ({className, ...props}) => {
  return (
    <div
      className={cn('w-full border-t border-gray-300 my-4', className)}
      {...props}
    ></div>
  );
};

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}
const Link: React.FC<LinkProps> = ({className, children, href, ...props}) => {
  return (
    <a
      className={cn('text-sm text-gray-600 hover:underline', className)}
      href={href}
      {...props}
    >
      {children}
    </a>
  );
};

interface FormInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'name'
  > {
  name: keyof LoginInput;
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
  type,
  placeholder,
  maxLength,
  ...rest
}) => {
  return (
    <div className="w-full">
      <Input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        className={className}
        aria-invalid={error ? 'true' : 'false'}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  name: keyof LoginInput;
  label: string;
  checked: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  checked,
  onChange,
  className,
  ...props
}) => {
  const id = name;
  return (
    <div className={cn('mb-6 flex items-center w-full', className)}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        {...props}
      />
      <label htmlFor={id} className="ml-2 text-sm">
        {label}
      </label>
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
        'w-full px-4 py-2 mb-6 bg-blue-600 text-white rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    >
      {isLoading ? '처리 중...' : children}
    </button>
  );
};

interface LinksContainerProps extends React.HTMLAttributes<HTMLDivElement> {}
const LinksContainer: React.FC<LinksContainerProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn('flex justify-center space-x-4 mb-6 w-full', className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface SocialLoginContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {}
const SocialLoginContainer: React.FC<SocialLoginContainerProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn('flex flex-col space-y-3 w-full mb-6', className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface SocialButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const SocialButton: React.FC<SocialButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      type="button"
      className={cn(
        'w-full px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

interface SignUpPromptProps extends React.HTMLAttributes<HTMLDivElement> {
  signupHref: string;
}

const SignUpPrompt: React.FC<SignUpPromptProps> = ({
  signupHref,
  className,
  ...props
}) => {
  return (
    <div className={cn('text-center w-full', className)} {...props}>
      <span className="text-sm text-gray-600">계정이 없으신가요?</span>
      <Link href={signupHref} className="font-semibold underline">
        회원가입
      </Link>
    </div>
  );
};

export const LoginForm = Object.assign(LoginFormRoot, {
  Title,
  Subtitle,
  InputWrapper,
  Input: FormInput,
  Checkbox,
  Button,
  Divider,
  LinksContainer,
  Link,
  SocialLoginContainer,
  SocialButton,
  SignUpPrompt,
});
