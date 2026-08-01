import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/helpers';

export const Badge = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      'inline-flex items-center border border-black/15 bg-transparent px-3 py-1 font-mono text-[0.64rem] font-bold uppercase tracking-[0.14em] text-black/55',
      className,
    )}
    {...props}
  >
    {children}
  </span>
);
