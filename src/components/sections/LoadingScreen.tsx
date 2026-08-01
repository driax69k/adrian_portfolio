import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../utils/gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const root = useRef<HTMLDivElement>(null);
  const percent = useRef<HTMLSpanElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const reduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      const ctx = gsap.context(() => {
        const counter = { value: 0 };
        const duration = reduced ? 0.12 : 0.9;
        const timeline = gsap.timeline({
          defaults: { ease: 'power3.out' },
          onComplete,
        });

        gsap.set(progress.current, { scaleX: 0, transformOrigin: 'left center' });

        timeline
          .fromTo(
            '.loader-mark',
            { y: 18, autoAlpha: 0, scale: 0.92 },
            { y: 0, autoAlpha: 1, scale: 1, duration: reduced ? 0.01 : 0.45 },
          )
          .to(
            counter,
            {
              value: 100,
              duration,
              ease: 'power2.inOut',
              onUpdate: () => {
                if (percent.current) {
                  percent.current.textContent = `${Math.round(counter.value)
                    .toString()
                    .padStart(3, '0')}%`;
                }
              },
            },
            reduced ? 0 : 0.2,
          )
          .to(
            progress.current,
            { scaleX: 1, duration, ease: 'power2.inOut' },
            '<',
          )
          .to(
            '.loader-content',
            {
              y: -18,
              autoAlpha: 0,
              duration: reduced ? 0.04 : 0.3,
            },
            '+=0.08',
          )
          .to(
            root.current,
            {
              yPercent: -100,
              duration: reduced ? 0.05 : 0.65,
              ease: 'power4.inOut',
            },
            '<0.04',
          );
      }, root);

      return () => {
        document.body.style.overflow = previousOverflow;
        ctx.revert();
      };
    },
    { scope: root, dependencies: [onComplete], revertOnUpdate: true },
  );

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#080808]"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="loader-content relative w-[min(82vw,25rem)]">
        <div className="mb-10 flex items-end justify-between">
          <div className="loader-mark grid size-20 place-items-center border border-[#9ef01a]/40 bg-[#9ef01a] font-mono text-3xl font-black tracking-[-0.08em] text-black shadow-[0_0_60px_rgba(158,240,26,0.18)]">
            AC
          </div>
          <span
            ref={percent}
            className="font-mono text-xs tracking-[0.16em] text-white/40"
          >
            000%
          </span>
        </div>
        <div className="h-px overflow-hidden bg-white/10">
          <div ref={progress} className="h-full w-full bg-[#9ef01a]" />
        </div>
        <div className="mt-4 flex items-center justify-between gap-4 overflow-hidden font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/30 sm:text-[0.65rem] sm:tracking-[0.18em]">
          <span className="shrink-0">Loading portfolio</span>
          <span className="shrink-0">Iloilo / PH</span>
        </div>
      </div>
    </div>
  );
};
