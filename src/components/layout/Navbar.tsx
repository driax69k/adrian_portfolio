import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Download, Menu, X } from 'lucide-react';
import { navLinks, personalInfo, socialLinks } from '../../data/personal';
import { useActiveSection, scrollToSection } from '../../hooks/useScroll';
import { cn } from '../../utils/helpers';
import { gsap, ScrollTrigger } from '../../utils/gsap';
import { SocialIcon } from '../ui/SocialIcon';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const root = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const activeSection = useActiveSection(
    navLinks.map((link) => link.href.slice(1)),
  );

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const reduced = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches;

        if (!reduced) {
          gsap.fromTo(
            '.nav-reveal',
            { y: -20, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.75,
              stagger: 0.08,
              ease: 'power3.out',
              delay: 1.25,
            },
          );
        }

        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            gsap.set(progress.current, {
              scaleX: self.progress,
              transformOrigin: 'left center',
            });
          },
        });
      }, root);

      return () => ctx.revert();
    },
    { scope: root },
  );

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const reduced = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches;
        const duration = reduced ? 0 : 0.45;

        if (isMenuOpen) {
          const timeline = gsap.timeline({
            defaults: { ease: 'power3.out' },
          });
          timeline
            .to(menu.current, {
              autoAlpha: 1,
              yPercent: 0,
              duration,
            })
            .fromTo(
              '.mobile-nav-item',
              { yPercent: 100, autoAlpha: 0 },
              {
                yPercent: 0,
                autoAlpha: 1,
                duration: reduced ? 0 : 0.55,
                stagger: 0.055,
              },
              '<0.08',
            )
            .fromTo(
              '.mobile-nav-meta',
              { y: 16, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: reduced ? 0 : 0.4,
              },
              '<0.15',
            );
        } else {
          gsap.to(menu.current, {
            autoAlpha: 0,
            yPercent: -4,
            duration: reduced ? 0 : 0.28,
            ease: 'power2.in',
          });
        }
      }, root);

      return () => ctx.revert();
    },
    { scope: root, dependencies: [isMenuOpen], revertOnUpdate: true },
  );

  const handleNavigation = (href: string) => {
    scrollToSection(href);
    setIsMenuOpen(false);
  };

  return (
    <header
      ref={root}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 p-4 sm:p-6"
    >
      <nav
        className="relative mx-auto flex max-w-[96rem] items-center justify-between"
        aria-label="Main navigation"
      >
        <a
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            handleNavigation('#home');
          }}
          className={cn(
            'nav-reveal pointer-events-auto relative z-50 inline-flex min-h-12 items-center gap-2 rounded-full border px-5 font-mono text-xs font-black uppercase tracking-[0.18em] transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
            isMenuOpen
              ? 'border-white/15 bg-white/[0.06] text-text-on-dark'
              : isScrolled
                ? 'border-text-on-light/10 bg-canvas-light/85 text-text-on-light shadow-[0_12px_40px_rgba(18,11,36,0.08)] backdrop-blur-xl'
                : 'border-transparent bg-transparent text-text-on-light',
          )}
          aria-label="Adrian Cordero — home"
        >
          <span className="size-2 rounded-full bg-accent-secondary" aria-hidden="true" />
          AC 
        </a>

        <div className="nav-reveal pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full border border-text-on-light/[0.06] bg-canvas-light/80 p-1.5 shadow-[0_12px_45px_rgba(18,11,36,0.08)] backdrop-blur-xl lg:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavigation(link.href);
                }}
                className={cn(
                  'relative rounded-full px-4 py-2.5 font-mono text-[0.64rem] font-bold uppercase tracking-[0.14em] transition-colors xl:px-5',
                  isActive
                    ? 'bg-canvas-dark text-text-on-dark'
                    : 'text-text-muted-on-light hover:text-text-on-light',
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <a
          href="#contact"
          onClick={(event) => {
            event.preventDefault();
            handleNavigation('#contact');
          }}
          className="nav-reveal group pointer-events-auto hidden min-h-12 items-center gap-3 rounded-full bg-canvas-dark py-1.5 pl-5 pr-1.5 font-mono text-[0.67rem] font-black uppercase tracking-[0.15em] text-text-on-dark shadow-[0_12px_36px_rgba(18,11,36,0.2)] transition hover:shadow-[0_0_32px_rgba(124,58,237,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:flex"
        >
          Let&apos;s talk
          <span className="grid size-9 place-items-center rounded-full bg-accent text-text-on-dark">
            <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
          </span>
        </a>

        <button
          type="button"
          className={cn(
            'nav-reveal pointer-events-auto relative z-50 grid size-12 place-items-center rounded-full border backdrop-blur-xl transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden',
            isMenuOpen
              ? 'border-white/15 bg-white/[0.06] text-text-on-dark'
              : 'border-text-on-light/10 bg-canvas-light/80 text-text-on-light',
          )}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
        >
          {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <div
        ref={progress}
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent"
        aria-hidden="true"
      />

      <div
        id="mobile-navigation"
        ref={menu}
        className={cn(
          'pointer-events-auto invisible fixed inset-0 -z-10 translate-y-[-4%] bg-canvas-dark px-5 pb-8 pt-28 text-text-on-dark opacity-0 lg:hidden',
          isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!isMenuOpen}
        {...(!isMenuOpen ? { inert: true } : {})}
      >
        <div className="mx-auto flex h-full max-w-xl flex-col">
          <p className="mobile-nav-meta mb-5 font-mono text-[0.63rem] uppercase tracking-[0.2em] text-accent-soft">
            // Navigation
          </p>
          <div className="border-t border-white/15">
            {navLinks.map((link, index) => (
              <div key={link.href} className="overflow-hidden border-b border-white/15">
                <a
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavigation(link.href);
                  }}
                  className="mobile-nav-item group flex items-center justify-between py-4 text-[clamp(2.2rem,11vw,4rem)] font-black uppercase leading-none tracking-[-0.06em] text-text-on-dark transition hover:text-accent"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-[0.62rem] tracking-[0.16em] text-text-muted-on-dark/60">
                    0{index + 1}
                  </span>
                </a>
              </div>
            ))}
          </div>

          <div className="mobile-nav-meta mt-auto">
            <a
              href={personalInfo.resumeUrl}
              download
              className="mb-6 flex min-h-12 items-center justify-center gap-2 bg-accent font-mono text-xs font-black uppercase tracking-[0.14em] text-text-on-dark"
            >
              Download resume
              <Download className="size-4" />
            </a>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-text-muted-on-dark/60">
                Iloilo City / PH
              </span>
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target={social.url.startsWith('http') ? '_blank' : undefined}
                    rel={social.url.startsWith('http') ? 'noreferrer' : undefined}
                    className="grid size-10 place-items-center rounded-full border border-white/15 text-text-muted-on-dark transition hover:border-accent hover:text-accent"
                    aria-label={social.name}
                  >
                    <SocialIcon name={social.icon} className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
