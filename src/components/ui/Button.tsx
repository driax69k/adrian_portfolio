import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
  useRef,
} from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useMagnetic } from '../../hooks/useMagnetic';
import { cn } from '../../utils/helpers';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

const styles = {
  base: 'group relative inline-flex items-center justify-center gap-3 overflow-hidden border font-mono font-black uppercase tracking-[0.1em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    primary:
      'border-canvas-dark bg-canvas-dark text-text-on-dark hover:border-accent hover:bg-accent hover:text-text-on-dark',
    secondary:
      'border-text-on-light bg-transparent text-text-on-light hover:bg-canvas-dark hover:text-text-on-dark',
    ghost:
      'border-transparent bg-transparent text-text-on-light/60 hover:border-text-on-light/15 hover:text-text-on-light',
  },
  sizes: {
    sm: 'min-h-10 px-4 text-[0.66rem]',
    md: 'min-h-12 px-5 text-[0.7rem]',
    lg: 'min-h-14 px-7 text-[0.72rem]',
  },
};

interface SharedProps {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  magnetic?: boolean;
}

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    SharedProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      icon,
      magnetic = false,
      ...props
    },
    forwardedRef,
  ) => {
    const localRef = useRef<HTMLButtonElement>(null);
    useMagnetic(localRef, magnetic);
    const setRefs = (node: HTMLButtonElement | null) => {
      localRef.current = node;
      if (typeof forwardedRef === 'function') forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    };

    return (
      <button
        ref={setRefs}
        className={cn(
          styles.base,
          styles.variants[variant],
          styles.sizes[size],
          className,
        )}
        {...props}
      >
        <span
          className="absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]"
          aria-hidden="true"
        />
        <span className="relative z-10">{children}</span>
        {icon ?? (
          <ArrowUpRight className="relative z-10 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

export interface ButtonLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'>,
    SharedProps {}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      icon,
      magnetic = false,
      ...props
    },
    forwardedRef,
  ) => {
    const localRef = useRef<HTMLAnchorElement>(null);
    useMagnetic(localRef, magnetic);
    const setRefs = (node: HTMLAnchorElement | null) => {
      localRef.current = node;
      if (typeof forwardedRef === 'function') forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    };

    return (
      <a
        ref={setRefs}
        className={cn(
          styles.base,
          styles.variants[variant],
          styles.sizes[size],
          className,
        )}
        {...props}
      >
        <span
          className="absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]"
          aria-hidden="true"
        />
        <span className="relative z-10">{children}</span>
        {icon ?? (
          <ArrowUpRight className="relative z-10 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        )}
      </a>
    );
  },
);

ButtonLink.displayName = 'ButtonLink';
