import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/helpers';

export const Card = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'border border-black/10 bg-white/35 shadow-[0_18px_60px_rgba(0,0,0,0.04)] backdrop-blur-sm',
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
