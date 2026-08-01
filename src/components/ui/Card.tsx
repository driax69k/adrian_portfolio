import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/helpers';

export const Card = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'border border-text-on-light/10 bg-white/35 shadow-[0_18px_60px_rgba(18,11,36,0.05)] backdrop-blur-sm',
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
