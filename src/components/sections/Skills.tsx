import {
  useRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type SVGProps,
} from 'react';
import { useGSAP } from '@gsap/react';
import { Antigravity, Codex, Cursor, Gemini } from '@lobehub/icons';
import { Code2 } from 'lucide-react';
import { FaCss3Alt, FaGithub, FaHtml5, FaJs, FaReact, FaPython,FaNodeJs, FaFlutter,FaDartLang} from 'react-icons/fa6';
import { SiTailwindcss, SiTypescript } from 'react-icons/si';
import { skillCategories } from '../../data/skills';
import { gsap } from '../../utils/gsap';

const NextJsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 128 128"
    fill="currentColor"
    focusable="false"
    {...props}
  >
    <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z" />
  </svg>
);

const SupabaseIcon = (props: ComponentPropsWithoutRef<'img'>) => (
  <img
    width="48"
    height="48"
    src="https://img.icons8.com/fluency/48/supabase.png"
    alt="supabase"
    {...props}
  />
);

const FirebaseIcon = (props: ComponentPropsWithoutRef<'img'>) => (
  <img
    width="100"
    height="100"
    src="https://img.icons8.com/?size=100&id=62452&format=png&color=000000"
    alt="firebase"
    {...props}
  />
);

const PostgreSqlIcon = (props: ComponentPropsWithoutRef<'img'>) => (
  <img
    width="100"
    height="100"
    src="https://img.icons8.com/?size=100&id=Pv4IGT0TSpt8&format=png&color=000000"
    alt="PostgreSQL"
    {...props}
  />
);

const MySqlIcon = (props: ComponentPropsWithoutRef<'img'>) => (
  <img
    width="100"
    height="100"
    src="https://img.icons8.com/?size=100&id=qGUfLiYi1bRN&format=png&color=000000"
    alt="MySQL"
    {...props}
  />
);

const GitIcon = (props: ComponentPropsWithoutRef<'img'>) => (
  <img
    width="100"
    height="100"
    src="https://img.icons8.com/?size=100&id=20906&format=png&color=000000"
    alt="Git"
    {...props}
  />
);

const VsCodeIcon = (props: ComponentPropsWithoutRef<'img'>) => (
  <img
    width="100"
    height="100"
    src="https://img.icons8.com/?size=100&id=9OGIyU8hrxW5&format=png&color=000000"
    alt="VS Code"
    {...props}
  />
);

const FigmaIcon = (props: ComponentPropsWithoutRef<'img'>) => (
  <img
    width="100"
    height="100"
    src="https://img.icons8.com/?size=100&id=zfHRZ6i1Wg0U&format=png&color=000000"
    alt="Figma"
    {...props}
  />
);

const VercelIcon = ({
  style,
  ...props
}: ComponentPropsWithoutRef<'img'>) => (
  <img
    width="100"
    height="100"
    src="https://img.icons8.com/?size=100&id=eXVvv0ElyhQy&format=png&color=000000"
    alt="Vercel"
    style={{ ...style, filter: 'brightness(0) invert(1)' }}
    {...props}
  />
);

const ClaudeIcon = (props: ComponentPropsWithoutRef<'img'>) => (
  <img
    width="100"
    height="100"
    src="https://img.icons8.com/?size=100&id=zQjzFjPpT2Ek&format=png&color=000000"
    alt="Claude"
    {...props}
  />
);

const skillIcons: Record<string, ElementType> = {
  html: FaHtml5,
  css: FaCss3Alt,
  javascript: FaJs,
  typescript: SiTypescript,
  react: FaReact,
  next: NextJsIcon,
  tailwind: SiTailwindcss,
  node: FaNodeJs,
  flutter: FaFlutter,
  dart: FaDartLang,
  python: FaPython,
  supabase: SupabaseIcon,
  firebase: FirebaseIcon,
  postgresql: PostgreSqlIcon,
  mysql: MySqlIcon,
  git: GitIcon,
  github: FaGithub,
  vscode: VsCodeIcon,
  figma: FigmaIcon,
  vercel: VercelIcon,
  codex: Codex.Color,
  claude: ClaudeIcon,
  gemini: Gemini.Color,
  antigravity: Antigravity.Color,
  cursor: Cursor,
};

