import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { Building2, MapPin, UsersRound } from 'lucide-react';
import { schoolOrganizations } from '../../data/organizations';
import { gsap, prefersReducedMotion } from '../../utils/gsap';
import { Badge } from '../ui/Badge';
import { SectionHeading } from '../ui/SectionHeading';

export const SchoolOrganizations = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        return;
      }

      gsap.fromTo(
        '.organization-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: '.organization-list',
            start: 'top 80%',
            end: 'bottom 70%',
            scrub: 0.6,
          },
        },
      );

      gsap.fromTo(
        '.organization-item',
        { x: 28, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.organization-list',
            start: 'top 79%',
            once: true,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      id="organizations"
      ref={root}
      className="relative scroll-mt-20 overflow-hidden border-y border-text-on-light/10 bg-accent-soft px-5 py-24 text-text-on-light sm:px-8 sm:py-32 lg:px-12"
      aria-labelledby="organizations-title"
    >
      <div
        className="pointer-events-none absolute -right-40 top-1/2 size-[34rem] -translate-y-1/2 rounded-full border border-text-on-light/[0.055]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/2 size-[24rem] -translate-y-1/2 rounded-full border border-text-on-light/[0.055]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-[90rem] gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="05 — School Organizations"
            title="Growing through campus communities."
            description="The organizations, leadership roles, and collaborative spaces that support my growth beyond the classroom."
          />

          <div className="mt-8 border border-text-on-light/15 bg-white/25 p-5">
            <p className="font-mono text-[0.65rem] font-black uppercase tracking-[0.17em] text-text-on-light">
              Community involvement
            </p>
            <p className="mt-3 text-sm leading-6 text-text-muted-on-light">
              Learning to contribute, communicate, and grow alongside students
              who share the same drive to build and help others.
            </p>
          </div>
        </div>

        {schoolOrganizations.length > 0 ? (
          <div className="organization-list relative">
            <div
              className="organization-line absolute bottom-5 left-[1.12rem] top-5 w-px bg-text-on-light/35 sm:left-[1.45rem]"
              aria-hidden="true"
            />

            <ol className="space-y-5">
              {schoolOrganizations.map((organization) => (
                <li
                  key={organization.id}
                  className="organization-item relative pl-14 sm:pl-20"
                >
                  <div className="absolute left-0 top-6 z-10 grid size-9 place-items-center overflow-hidden border border-text-on-light/20 bg-white shadow-[0_0_0_6px_var(--color-accent-soft)] sm:size-12">
                    {organization.logo ? (
                      <img
                        src={organization.logo}
                        alt={`${organization.name} logo`}
                        width="48"
                        height="48"
                        loading="lazy"
                        decoding="async"
                        className="size-full object-contain"
                      />
                    ) : (
                      <Building2 className="size-4 text-text-on-light sm:size-5" aria-hidden="true" />
                    )}
                  </div>

                  <article className="border border-text-on-light/15 bg-white/30 p-5 transition duration-300 hover:border-accent/40 hover:bg-white/55 sm:p-7">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <Badge>School Organization</Badge>
                        <h3 className="mt-4 font-display text-2xl font-black uppercase leading-none tracking-[-0.03em] text-text-on-light sm:text-3xl">
                          {organization.name}
                        </h3>
                        {organization.role ? (
                          <p className="mt-2 font-mono text-[0.64rem] font-black uppercase tracking-[0.12em] text-text-muted-on-light">
                            {organization.role}
                          </p>
                        ) : null}
                      </div>

                      {organization.period ? (
                        <span className="shrink-0 font-mono text-xs capitalize text-text-muted-on-light">
                          {organization.period}
                        </span>
                      ) : null}
                    </div>

                    {organization.description ? (
                      <p className="mt-5 max-w-2xl text-sm leading-7 text-text-muted-on-light sm:text-base">
                        {organization.description}
                      </p>
                    ) : null}

                    {organization.location || organization.activities?.length ? (
                      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-text-on-light/10 pt-5">
                        {organization.location ? (
                          <span className="mr-2 inline-flex items-center gap-1.5 text-xs text-text-muted-on-light">
                            <MapPin className="size-3.5" aria-hidden="true" />
                            {organization.location}
                          </span>
                        ) : null}

                        {organization.activities?.map((activity) => (
                          <span
                            key={activity}
                            className="border border-text-on-light/10 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wide text-text-muted-on-light"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </article>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <div className="grid min-h-80 place-items-center border border-dashed border-text-on-light/25 bg-white/25 p-8 text-center">
            <div className="flex max-w-sm flex-col items-center">
              <span className="grid size-14 place-items-center rounded-full border border-text-on-light/15 bg-white/45">
                <UsersRound className="size-5" aria-hidden="true" />
              </span>
              <p className="mt-6 font-display text-2xl font-black uppercase tracking-[-0.04em]">
                Organization details coming soon
              </p>
              <p className="mt-3 text-sm leading-6 text-text-muted-on-light">
                Official school organization names and roles will be added
                here.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
