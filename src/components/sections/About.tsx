import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { MapPin, Trophy } from 'lucide-react';
import { personalInfo, stats } from '../../data/personal';
import { gsap } from '../../utils/gsap';

const specialties = [
  { title: 'WEB', description: 'Frontend Development' },
  { title: 'Mobile', description: 'Applications with Flutter' },
  { title: 'OPEN', description: 'Internships & projects' },
];

const featuredRecognition = [
  {
    category: 'Hackathon',
    badge: 'Award',
    title: 'University of the Philippines Visayas Komsai Hack',
    context: 'RiskReady Tech Solution for Disaster Readiness',
    placement: '1st Runner-Up & Most Innovative Hack',
    year: 'April 2026',
  },
  {
    category: 'Hackathon',
    badge: 'Award',
    title: 'Central Philippine University Computer Science Society',
    context: 'Tracktech: CSS Hackathon 2026',
    placement: 'Participating Group',
    year: 'January 2026',
  },
];

export const About = () => {
  const root = useRef<HTMLElement>(null);
  const portrait = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      const ctx = gsap.context(() => {
        const reduced = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches;
        if (reduced) return;

        gsap.fromTo(
          '.about-copy',
          { y: 34, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.about-content',
              start: 'top 80%',
              once: true,
            },
          },
        );

        gsap.fromTo(
          '.about-card',
          { y: 28, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.about-details',
              start: 'top 82%',
              once: true,
            },
          },
        );

        gsap.fromTo(
          '.recognition-card',
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.recognition-list',
              start: 'top 84%',
              once: true,
            },
          },
        );

        media.add(
          '(min-width: 768px) and (pointer: fine)',
          () => {
            if (!portrait.current) return;

            gsap.fromTo(
              portrait.current,
              { yPercent: -3 },
              {
                yPercent: 3,
                ease: 'none',
                scrollTrigger: {
                  trigger: portrait.current.parentElement,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.65,
                },
              },
            );
          },
          root.current ?? undefined,
        );
      }, root);

      return () => {
        media.revert();
        ctx.revert();
      };
    },
    { scope: root },
  );

  return (
    <section
      id="about"
      ref={root}
      className="relative scroll-mt-20 overflow-hidden border-y border-black/10 bg-[#f4f4eb] px-5 py-24 text-black sm:px-8 sm:py-32 lg:px-12"
      aria-labelledby="about-title"
    >
      <div
        className="pointer-events-none absolute -bottom-40 right-0 size-[38rem] rounded-full bg-[#9ef01a]/[0.045] blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[90rem]">
        <div className="about-copy flex items-center gap-3">
          <span className="size-1.5 rounded-full bg-[#72c600]" />
          <span className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.28em] text-black">
            01 — About Me
          </span>
          <span className="h-px flex-1 bg-black/10" />
        </div>

        <div className="about-content mt-20 grid items-start gap-14 lg:mt-24 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-20 xl:grid-cols-[440px_minmax(0,1fr)] xl:gap-28">
          <div className="relative mx-auto w-full max-w-[31rem] lg:sticky lg:top-28 lg:mx-0">
            <div className="relative">
              <div
                className="pointer-events-none absolute -left-2.5 -top-2.5 h-full w-full rounded-[4px] border border-[#9acb48]/45"
                aria-hidden="true"
              />

              <div className="portrait-frame group relative aspect-[4/5] overflow-hidden rounded-[4px] border border-black/[0.07] bg-black/[0.04]">
                <div
                  ref={portrait}
                  className="absolute inset-x-0 -top-[5%] h-[110%] md:will-change-transform"
                >
                  <div className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] md:will-change-transform motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                    <img
                      src={personalInfo.profileImage}
                      alt="Portrait of Adrian Cordero by the sea"
                      width="800"
                      height="1000"
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover object-[50%_58%] brightness-[1.04]"
                    />
                    <img
                      src={personalInfo.profileImage}
                      alt=""
                      width="800"
                      height="1000"
                      loading="lazy"
                      decoding="async"
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover object-[50%_58%] opacity-100 grayscale-[25%] brightness-[0.88] contrast-[1.06] transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-0 md:will-change-[opacity] motion-reduce:transition-none motion-reduce:group-hover:opacity-100"
                    />
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/10 transition-opacity duration-700 group-hover:opacity-75" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.16),transparent_38%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                <div
                  className="pointer-events-none absolute left-4 top-4 size-6 border-l border-t border-white/80"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute bottom-4 right-4 size-6 border-b border-r border-white/80"
                  aria-hidden="true"
                />

                <div className="absolute bottom-5 left-5 text-left text-white sm:bottom-6 sm:left-6">
                  <span className="block font-mono text-[0.56rem] font-bold uppercase tracking-[0.2em] text-white/55">
                    Name
                  </span>
                  <p className="mt-1 font-display text-sm font-black uppercase tracking-[0.08em] sm:text-base">
                    {personalInfo.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="about-copy mt-4 grid grid-cols-2 gap-3">
              <div className="border border-black/10 bg-white/35 p-4">
                <span className="font-mono text-[0.56rem] font-bold uppercase tracking-[0.18em] text-black/40">
                  Status
                </span>
                <div className="mt-2 flex items-center gap-2">
                  <span className="size-1.5 shrink-0 rounded-full bg-[#72c600]" />
                  <span className="text-xs font-bold text-black sm:text-sm">
                    Available for Work
                  </span>
                </div>
              </div>
              <div className="border border-black/10 bg-white/35 p-4">
                <span className="font-mono text-[0.56rem] font-bold uppercase tracking-[0.18em] text-black/40">
                  Location
                </span>
                <div className="mt-2 flex items-center gap-2">
                  <MapPin className="size-3.5 shrink-0 text-black/55" />
                  <span className="text-xs font-bold text-black sm:text-sm">
                    {personalInfo.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="about-details mt-3 grid grid-cols-3 gap-3">
              {specialties.map((specialty) => (
                <div
                  key={specialty.title}
                  className="about-card flex min-h-28 flex-col items-center justify-center border border-black/10 bg-white/25 px-2 py-4 text-center transition-colors duration-300 hover:border-black/25 hover:bg-[#9ef01a]/10 sm:min-h-32 sm:px-3"
                >
                  <strong className="font-display text-xl font-black tracking-[-0.04em] text-black sm:text-2xl">
                    {specialty.title}
                  </strong>
                  <span className="mt-2 max-w-24 font-mono text-[0.47rem] font-bold uppercase leading-[1.45] tracking-[0.12em] text-black/55 sm:text-[0.52rem]">
                    {specialty.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:pt-1">
            <p className="about-copy max-w-2xl font-mono text-[0.58rem] font-bold uppercase leading-5 tracking-[0.28em] text-black/35 sm:text-[0.64rem]">
              Based in {personalInfo.location} — open to internships,
              collaborations &amp; professional roles
            </p>

            <h2
              id="about-title"
              className="about-copy mt-7 font-display text-[clamp(3.2rem,5vw,4.9rem)] font-black leading-[0.92] tracking-[-0.065em] text-black"
            >
              Hi, I&apos;m
              <span className="mt-2 block">{personalInfo.name}</span>
            </h2>

            <p className="about-copy mt-5 max-w-3xl font-display text-[clamp(1.45rem,2.6vw,2.25rem)] font-medium leading-[1.08] tracking-[-0.035em] text-black/55">
              {personalInfo.title}
            </p>

            <p className="about-copy mt-9 max-w-3xl font-mono text-[0.57rem] font-bold uppercase leading-5 tracking-[0.22em] text-black/40 sm:text-[0.62rem]">
              Frontend development&nbsp; · &nbsp; Web Developer&nbsp;· &nbsp; UI/UX Designer&nbsp; · 
              &nbsp; AI Integration&nbsp; 
            </p>

            <div className="mt-10 max-w-3xl space-y-6 border-b border-black/10 pb-12">
              {personalInfo.longBio.map((paragraph) => (
                <p
                  key={paragraph}
                  className="about-copy text-base leading-8 text-black/55 sm:text-lg sm:leading-9"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-14 max-w-3xl sm:mt-16">
              <div className="about-copy mb-5 flex items-center gap-3">
                <span className="size-1.5 shrink-0 rounded-full bg-[#72c600]" />
                <h3 className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.22em] text-black/45 sm:text-[0.64rem]">
                  Featured Recognition
                </h3>
                <span className="h-px flex-1 bg-gradient-to-r from-black/10 to-transparent" />
                <span className="border border-black/10 bg-white/60 px-2.5 py-1 font-mono text-[0.55rem] font-bold uppercase tracking-[0.12em] text-black/40">
                  {featuredRecognition.length} Highlights
                </span>
              </div>

              <div className="recognition-list flex flex-col gap-3">
                {featuredRecognition.map((recognition, index) => (
                  <article
                    key={recognition.title}
                    className="recognition-card group relative overflow-hidden border border-black/10 bg-white/45 p-6 shadow-[0_4px_14px_rgba(0,0,0,0.025)] transition duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:bg-white/70 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] sm:p-7"
                  >
                    <span
                      className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-[#9ef01a]/15 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden="true"
                    />

                    <div className="relative z-10">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="border border-black/10 bg-white/80 px-2.5 py-1 font-mono text-[0.52rem] font-bold uppercase tracking-[0.16em] text-black/45">
                            {recognition.category}
                          </span>
                          <span className="bg-black px-2.5 py-1 font-mono text-[0.52rem] font-bold uppercase tracking-[0.16em] text-white">
                            {recognition.badge}
                          </span>
                        </div>
                        <span className="font-mono text-[0.65rem] font-bold tabular-nums text-black/35">
                          {recognition.year}
                        </span>
                      </div>

                      <div className="mt-6 flex items-start justify-between gap-5">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline gap-3">
                            <span className="border border-black/10 px-1.5 py-0.5 font-mono text-[0.55rem] font-bold tabular-nums text-black/25">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <h4 className="font-display text-2xl font-black leading-none tracking-[-0.04em] text-black sm:text-[1.8rem]">
                              {recognition.title}
                            </h4>
                          </div>
                          <p className="ml-8 mt-3 font-mono text-[0.64rem] font-bold uppercase leading-5 tracking-[0.12em] text-black/60 sm:text-[0.68rem]">
                            {recognition.context}
                          </p>
                          {recognition.placement && (
                            <p className="ml-8 mt-2 inline-flex bg-[#9ef01a] px-3 py-1.5 font-mono text-[0.6rem] font-black uppercase leading-4 tracking-[0.1em] text-black sm:text-[0.64rem]">
                              {recognition.placement}
                            </p>
                          )}
                        </div>

                        <span className="grid size-11 shrink-0 place-items-center rounded-full border border-black/10 bg-white/80 text-black/35 transition duration-300 group-hover:border-black/20 group-hover:bg-black group-hover:text-[#9ef01a]">
                          <Trophy className="size-4" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="about-details mt-20 grid grid-cols-2 overflow-hidden border-y border-black/15 bg-transparent sm:grid-cols-4 lg:mt-28">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="about-card relative px-5 py-7 text-center sm:px-7 sm:py-9"
            >
              {index > 0 && (
                <span className="absolute inset-y-0 left-0 w-px bg-black/15" />
              )}
              <strong className="font-display block text-4xl font-black tracking-[-0.05em] text-black sm:text-5xl">
                {stat.value}
              </strong>
              <span className="mt-2 block font-mono text-[0.6rem] uppercase tracking-[0.12em] text-black/45 sm:text-xs">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
