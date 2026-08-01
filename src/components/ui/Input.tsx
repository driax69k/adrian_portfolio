import {
  forwardRef,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import { cn } from '../../utils/helpers';

interface FieldShellProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

const FieldShell = ({ id, label, error, children }: FieldShellProps) => (
  <div>
    <label htmlFor={id} className="mb-2 block font-mono text-[0.64rem] font-bold uppercase tracking-[0.12em] text-white/55">
      {label}
    </label>
    {children}
    <p
      id={`${id}-error`}
      className={cn('mt-2 min-h-5 text-xs text-rose-300', !error && 'invisible')}
      aria-live="polite"
    >
      {error ?? 'No error'}
    </p>
  </div>
);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, error, className, ...props }, ref) => {
    const fieldId = id ?? props.name ?? 'input';
    return (
      <FieldShell id={fieldId} label={label} error={error}>
        <input
          ref={ref}
          id={fieldId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          className={cn(
            'min-h-12 w-full border bg-black px-4 text-[0.95rem] text-white outline-none transition placeholder:text-white/45',
            error
              ? 'border-rose-400/70 focus:border-rose-300 focus:ring-4 focus:ring-rose-400/10'
              : 'border-white/15 hover:border-white/30 focus:border-[#9ef01a] focus:ring-4 focus:ring-[#9ef01a]/10',
            className,
          )}
          {...props}
        />
      </FieldShell>
    );
  },
);

Input.displayName = 'Input';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ id, label, error, className, ...props }, ref) => {
    const fieldId = id ?? props.name ?? 'textarea';
    return (
      <FieldShell id={fieldId} label={label} error={error}>
        <textarea
          ref={ref}
          id={fieldId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          className={cn(
            'min-h-36 w-full resize-y border bg-black px-4 py-3 text-[0.95rem] text-white outline-none transition placeholder:text-white/45',
            error
              ? 'border-rose-400/70 focus:border-rose-300 focus:ring-4 focus:ring-rose-400/10'
              : 'border-white/15 hover:border-white/30 focus:border-[#9ef01a] focus:ring-4 focus:ring-[#9ef01a]/10',
            className,
          )}
          {...props}
        />
      </FieldShell>
    );
  },
);

TextArea.displayName = 'TextArea';
