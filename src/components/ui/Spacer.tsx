import { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export interface SpacerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  axis?: 'vertical' | 'horizontal'
}

export const Spacer = ({ className, size = 'md', axis = 'vertical', ...props }: SpacerProps) => {
  const sizes = {
    xs: axis === 'vertical' ? 'h-1' : 'w-1',
    sm: axis === 'vertical' ? 'h-2' : 'w-2',
    md: axis === 'vertical' ? 'h-4' : 'w-4',
    lg: axis === 'vertical' ? 'h-6' : 'w-6',
    xl: axis === 'vertical' ? 'h-8' : 'w-8',
    '2xl': axis === 'vertical' ? 'h-12' : 'w-12',
  }

  return <div className={cn(sizes[size], className)} {...props} />
}

