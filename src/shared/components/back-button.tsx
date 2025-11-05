'use client'

import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

import Button, { ButtonVariants } from '../ui/button'

export interface BackButtonProps extends ButtonVariants {
  children?: ReactNode
  className?: string
}

const BackButton = ({
  variant = 'outline',
  shape = 'rounded',
  size = 'md',
  children = '이전 페이지',
  className,
}: BackButtonProps) => {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.back()}
      variant={variant}
      shape={shape}
      size={size}
      className={className}
    >
      {children}
    </Button>
  )
}

export default BackButton
