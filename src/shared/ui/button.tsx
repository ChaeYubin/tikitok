import { cva, VariantProps } from 'class-variance-authority'
import Link, { LinkProps } from 'next/link'
import { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva('transition-all duration-300 hover:shadow-lg', {
  variants: {
    variant: {
      solid: 'text-primary bg-primary font-semibold text-white',
      outline: 'border-2 border-border-primary font-semibold text-text-primary',
    },
    size: {
      sm: 'text-sm px-4 py-2',
      md: 'text-base px-6 py-2.5',
      lg: 'text-lg px-8 py-3.5',
    },
    shape: {
      rounded: 'rounded-full',
      square: 'rounded-md',
    },
  },
  defaultVariants: {
    variant: 'solid',
    shape: 'square',
    size: 'md',
  },
})

export type PolymorphicButtonProps =
  | ({ as?: 'button' } & ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as: 'link'; href: string } & LinkProps)

export type ButtonVariants = VariantProps<typeof buttonVariants>

export type ButtonProps = PolymorphicButtonProps &
  ButtonVariants & {
    children: ReactNode
    className?: string
  }

const Button = ({
  as = 'button',
  variant,
  size,
  shape,
  className,
  children,
  ...props
}: ButtonProps) => {
  if (as === 'link') {
    const { href, ...linkProps } = props as { href: string } & LinkProps

    return (
      <Link
        href={href}
        className={cn(buttonVariants({ variant, size, shape }), className)}
        {...linkProps}
      >
        {children}
      </Link>
    )
  }

  const { disabled, ...buttonProps } = props as ButtonHTMLAttributes<HTMLButtonElement>

  return (
    <button
      className={cn(buttonVariants({ variant, size, shape }), className)}
      aria-disabled={disabled}
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  )
}

export default Button