export const Skills = () => {
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
          '.skill-group',
          { y: 42, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.skills-grid',
              start: 'top 82%',
              once: true,
            },
          },
        );

        gsap.fromTo(
          '.skill-chip',
          { scale: 0.94, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.45,
            stagger: { each: 0.025, from: 'start' },
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.skills-grid',
              start: 'top 74%',
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
      id="skills"
      ref={root}
      className="relative scroll-mt-20 overflow-hidden border-y border-white/10 bg-canvas-dark px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32"
      aria-labelledby="skills-title"
    >
      <div className="mx-auto max-w-[90rem]">
        <div className="mb-16 flex items-center gap-3 sm:mb-20">
          <span className="size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_14px_rgba(124,58,237,0.55)]" />
          <span className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.28em] text-text-muted-on-dark sm:text-[0.68rem]">
            02 — Tech Stack
          </span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid gap-16 lg:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)] lg:gap-20 xl:gap-28">
          <div className="skills-intro lg:sticky lg:top-28 lg:self-start">
          <h2
            id="skills-title"
            className="font-display text-[clamp(3.4rem,5.8vw,5.9rem)] font-black uppercase leading-[0.85] tracking-[-0.065em] text-text-on-dark"
          >
            <span className="block">Tech</span>
            <span className="block text-accent">Stack.</span>
          </h2>
          <p className="mt-10 max-w-sm text-sm leading-8 text-text-muted-on-dark sm:text-base">
            A growing collection of tools, frameworks, and technologies I use
            to design, build, and ship dependable digital products.
          </p>
          </div>

          <div className="skills-grid border-t border-white/10">
            {skillCategories.map((category) => {
              return (
                <article
                  key={category.id}
                  className="skill-group grid gap-8 border-b border-white/10 py-10 sm:grid-cols-[minmax(11rem,0.75fr)_minmax(0,1.25fr)] sm:py-12 lg:gap-10 xl:grid-cols-[minmax(13rem,0.72fr)_minmax(0,1.28fr)] xl:py-14"
                >
                <div>
                  <h3 className="font-display text-xl font-black uppercase leading-tight tracking-[-0.035em] text-text-on-dark sm:text-2xl">
                    {category.name}
                  </h3>
                  <p className="mt-3 max-w-[18rem] font-mono text-[0.625rem] font-medium uppercase leading-[1.7] tracking-[0.18em] text-text-muted-on-dark">
                    <span aria-hidden="true">// </span>
                    {category.description}
                  </p>
                </div>

                <div className="flex flex-wrap content-start gap-3 sm:pt-1">
                  {category.skills.map((skill) => {
                    const SkillIcon = skillIcons[skill.icon] ?? Code2;
                    return (
                      <span
                        key={skill.name}
                        className="skill-chip group/skill relative grid size-12 shrink-0 place-items-center rounded-lg border border-white/10 bg-surface-dark text-text-on-dark transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:bg-white/[0.035] focus-visible:-translate-y-1 focus-visible:border-accent/60 focus-visible:outline-none"
                        role="img"
                        aria-label={skill.name}
                        tabIndex={0}
                      >
                        <SkillIcon
                          className="size-5"
                          style={{ color: skill.color }}
                          aria-hidden="true"
                        />
                        <span
                          className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md border border-white/15 bg-surface-dark px-2.5 py-1.5 font-mono text-[0.625rem] font-bold uppercase tracking-[0.12em] text-text-on-dark opacity-0 shadow-xl transition duration-200 group-hover/skill:translate-y-0 group-hover/skill:opacity-100 group-focus-visible/skill:translate-y-0 group-focus-visible/skill:opacity-100"
                          aria-hidden="true"
                        >
                          {skill.name}
                        </span>
                      </span>
                    );
                  })}
                </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
