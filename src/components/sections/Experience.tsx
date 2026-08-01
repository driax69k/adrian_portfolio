import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import {
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  MapPin,
  Trophy,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { experiences } from '../../data/experience';
import type { ExperienceType } from '../../types';
import { gsap } from '../../utils/gsap';
import { Badge } from '../ui/Badge';
import { SectionHeading } from '../ui/SectionHeading';

const typeDetails: Record<
  ExperienceType,
  { label: string; icon: LucideIcon }
> = {
  education: { label: 'Education', icon: GraduationCap },
  project: { label: 'Project', icon: Code2 },
  hackathon: { label: 'Hackathon', icon: Trophy },
  organization: { label: 'Community', icon: Users },
  work: { label: 'Experience', icon: BriefcaseBusiness },
};

export const Experience = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        if (
          window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
          return;
        }

        gsap.fromTo(
          '.experience-line',
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top center',
            ease: 'none',
            scrollTrigger: {
              trigger: '.experience-list',
              start: 'top 80%',
              end: 'bottom 70%',
              scrub: 0.6,
            },
          },
        );

        gsap.fromTo(
          '.experience-item',
          { x: 28, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.experience-list',
              start: 'top 79%',
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
    <section
      id="experience"
      ref={root}
      className="relative scroll-mt-20 bg-canvas-light px-5 py-24 text-text-on-light sm:px-8 sm:py-32 lg:px-12"
      aria-labelledby="experience-title"
    >
      <div className="mx-auto grid max-w-[90rem] gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="04 — Journey"
            title="Learning by building, together."
            description="Education, team projects, hackathon work, and community involvement are shaping how I think and work as a developer."
          />
          <div className="mt-8 border border-text-on-light/15 bg-accent-soft p-5">
            <p className="font-mono text-[0.65rem] font-black uppercase tracking-[0.17em] text-text-on-light">
              Current direction
            </p>
            <p className="mt-3 text-sm leading-6 text-text-muted-on-light">
              Growing toward full-stack product development through hands-on
              projects, collaborative work, and deliberate practice.
            </p>
          </div>
        </div>

        <div className="experience-list relative">
          <div
            className="experience-line absolute bottom-5 left-[1.12rem] top-5 w-px bg-text-on-light/35 sm:left-[1.45rem]"
            aria-hidden="true"
          />
          <ol className="space-y-5">
            {experiences.map((experience) => {
              const details = typeDetails[experience.type];
              const Icon = details.icon;
              return (
                <li
                  key={experience.id}
                  className="experience-item relative pl-14 sm:pl-20"
                >
                  <div className="absolute left-0 top-6 z-10 grid size-9 place-items-center border border-text-on-light/20 bg-accent shadow-[0_0_0_6px_var(--color-canvas-light)] sm:size-12">
                    <Icon className="size-4 text-text-on-dark sm:size-5" />
                  </div>

                  <article className="border border-text-on-light/15 bg-white/30 p-5 transition duration-300 hover:border-accent/40 hover:bg-white/55 sm:p-7">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <Badge>{details.label}</Badge>
                        <h3 className="font-display mt-4 text-2xl font-black uppercase leading-none tracking-[-0.03em] text-text-on-light sm:text-3xl">
                          {experience.title}
                        </h3>
                        <p className="mt-2 font-mono text-[0.64rem] font-black uppercase tracking-[0.12em] text-text-muted-on-light">
                          {experience.organization}
                        </p>
                      </div>
                      <span className="shrink-0 font-mono text-xs text-text-muted-on-light">
                        {experience.period}
                      </span>
                    </div>

                    {experience.description ? (
                      <p className="mt-5 text-sm leading-7 text-text-muted-on-light">
                        {experience.description}
                      </p>
                    ) : null}

                    <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-text-on-light/10 pt-5">
                      <span className="mr-2 inline-flex items-center gap-1.5 text-xs text-text-muted-on-light">
                        <MapPin className="size-3.5" />
                        {experience.location}
                      </span>
                      {experience.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="border border-text-on-light/10 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wide text-text-muted-on-light"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};
