import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Database,
  Mail,
  MapPin,
  Smartphone,
  Terminal,
} from 'lucide-react';
import {
  emailComposeUrl,
  heroRoles,
  personalInfo,
  socialLinks,
} from '../../data/personal';
import { gsap } from '../../utils/gsap';
import { ButtonLink } from '../ui/Button';
import { SocialIcon } from '../ui/SocialIcon';

export const Hero = () => {
  const root = useRef<HTMLElement>(null);
  const role = useRef<HTMLSpanElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      let removePointerListener = () => {};
      const ctx = gsap.context(() => {
        const reduced = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches;

        if (reduced) {
          gsap.set('.hero-reveal, .orbit-icon', { autoAlpha: 1, y: 0 });
          return;
        }

        const intro = gsap.timeline({
          defaults: { duration: 0.8, ease: 'power3.out' },
          delay: 1.25,
        });

        intro
          .fromTo(
            '.hero-meta',
            { y: 18, autoAlpha: 0 },
            { y: 0, autoAlpha: 1 },
          )
          .fromTo(
            '.hero-name-line',
            { yPercent: 110, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, stagger: 0.09, duration: 0.95 },
            '<0.08',
          )
          .fromTo(
            '.hero-statement',
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1 },
            '<0.2',
          )
          .fromTo(
            '.hero-copy',
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.65 },
            '<0.15',
          )
          .fromTo(
            '.orbit-icon',
            { scale: 0.65, autoAlpha: 0 },
            {
              scale: 1,
              autoAlpha: 1,
              duration: 0.55,
              stagger: 0.08,
              ease: 'back.out(1.5)',
            },
            '<0.1',
          );

        if (role.current) {
          const roleTimeline = gsap.timeline({
            repeat: -1,
            repeatDelay: 0.15,
            delay: 2.2,
          });
          heroRoles.forEach((title) => {
            roleTimeline
              .call(() => {
                if (role.current) role.current.textContent = title;
              })
              .fromTo(
                role.current,
                { yPercent: 75, autoAlpha: 0 },
                {
                  yPercent: 0,
                  autoAlpha: 1,
                  duration: 0.4,
                  ease: 'power3.out',
                },
              )
              .to(
                role.current,
                {
                  yPercent: -75,
                  autoAlpha: 0,
                  duration: 0.32,
                  ease: 'power2.in',
                },
                '+=1.45',
              );
          });
        }

        gsap.to('.orbit-icon', {
          y: (index) => (index % 2 === 0 ? -10 : 10),
          duration: (index) => 2.1 + index * 0.25,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.12,
        });

        if (!window.matchMedia('(pointer: coarse)').matches && stage.current) {
          const icons = gsap.utils.toArray<HTMLElement>('.orbit-icon');
          const xSetters = icons.map((icon) =>
            gsap.quickTo(icon, 'x', { duration: 1, ease: 'power3.out' }),
          );
          const ySetters = icons.map((icon) =>
            gsap.quickTo(icon, 'y', { duration: 1, ease: 'power3.out' }),
          );
          const onPointerMove = (event: PointerEvent) => {
            const x = event.clientX / window.innerWidth - 0.5;
            const y = event.clientY / window.innerHeight - 0.5;
            icons.forEach((_, index) => {
              const direction = index % 2 === 0 ? 1 : -1;
              xSetters[index](x * (22 + index * 4) * direction);
              ySetters[index](y * (18 + index * 3) * direction);
            });
          };
          stage.current.addEventListener('pointermove', onPointerMove);
          removePointerListener = () =>
            stage.current?.removeEventListener('pointermove', onPointerMove);
        }
      }, root);

      return () => {
        removePointerListener();
        ctx.revert();
      };
    },
    { scope: root },
  );

  const orbitIcons = [
    { Icon: Code2, className: 'left-[7%] top-[32%] sm:left-[14%]' },
    { Icon: Database, className: 'right-[7%] top-[35%] sm:right-[15%]' },
    { Icon: Terminal, className: 'left-[13%] bottom-[28%] sm:left-[20%]' },
    { Icon: Smartphone, className: 'right-[12%] bottom-[26%] sm:right-[20%]' },
  ];

  return (
    <section
      id="home"
      ref={root}
      className="relative flex min-h-[100svh] scroll-mt-20 items-center overflow-hidden bg-[#f4f4eb] px-5 pb-20 pt-28 text-black sm:px-8 sm:pt-32 lg:px-12"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.045)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute left-1/2 top-1/2 size-[min(80vw,58rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.045]" />
      <div className="absolute left-1/2 top-1/2 size-[min(63vw,45rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/[0.05]" />
      <div className="absolute left-1/2 top-[48%] size-[min(68vw,48rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b7f34b]/25 blur-[80px]" />

      <div ref={stage} className="relative mx-auto w-full max-w-[94rem]">
        {orbitIcons.map(({ Icon, className }, index) => (
          <div
            key={index}
            className={`orbit-icon absolute z-10 hidden size-12 place-items-center rounded-full border border-black/10 bg-[#f7f7ef]/85 text-black shadow-[0_10px_28px_rgba(0,0,0,0.07)] backdrop-blur sm:grid ${className}`}
            aria-hidden="true"
          >
            <Icon className="size-4" />
          </div>
        ))}

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
          <div className="hero-meta hero-reveal mb-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.15em] text-black/55 sm:text-[0.68rem]">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-3.5" />
              Based in Iloilo City, Philippines
            </span>
            <span className="hidden h-5 w-px bg-black/20 sm:block" />
            <span>Open to internships &amp; projects</span>
          </div>

          <h1
            id="hero-heading"
            className="font-display text-[clamp(4rem,7.5vw,8rem)] font-black uppercase leading-[0.78] tracking-[-0.065em]"
          >
            <span className="block overflow-hidden px-[0.08em] pb-[0.1em]">
              <span className="hero-name-line block">Adrian</span>
            </span>
            <span className="block overflow-hidden px-[0.08em] pb-[0.13em]">
              <span className="hero-name-line text-outline block">Cordero</span>
            </span>
          </h1>

          <div className="hero-statement mt-5 flex max-w-4xl flex-wrap items-center justify-center gap-x-[0.22em] gap-y-2 font-display text-[clamp(1.35rem,3vw,2.35rem)] font-bold leading-[1.12] tracking-[-0.05em]">
            <span>Designing</span>
            <span className="inline-block rounded-[0.22em] bg-[#d9f2a1]/75 px-[0.22em] py-[0.08em]">
              Ideas
            </span>
            <span>Building useful</span>
            <span className="inline-block rounded-[0.22em] bg-[#d9f2a1]/75 px-[0.22em] py-[0.08em] text-[#72c600]">
              Solutions
            </span>
          </div>

          <div className="hero-copy mt-5 flex items-center gap-2 font-mono text-[0.67rem] font-bold uppercase tracking-[0.14em] text-black/55">
            <span className="text-black" aria-hidden="true">
              {'{'}
            </span>


            <span className="inline-block h-5 overflow-hidden">
              <span ref={role} className="block">
                {heroRoles[0]}
              </span>
            </span>
            <span className="text-black" aria-hidden="true">
              {'}'}
            </span>
          </div>

          <p className="hero-copy mt-5 max-w-2xl text-pretty text-base leading-7 text-black/60 sm:text-lg sm:leading-8">
            {personalInfo.shortBio}
          </p>

          <div className="hero-copy mt-8 flex items-center justify-center">
            <ButtonLink
              href="#projects"
              size="lg"
              magnetic
              icon={<ArrowUpRight className="relative z-10 size-4" />}
            >
              View projects
            </ButtonLink>
          </div>

          <div className="hero-copy mt-7 flex items-center gap-2">
            {socialLinks
              .filter((social) => social.icon !== 'mail')
              .map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target={social.url.startsWith('http') ? '_blank' : undefined}
                  rel={social.url.startsWith('http') ? 'noreferrer' : undefined}
                  className="grid size-9 place-items-center rounded-full border border-black/15 text-black/55 transition hover:-translate-y-1 hover:border-black hover:bg-black hover:text-[#9ef01a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ef01a]"
                  aria-label={social.name}
                >
                  <SocialIcon name={social.icon} className="size-3.5" />
                </a>
              ))}
            <a
              href={emailComposeUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-2 hidden items-center gap-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.13em] text-black/50 hover:text-black sm:inline-flex"
            >
              <Mail className="size-3.5" />
              Say hello
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="hero-copy absolute bottom-5 right-5 z-20 grid size-14 place-items-center rounded-full bg-black text-[#9ef01a] shadow-[0_12px_30px_rgba(0,0,0,0.2)] transition hover:scale-105 sm:bottom-7 sm:right-7"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="size-5" />
      </a>
    </section>
  );
};
