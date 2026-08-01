import { useEffect, useRef, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { useGSAP } from '@gsap/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Link2,
  Mail,
  X,
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { createEmailComposeUrl } from '../../data/personal';
import { projects } from '../../data/projects';
import type { Project } from '../../types';
import { gsap } from '../../utils/gsap';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const categoryLabels: Record<Project['category'], string> = {
  web: 'Web Application',
  mobile: 'Mobile Application',
  desktop: 'Desktop Application',
  ai: 'AI Application',
};

const getProjectContactHref = (projectTitle: string) => {
  const subject = `Live interactive link request: ${projectTitle}`;
  const body = `Hi Adrian,\n\nI'd like to request a live interactive link to “${projectTitle}”.`;

  return createEmailComposeUrl({ subject, body });
};

const DetailLabel = ({ children }: { children: string }) => (
  <span className="bg-black/[0.055] px-3 py-1.5 font-mono text-[0.625rem] font-black uppercase tracking-[0.14em] text-black/70 sm:text-xs">
    {children}
  </span>
);

export const ProjectModal = ({
  project,
  onClose,
  onPrevious,
  onNext,
}: ProjectModalProps) => {
  const root = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const scrollArea = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const projectIndex = projects.findIndex((item) => item.id === project.id);
  const previousProject =
    projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const categoryLabel = categoryLabels[project.category];
  const titleWords = project.title.split(' ');
  const outlinedWord = titleWords.at(-1) ?? project.title;
  const solidTitle = titleWords.slice(0, -1).join(' ');
  const contactHref = getProjectContactHref(project.title);
  const primaryUrl = project.liveUrl ?? contactHref;
  const hasLiveUrl = Boolean(project.liveUrl);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  useEffect(() => {
    scrollArea.current?.scrollTo({ top: 0, behavior: 'auto' });
  }, [project.id]);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (reduced) {
        gsap.set('.project-modal-backdrop, .project-modal-window', {
          autoAlpha: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      gsap.fromTo(
        '.project-modal-backdrop',
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.25, ease: 'power1.out' },
      );
      gsap.fromTo(
        '.project-modal-window',
        { y: 28, scale: 0.985, autoAlpha: 0 },
        {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 0.45,
          ease: 'power3.out',
        },
      );
    },
    { scope: root },
  );

  const trapFocus = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !dialog.current) return;

    const focusable = Array.from(
      dialog.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      ),
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return createPortal(
    <div
      ref={root}
      className="project-modal-backdrop fixed inset-0 z-[200] flex items-center justify-center bg-black/75 p-2 backdrop-blur-sm sm:p-5 lg:p-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        aria-describedby="project-modal-description"
        className="project-modal-window relative flex h-[min(94dvh,58rem)] w-full max-w-6xl flex-col overflow-hidden rounded-sm border border-white/20 bg-[#f4f4eb] text-black shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
        onKeyDown={trapFocus}
      >
        <div className="h-1 shrink-0 bg-[#9ef01a]" />
        <header className="z-20 flex shrink-0 items-center justify-between gap-3 border-b border-black/10 bg-[#f4f4eb]/95 px-4 py-3 backdrop-blur-xl sm:px-6 sm:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="truncate font-mono text-[0.58rem] font-black uppercase tracking-[0.13em] text-black/45 sm:text-xs sm:tracking-[0.18em]">
              {categoryLabel}
            </span>
            <span className="border-l border-black/20 pl-3 font-mono text-[0.58rem] font-black uppercase tracking-[0.13em] text-black/35 sm:text-xs sm:tracking-[0.18em]">
              {project.year}
            </span>
          </div>

          <button
            ref={closeButton}
            type="button"
            onClick={onClose}
            className="group inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border border-black/10 bg-white px-4 font-mono text-[0.58rem] font-black uppercase tracking-[0.09em] shadow-sm transition hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ef01a] sm:px-5 sm:text-xs"
          >
            <ArrowLeft
              className="size-4 transition-transform group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            <span className="hidden sm:inline">Back to projects</span>
            <span className="sm:hidden">Back</span>
            <X className="hidden size-3.5 sm:block" aria-hidden="true" />
          </button>
        </header>

        <div ref={scrollArea} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <section className="mx-auto flex max-w-5xl flex-col items-center px-5 pb-10 pt-12 text-center sm:px-8 sm:pb-12 sm:pt-16 lg:px-10">
            <p className="mb-5 font-mono text-[0.625rem] font-black uppercase tracking-[0.24em] text-black/40 sm:text-xs">
              Project case study
            </p>
            <h1
              id="project-modal-title"
              className="font-display text-[clamp(3rem,8vw,7rem)] font-black uppercase leading-[0.85] tracking-[-0.065em] text-black"
            >
              {solidTitle ? `${solidTitle} ` : null}
              <span className="text-outline">{outlinedWord}</span>
            </h1>
            <p
              id="project-modal-description"
              className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-black/55 sm:text-lg sm:leading-8"
            >
              {project.description}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={primaryUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-12 items-center gap-2 bg-[#9ef01a] px-6 font-mono text-[0.65rem] font-black uppercase tracking-[0.12em] text-black transition hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 sm:px-8"
              >
                {hasLiveUrl ? (
                  <Link2 className="size-4" aria-hidden="true" />
                ) : (
                  <Mail className="size-4" aria-hidden="true" />
                )}
                {hasLiveUrl ? 'View live project' : 'Request live access'}
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>

              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 border border-black/15 bg-black/[0.035] px-6 font-mono text-[0.65rem] font-black uppercase tracking-[0.12em] text-black/70 transition hover:border-black hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 sm:px-8"
                >
                  <FaGithub className="size-4" aria-hidden="true" />
                  Repository
                </a>
              ) : null}
            </div>
          </section>

          <section className="px-4 pb-14 sm:px-8 sm:pb-16 lg:px-10">
            <div className="mx-auto max-w-5xl border border-black/10 bg-white p-2 shadow-[0_18px_60px_rgba(0,0,0,0.06)] sm:p-3">
              <div className="relative flex aspect-video items-center justify-center overflow-hidden border border-black/[0.07] bg-[#101010] px-5 py-8 text-center text-white">
                <div
                  className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:36px_36px]"
                  aria-hidden="true"
                />
                <div
                  className="absolute left-1/2 top-1/2 size-[min(60vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#9ef01a]/20 bg-[#9ef01a]/[0.045]"
                  aria-hidden="true"
                />

                <div className="relative z-10 flex max-w-xl flex-col items-center">
                  <span className="grid size-11 place-items-center rounded-full border border-[#9ef01a]/35 bg-[#9ef01a]/10 text-[#9ef01a] sm:size-14">
                    <Link2 className="size-5 sm:size-6" aria-hidden="true" />
                  </span>
                  <p className="mt-4 font-mono text-[0.56rem] font-black uppercase tracking-[0.18em] text-[#9ef01a] sm:mt-5 sm:text-xs">
                    Interactive project access
                  </p>
                  <h2 className="font-display mt-2 text-xl font-black uppercase tracking-[-0.04em] sm:mt-3 sm:text-4xl">
                    Experience {project.title}
                  </h2>
                  <p className="mt-2 hidden max-w-lg text-sm leading-6 text-white/50 sm:block sm:text-base sm:leading-7">
                    No public preview is included here. Contact the developer
                    for a live interactive link tailored to this project.
                  </p>
                  <a
                    href={contactHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex min-h-10 items-center gap-2 border border-white/15 bg-white/[0.05] px-4 font-mono text-[0.58rem] font-black uppercase tracking-[0.1em] text-white/75 transition hover:border-[#9ef01a] hover:text-[#9ef01a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ef01a] sm:mt-6 sm:min-h-11 sm:px-5 sm:text-[0.62rem] sm:tracking-[0.12em]"
                  >
                    Contact developer
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8 lg:px-10">
            <div className="grid gap-12 border-t border-black/10 pt-12 md:grid-cols-2 lg:gap-20 lg:pt-14">
              <div>
                <h2 className="mb-6 flex items-center gap-3 font-mono text-xs font-black uppercase tracking-[0.16em] text-black/40">
                  <span className="h-px w-6 bg-black/20" />
                  Key features
                </h2>
                <ul className="space-y-4 text-sm leading-7 text-black/70 sm:text-base">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex gap-4">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[#78c800]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="mb-6 flex items-center gap-3 font-mono text-xs font-black uppercase tracking-[0.16em] text-black/40">
                  <span className="h-px w-6 bg-black/20" />
                  Outcome &amp; impact
                </h2>
                <ul className="space-y-4 text-sm leading-7 text-black/70 sm:text-base">
                  {project.impact.map((outcome) => (
                    <li key={outcome} className="flex gap-4">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[#78c800]" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 border-t border-black/10 pt-10 lg:mt-14 lg:pt-12">
              <h2 className="mb-6 flex items-center gap-3 font-mono text-xs font-black uppercase tracking-[0.16em] text-black/40">
                <span className="h-px w-6 bg-black/20" />
                Technology stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <DetailLabel key={technology}>{technology}</DetailLabel>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-[#0b0b0b] px-5 py-8 text-white sm:px-8 sm:py-10 lg:px-10">
            <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={onPrevious}
                className="group flex min-h-24 items-center gap-4 border border-white/15 px-5 text-left transition hover:border-[#9ef01a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ef01a]"
                aria-label={`Show previous project: ${previousProject.title}`}
              >
                <ArrowLeft
                  className="size-5 shrink-0 transition-transform group-hover:-translate-x-1"
                  aria-hidden="true"
                />
                <span>
                  <span className="font-mono text-[0.58rem] font-black uppercase tracking-[0.16em] text-[#9ef01a]">
                    Previous project
                  </span>
                  <span className="font-display mt-1 block text-xl font-black uppercase leading-none tracking-[-0.04em] sm:text-2xl">
                    {previousProject.title}
                  </span>
                </span>
              </button>

              <button
                type="button"
                onClick={onNext}
                className="group flex min-h-24 items-center justify-between gap-4 border border-white/15 px-5 text-left transition hover:border-[#9ef01a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ef01a]"
                aria-label={`Show next project: ${nextProject.title}`}
              >
                <span>
                  <span className="font-mono text-[0.58rem] font-black uppercase tracking-[0.16em] text-[#9ef01a]">
                    Next project
                  </span>
                  <span className="font-display mt-1 block text-xl font-black uppercase leading-none tracking-[-0.04em] sm:text-2xl">
                    {nextProject.title}
                  </span>
                </span>
                <ArrowRight
                  className="size-5 shrink-0 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>,
    document.body,
  );
};
