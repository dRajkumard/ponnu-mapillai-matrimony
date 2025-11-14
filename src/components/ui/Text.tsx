import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/cn'

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'div'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, as: Component = 'p', size = 'md', children, ...props }, ref) => {
    const sizes = {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    }

    return (
      <Component ref={ref} className={cn(sizes[size], className)} {...props}>
        {children}
      </Component>
    )
  },
)

Text.displayName = 'Text'

