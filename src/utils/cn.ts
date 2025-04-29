// utils.ts (또는 lib/utils.ts 등)
// tailwind-merge: Tailwind 클래스 중복·우선순위 병합
import {clsx, ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';

/**
 * cn: clsx로 조건부 클래스 문자열 생성 → twMerge로 Tailwind 클래스 충돌 정리
 * @param inputs - clsx/​classnames에 넘길 수 있는 모든 값
 * @returns 병합된 클래스 문자열
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
