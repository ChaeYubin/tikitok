'use client'

import { useRouter } from 'next/navigation'

import { Button, ButtonProps } from '../ui/button'

const BackButton = ({ children = '이전 페이지', ...props }: ButtonProps) => {
  const router = useRouter()

  return (
    <Button onClick={() => router.back()} {...props}>
      {children}
    </Button>
  )
}

export default BackButton
