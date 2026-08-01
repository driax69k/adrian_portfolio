import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type UIEvent,
} from 'react';
import { useGSAP } from '@gsap/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Link2 } from 'lucide-react';
import { projects } from '../../data/projects';
import { gsap } from '../../utils/gsap';
import { ProjectModal } from '../projects/ProjectModal';

const projectSlides = [
  ...projects.map(({ id, title }) => ({ id, title })),
  { id: 'coming-soon', title: 'Coming Soon' },
];

export const Projects = () => {
  const root = useRef<HTMLElement>(null);
  const carousel = useRef<HTMLDivElement>(null);
  const projectCards = useRef<Array<HTMLElement | null>>([]);
  const scrollFrame = useRef<number | null>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const closeProject = useCallback(() => setSelectedProject(null), []);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      const introItems = gsap.utils.toArray<HTMLElement>(
        '.projects-intro > *',
      );
      const cards = gsap.utils.toArray<HTMLElement>('.project-card');

      if (reduced) {
        gsap.set([...introItems, ...cards, '.projects-kicker'], {
          autoAlpha: 1,
          x: 0,
          y: 0,
        });
        return;
      }

      gsap.fromTo(
        '.projects-kicker',
        { y: 12, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.projects-kicker',
            start: 'top 88%',
            once: true,
          },
        },
      );

      gsap.fromTo(
        introItems,
        { x: -42, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-carousel',
            start: 'top 82%',
            once: true,
          },
        },
      );

      gsap.fromTo(
        cards,
        { x: 52, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-carousel',
            start: 'top 82%',
            once: true,
          },
        },
      );
    },
    { scope: root },
  );

  useEffect(
    () => () => {
      if (scrollFrame.current !== null) {
        window.cancelAnimationFrame(scrollFrame.current);
      }
    },
    [],
  );

  const handleCarouselScroll = (event: UIEvent<HTMLDivElement>) => {
    const scroller = event.currentTarget;
    if (scrollFrame.current !== null) return;

    scrollFrame.current = window.requestAnimationFrame(() => {
      scrollFrame.current = null;

      const viewportCenter = scroller.scrollLeft + scroller.clientWidth / 2;
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      projectCards.current.forEach((card, index) => {
        if (!card) return;

        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distance = Math.abs(viewportCenter - cardCenter);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      setActiveProject((current) =>
        current === nearestIndex ? current : nearestIndex,
      );
    });
  };

  const scrollToProject = (index: number) => {
    const card = projectCards.current[index];
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    card?.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  const browseOtherProjects = () => {
    scrollToProject((activeProject + 1) % projectSlides.length);
  };

  const browsePreviousProject = () => {
    scrollToProject(
      (activeProject - 1 + projectSlides.length) % projectSlides.length,
    );
  };

  const showPreviousModalProject = () => {
    if (selectedProject === null) return;
    const previousIndex =
      (selectedProject - 1 + projects.length) % projects.length;
    setSelectedProject(previousIndex);
    scrollToProject(previousIndex);
  };

  const showNextModalProject = () => {
    if (selectedProject === null) return;
    const nextIndex = (selectedProject + 1) % projects.length;
    setSelectedProject(nextIndex);
    scrollToProject(nextIndex);
  };

  return (
    <>
      <section
      id="projects"
      ref={root}
      className="relative scroll-mt-20 overflow-hidden border-y border-white/10 bg-surface-dark py-20 text-text-on-dark sm:py-24"
      aria-labelledby="projects-title"
    >
      <h2 id="projects-title" className="sr-only">
        Selected projects
      </h2>

      <div className="projects-kicker mx-auto flex max-w-[90rem] items-center gap-4 px-5 sm:px-8 lg:px-12">
        <span className="size-2 shrink-0 rounded-full bg-accent shadow-[0_0_10px_rgba(124,58,237,0.8)]" />
        <span className="font-mono text-[0.625rem] font-black uppercase tracking-[0.26em] text-text-muted-on-dark sm:text-xs">
          03 — Projects
        </span>
        <span className="h-px flex-1 bg-white/[0.08]" />
      </div>

      <div className="projects-intro px-5 pb-12 pt-16 sm:px-8 lg:hidden">
        <p className="font-display text-[clamp(3.5rem,15vw,5.5rem)] font-black uppercase leading-[0.86] tracking-[-0.06em] text-text-on-dark">
          Crafted
          <br />
          <span className="text-accent">Works</span>
        </p>
        <p className="mt-6 max-w-sm text-sm leading-7 text-text-muted-on-dark sm:text-base">
          Transforming ideas into real-world applications through thoughtful
          design and dependable development.
        </p>
        <ArrowUpRight
          className="mt-6 size-14 text-accent"
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </div>

      <div
        id="projects-carousel"
        ref={carousel}
        className="projects-carousel overflow-x-auto overflow-y-visible scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={handleCarouselScroll}
      >
        <div className="flex w-max gap-5 px-5 pb-8 pt-2 sm:gap-8 sm:px-8 lg:gap-12 lg:px-12 lg:pt-6">
          <div className="projects-intro hidden h-[70vh] min-h-[36rem] max-h-[46rem] w-[40vw] min-w-[24rem] shrink-0 flex-col justify-center lg:flex lg:snap-start lg:pl-[clamp(3rem,5vw,6rem)]">
            <p className="font-display text-[clamp(4.5rem,6vw,7.5rem)] font-black uppercase leading-[0.86] tracking-[-0.065em] text-text-on-dark">
              Crafted
              <br />
              <span className="text-accent">Works</span>
            </p>
            <p className="mt-8 max-w-sm text-base leading-8 text-text-muted-on-dark xl:text-lg">
              Transforming ideas into real-world applications through
              thoughtful design and dependable development.
            </p>
            <ArrowUpRight
              className="mt-7 size-20 text-accent"
              strokeWidth={1.65}
              aria-hidden="true"
            />
          </div>

          {projects.map((project, index) => {
            const hasLiveUrl = Boolean(project.liveUrl);

            return (
              <article
                key={project.id}
                ref={(card) => {
                  projectCards.current[index] = card;
                }}
                id={`project-${project.id}`}
                data-project-index={index}
                className="project-card group relative flex h-[36rem] min-h-[32rem] w-[84vw] max-w-[54rem] shrink-0 snap-center flex-col overflow-hidden rounded-sm border border-white/15 bg-canvas-dark p-3 transition duration-500 hover:border-accent/45 hover:shadow-[0_0_40px_rgba(124,58,237,0.1)] sm:h-[40rem] sm:w-[70vw] sm:p-5 lg:h-[70vh] lg:min-h-[36rem] lg:max-h-[46rem] lg:w-[45vw] lg:min-w-[43rem] lg:snap-start"
              >
                <button
                  type="button"
                  onClick={() => setSelectedProject(index)}
                  className="absolute inset-0 z-20 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                  aria-label={`Open the ${project.title} project window`}
                  aria-describedby={`project-description-${project.id}`}
                />

                <div className="flex h-14 shrink-0 items-center justify-end px-2 sm:h-16 sm:px-3">
                  <span className="font-mono text-4xl font-light tracking-[0.16em] text-text-muted-on-dark/30 transition-colors duration-500 group-hover:text-text-muted-on-dark/60 sm:text-5xl">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                </div>

                <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden border border-white/10 bg-surface-dark px-5 py-8 text-center sm:px-8">
                  <div
                    className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px] opacity-50"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/10 bg-accent/[0.045] transition-transform duration-700 group-hover:scale-110 sm:size-80"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex max-w-md flex-col items-center">
                    <span className="grid size-12 place-items-center rounded-full border border-accent/35 bg-accent/10 text-accent sm:size-14">
                      <Link2 className="size-5 sm:size-6" aria-hidden="true" />
                    </span>
                    <p className="mt-5 font-mono text-[0.58rem] font-black uppercase tracking-[0.2em] text-accent-soft sm:text-[0.65rem]">
                      {hasLiveUrl
                        ? 'Live interactive project'
                        : 'Interactive preview by request'}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-text-muted-on-dark sm:text-base sm:leading-7">
                      {hasLiveUrl ? (
                        <>Open the live interactive version of this project.</>
                      ) : (
                        <>
                          Contact the developer for a live interactive link to{' '}
                          <span className="font-semibold text-text-on-dark">
                            “{project.title}”
                          </span>
                          .
                        </>
                      )}
                    </p>
                    <span className="mt-6 inline-flex min-h-11 items-center gap-2 border border-white/15 bg-white/[0.04] px-4 font-mono text-[0.62rem] font-black uppercase tracking-[0.12em] text-text-muted-on-dark transition group-hover:border-accent group-hover:bg-accent/10 group-hover:text-accent-soft">
                      View project
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>

                <div className="shrink-0 px-2 pb-1 pt-5 sm:px-3 sm:pb-2 sm:pt-6">
                  <div className="flex items-end justify-between gap-4 sm:gap-5">
                    <div className="min-w-0 flex-1">
                      <div className="mb-3 flex items-center gap-2.5">
                        <span className="size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_rgba(124,58,237,0.8)]" />
                        <span className="font-mono text-[0.6rem] font-black uppercase tracking-[0.18em] text-text-muted-on-dark sm:text-xs">
                          {project.category} application
                        </span>
                      </div>
                      <h3 className="font-display text-[clamp(1.65rem,7vw,3rem)] font-black uppercase leading-[0.92] tracking-[-0.045em] text-text-on-dark sm:text-4xl lg:text-5xl">
                        {project.title}
                      </h3>
                      <p id={`project-description-${project.id}`} className="sr-only">
                        {project.description}
                      </p>
                    </div>

                    <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/20 bg-white/[0.06] text-text-on-dark shadow-lg transition duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-text-on-dark sm:size-14">
                      <ArrowUpRight
                        className="size-5 transition-transform duration-300 group-hover:rotate-45 sm:size-6"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}

          <article
            ref={(card) => {
              projectCards.current[projects.length] = card;
            }}
            id="project-coming-soon"
            data-project-index={projects.length}
            className="project-card group relative flex h-[36rem] min-h-[32rem] w-[84vw] max-w-[54rem] shrink-0 snap-center items-center justify-center overflow-hidden rounded-sm border border-white/15 bg-canvas-dark p-3 transition duration-500 hover:border-accent/45 hover:shadow-[0_0_44px_rgba(124,58,237,0.12)] sm:h-[40rem] sm:w-[70vw] sm:p-5 lg:h-[70vh] lg:min-h-[36rem] lg:max-h-[46rem] lg:w-[45vw] lg:min-w-[43rem] lg:snap-start"
            aria-label="Coming Soon"
          >
            <div className="absolute inset-3 overflow-hidden border border-white/10 bg-surface-dark sm:inset-5">
              <div
                className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px] opacity-50"
                aria-hidden="true"
              />
              <div
                className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/15 bg-accent/[0.05] blur-[1px] transition duration-700 group-hover:scale-110 group-hover:bg-accent/[0.08] sm:size-96"
                aria-hidden="true"
              />
            </div>

            <p className="relative z-10 font-display text-[clamp(3.25rem,9vw,7.5rem)] font-black uppercase leading-[0.82] tracking-[-0.07em] text-accent drop-shadow-[0_0_24px_rgba(124,58,237,0.2)]">
              Coming Soon
            </p>
          </article>

          <div className="w-1 shrink-0 sm:w-4 lg:w-[6vw]" aria-hidden="true" />
        </div>
      </div>

      <div className="mx-auto mt-1 flex max-w-[90rem] items-center justify-center px-5 sm:px-8 lg:justify-between lg:px-12">
        <div className="flex items-center gap-5">
          <span
            className="font-mono text-[0.625rem] font-bold tracking-[0.16em] text-text-muted-on-dark sm:text-xs"
            aria-live="polite"
          >
            {(activeProject + 1).toString().padStart(2, '0')} /{' '}
            {projectSlides.length.toString().padStart(2, '0')}
          </span>
          <div className="flex items-center gap-2" aria-label="Choose a project">
            {projectSlides.map((project, index) => (
              <button
                key={project.id}
                type="button"
                onClick={() => scrollToProject(index)}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark ${
                  activeProject === index
                    ? 'w-8 bg-accent'
                    : 'w-2 bg-white/25 hover:bg-white/50'
                }`}
                aria-label={`Show ${project.title}`}
                aria-current={activeProject === index ? 'true' : undefined}
              />
            ))}
          </div>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={browsePreviousProject}
            className="group inline-flex min-h-12 items-center gap-3 border border-white/20 bg-white/[0.04] px-5 font-mono text-[0.68rem] font-black uppercase tracking-[0.12em] text-text-muted-on-dark transition-colors duration-300 hover:border-white hover:bg-white hover:text-text-on-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface-dark"
            aria-controls="projects-carousel"
            aria-label={`Browse previous project: ${projectSlides[(activeProject - 1 + projectSlides.length) % projectSlides.length].title}`}
          >
            <ArrowLeft
              className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            Previous project
          </button>

          <button
            type="button"
            onClick={browseOtherProjects}
            className="group inline-flex min-h-12 items-center gap-3 border border-accent/50 bg-accent px-5 font-mono text-[0.68rem] font-black uppercase tracking-[0.12em] text-text-on-dark transition-colors duration-300 hover:border-white hover:bg-white hover:text-text-on-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface-dark"
            aria-controls="projects-carousel"
            aria-label={`Browse next project: ${projectSlides[(activeProject + 1) % projectSlides.length].title}`}
          >
            Browse other projects
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
      </section>

      {selectedProject !== null ? (
        <ProjectModal
          project={projects[selectedProject]}
          onClose={closeProject}
          onPrevious={showPreviousModalProject}
          onNext={showNextModalProject}
        />
      ) : null}
    </>
  );
};
