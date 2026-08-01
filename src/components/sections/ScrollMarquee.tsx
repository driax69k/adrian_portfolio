import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../utils/gsap';

const marqueeItems = [
  'Web Development',
  'React',
  'UI/UX Design',
  'Flutter',
  'TypeScript',
  'AI Integration',
  'Responsive Design',
];

const MarqueeSet = ({
  marker,
  textClassName,
  markerClassName,
}: {
  marker: string;
  textClassName: string;
  markerClassName: string;
}) => (
  <div className="flex shrink-0 items-center gap-6 pr-6 sm:gap-10 sm:pr-10 lg:gap-14 lg:pr-14">
    {marqueeItems.map((item) => (
      <span
        key={item}
        className="flex shrink-0 items-center gap-6 sm:gap-10 lg:gap-14"
      >
        <span className={textClassName}>{item}</span>
        <span className={markerClassName}>{marker}</span>
      </span>
    ))}
  </div>
);

export const ScrollMarquee = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tracks = gsap.utils.toArray<HTMLElement>('[data-marquee-track]');
      const reduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (reduced) {
        gsap.set(tracks, { xPercent: 0 });
        return;
      }

      gsap.fromTo(
        tracks[0],
        { xPercent: 0 },
        { xPercent: -50, duration: 28, repeat: -1, ease: 'none' },
      );
      gsap.fromTo(
        tracks[1],
        { xPercent: -50 },
        { xPercent: 0, duration: 32, repeat: -1, ease: 'none' },
      );

      gsap.fromTo(
        '.marquee-shell',
        { y: 24 },
        {
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 92%',
            once: true,
          },
        },
      );

    },
    { scope: root },
  );

  return (
    <section
      id="expertise-marquee"
      ref={root}
      className="relative z-20 overflow-hidden py-1 sm:-rotate-[0.8deg] sm:scale-[1.02]"
      aria-label="Areas of expertise"
    >
      <p className="sr-only">{marqueeItems.join(', ')}</p>

      <div className="marquee-shell cursor-default select-none bg-canvas-dark shadow-[0_0_40px_rgba(109,40,217,0.12)] transition-[box-shadow] duration-500 hover:shadow-[0_0_58px_rgba(124,58,237,0.34)]">
        <div className="relative overflow-hidden border-b border-white/10 py-4 sm:py-5 lg:py-6">
          <div
            data-marquee-track
            aria-hidden="true"
            className="flex w-max whitespace-nowrap will-change-transform"
          >
            {[0, 1].map((copy) => (
              <MarqueeSet
                key={copy}
                marker="✦"
                textClassName="font-display text-lg font-black uppercase tracking-[-0.035em] text-accent-soft transition-[color,filter] duration-300 hover:text-text-on-dark hover:drop-shadow-[0_0_12px_rgba(124,58,237,0.7)] sm:text-2xl lg:text-4xl"
                markerClassName="text-[0.55rem] text-accent/35 sm:text-xs"
              />
            ))}
          </div>

          <span className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-canvas-dark to-transparent sm:w-24 lg:w-32" />
          <span className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-canvas-dark to-transparent sm:w-24 lg:w-32" />
        </div>

        <div className="relative overflow-hidden bg-accent py-2.5 sm:py-3 lg:py-4">
          <div
            data-marquee-track
            aria-hidden="true"
            className="flex w-max whitespace-nowrap will-change-transform"
          >
            {[0, 1].map((copy) => (
              <MarqueeSet
                key={copy}
                marker="◆"
                textClassName="font-display text-base font-black uppercase tracking-[-0.025em] text-text-on-dark transition-[color,filter] duration-300 hover:text-text-on-dark hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.75)] sm:text-lg lg:text-2xl"
                markerClassName="text-[0.5rem] text-text-on-dark/40 sm:text-[0.65rem]"
              />
            ))}
          </div>

          <span className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-accent to-transparent sm:w-20 lg:w-24" />
          <span className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-accent to-transparent sm:w-20 lg:w-24" />
        </div>
      </div>
    </section>
  );
};
