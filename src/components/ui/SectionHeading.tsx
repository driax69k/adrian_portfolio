import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../utils/gsap';
import { cn } from '../../utils/helpers';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  align?: 'left' | 'center';
  theme?: 'light' | 'dark';
}

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'left',
  theme = 'light',
}: SectionHeadingProps) => {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const reduced = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches;
        if (reduced) return;

        gsap.fromTo(
          '.heading-reveal',
          { yPercent: 110, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: root.current,
              start: 'top 86%',
              once: true,
            },
          },
        );
      }, root);

      return () => ctx.revert();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
      )}
    >
      <div className="overflow-hidden">
        <p
          className={cn(
            'heading-reveal mb-5 inline-flex items-center gap-3 font-mono text-[0.65rem] font-black uppercase tracking-[0.2em]',
            theme === 'dark' ? 'text-text-on-dark/60' : 'text-text-on-light/55',
          )}
        >
          <span className="size-1.5 rounded-full bg-accent shadow-[0_0_14px_rgba(124,58,237,0.75)]" />
          {eyebrow}
        </p>
      </div>
      <div className="overflow-hidden pb-1">
        <h2
          className={cn(
            'heading-reveal font-display text-balance text-4xl font-black uppercase leading-[0.95] tracking-[-0.055em] sm:text-5xl lg:text-7xl',
            theme === 'dark' ? 'text-text-on-dark' : 'text-text-on-light',
          )}
        >
          {title}
        </h2>
      </div>
      <div className="overflow-hidden">
        <p
          className={cn(
            'heading-reveal mt-5 text-pretty text-base leading-7 sm:text-lg',
            theme === 'dark' ? 'text-text-on-dark/50' : 'text-text-on-light/55',
          )}
        >
          {description}
        </p>
      </div>
    </div>
  );
};
