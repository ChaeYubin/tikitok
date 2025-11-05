import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Tailwind 클래스 병합 및 충돌 해결
 *
 *  @example
 * cn('px-2', 'px-4') // => 'px-4' (나중 값이 우선)
 * cn('text-sm', active && 'text-lg') // 조건부 적용
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
