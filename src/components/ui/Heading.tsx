import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/cn'

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as: Component = 'h1', size = 'lg', children, ...props }, ref) => {
    const sizes = {
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-2xl',
      xl: 'text-3xl',
      '2xl': 'text-4xl',
      '3xl': 'text-5xl',
    }

    return (
      <Component ref={ref} className={cn('font-bold', sizes[size], className)} {...props}>
        {children}
      </Component>
    )
  },
)

Heading.displayName = 'Heading'

