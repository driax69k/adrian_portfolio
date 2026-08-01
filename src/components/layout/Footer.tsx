import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Terminal } from 'lucide-react';
import {
  emailComposeUrl,
  navLinks,
  personalInfo,
  socialLinks,
} from '../../data/personal';
import { currentYear } from '../../utils/helpers';
import { gsap, prefersReducedMotion } from '../../utils/gsap';
import { SocialIcon } from '../ui/SocialIcon';

const sitemapLinks = navLinks.filter((link) =>
  ['#about', '#projects', '#experience', '#skills', '#organizations'].includes(
    link.href,
  ),
);

const networkLinks = socialLinks.filter((social) => social.icon !== 'mail');

export const Footer = () => {
  const root = useRef<HTMLElement>(null);
  const clock = useRef<HTMLTimeElement>(null);

  useEffect(() => {
    const updateClock = () => {
      if (!clock.current) return;

      const now = new Date();
      clock.current.dateTime = now.toISOString();
      clock.current.textContent = `${now.toLocaleTimeString('en-PH', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23',
        timeZone: 'Asia/Manila',
      })} GMT+8`;
    };

    updateClock();
    const interval = window.setInterval(updateClock, 1_000);
    return () => window.clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const isMobile = window.matchMedia('(max-width: 639px)').matches;

      gsap.fromTo(
        '.footer-reveal',
        {
          y: isMobile ? 16 : 24,
          autoAlpha: 0,
          willChange: 'transform, opacity',
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: isMobile ? 0.6 : 0.8,
          stagger: isMobile ? 0.06 : 0.09,
          ease: 'power3.out',
          onComplete: () => {
            gsap.set('.footer-reveal', { clearProps: 'willChange' });
          },
          scrollTrigger: {
            trigger: root.current,
            start: isMobile ? 'top 94%' : 'top 88%',
            once: true,
          },
        },
      );
    },
    { scope: root },
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  return (
    <footer
      id="contact"
      ref={root}
      className="relative scroll-mt-20 overflow-hidden bg-canvas-dark px-4 pb-5 pt-12 text-text-on-dark sm:min-h-[44rem] sm:px-8 sm:pb-7 sm:pt-20 lg:min-h-[58rem] lg:px-12"
      aria-labelledby="footer-contact-title"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] [background-size:48px_48px] sm:[background-size:64px_64px]"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-[90rem] flex-col sm:min-h-[calc(44rem-7rem)] lg:min-h-[calc(58rem-7rem)]">
        <div className="footer-reveal flex min-w-0 items-center gap-3 sm:gap-4">
          <span className="size-2 shrink-0 rounded-[2px] bg-accent" />
          <span className="whitespace-nowrap font-mono text-[0.56rem] font-bold uppercase tracking-[0.16em] text-text-muted-on-dark sm:text-xs sm:tracking-[0.25em]">
            06 &mdash; Initialize_contact
          </span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="flex flex-1 items-center py-14 sm:py-24 lg:py-28">
          <div className="grid w-full min-w-0 gap-12 sm:gap-16 lg:grid-cols-[1.15fr_0.38fr_0.47fr] lg:items-start lg:gap-14 xl:gap-20">
            <div className="footer-reveal min-w-0">
              <h2
                id="footer-contact-title"
                className="font-display text-[clamp(3.35rem,18vw,7rem)] font-black uppercase leading-[0.86] tracking-[-0.06em] sm:tracking-[-0.065em]"
              >
                Let&apos;s
                <span className="block pr-2 italic text-accent sm:pr-4">
                  Connect.
                </span>
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-7 text-text-muted-on-dark sm:mt-8 sm:text-base sm:leading-8">
                Feel free to reach out for collaborations, frontend projects,
                UI/UX discussions, or just to say hello. I&apos;m always open
                to exploring new opportunities.
              </p>
              <a
                href={emailComposeUrl}
                target="_blank"
                rel="noreferrer"
                className="group mt-6 inline-flex min-h-11 max-w-full items-center gap-2 border-b border-accent/40 py-2 font-mono text-[0.58rem] font-bold uppercase tracking-[0.08em] text-accent-soft transition hover:border-white hover:text-text-on-dark sm:mt-7 sm:gap-3 sm:text-xs sm:tracking-[0.14em]"
              >
                <span className="truncate">{personalInfo.email}</span>
                <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
              </a>
            </div>

            <nav className="footer-reveal" aria-label="Footer navigation">
              <h3 className="border-l-2 border-white/25 pl-3 font-mono text-[0.62rem] font-bold uppercase tracking-[0.24em] text-text-muted-on-dark/60">
                Sitemap
              </h3>
              <ul className="mt-5 grid grid-cols-2 gap-x-4 sm:mt-8 sm:flex sm:flex-col sm:gap-2">
                {sitemapLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="group inline-flex min-h-11 w-full items-center gap-2 py-2 font-mono text-[0.66rem] font-bold uppercase tracking-[0.12em] text-text-muted-on-dark transition hover:text-accent-soft sm:gap-3 sm:text-xs sm:tracking-[0.2em]"
                    >
                      <span className="size-1.5 bg-white/20 transition group-hover:bg-accent" />
                      {link.label === 'Skills' ? 'Capabilities' : link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="footer-reveal">
              <h3 className="border-l-2 border-accent pl-3 font-mono text-[0.62rem] font-bold uppercase tracking-[0.24em] text-text-muted-on-dark/60">
                Networks
              </h3>
              <div className="mt-5 flex flex-col gap-3 sm:mt-8">
                {networkLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-h-14 items-center justify-between border border-white/10 bg-white/[0.015] px-4 transition duration-300 hover:border-accent hover:bg-accent"
                  >
                    <span className="flex items-center gap-4">
                      <SocialIcon
                        name={social.icon}
                        className="size-4 text-text-muted-on-dark/60 transition group-hover:text-text-on-dark"
                      />
                      <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-text-on-dark transition group-hover:text-text-on-dark">
                        {social.name}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="size-3.5 text-text-muted-on-dark/45 transition group-hover:text-text-on-dark/80"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-reveal grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-5 border-t border-white/10 pt-5 font-mono text-[0.56rem] uppercase tracking-[0.1em] text-text-muted-on-dark/60 sm:pt-7 sm:text-[0.62rem] sm:tracking-[0.18em] md:grid-cols-[1fr_auto_1fr] md:gap-5">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <span>Sys.status:</span>
            <span className="whitespace-nowrap border border-accent-secondary/35 bg-accent-secondary px-2 py-1 text-canvas-dark sm:px-2.5">
              Available
            </span>
          </div>

          <time
            ref={clock}
            className="whitespace-nowrap text-right tabular-nums text-text-muted-on-dark/50 md:text-center"
          >
            00:00:00 GMT+8
          </time>

          <div className="col-span-2 flex items-center justify-between gap-4 md:col-span-1 md:justify-end">
            <p className="leading-5 md:text-right">
              &copy; {currentYear()} {personalInfo.name}. All rights reserved.
            </p>
            <button
              type="button"
              onClick={scrollToTop}
              className="grid size-11 shrink-0 place-items-center rounded-full border border-white/15 text-accent transition hover:border-accent hover:bg-accent hover:text-text-on-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:size-12"
              aria-label="Back to top"
            >
              <Terminal className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
