import { SVGProps, forwardRef } from 'react'
import { cn } from '@/lib/cn'

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = 24, children, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn('inline-block', className)}
        {...props}
      >
        {children}
      </svg>
    )
  },
)

Icon.displayName = 'Icon'

