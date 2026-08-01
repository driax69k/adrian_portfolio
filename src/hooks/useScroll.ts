import { useEffect, useState } from 'react';

export const useActiveSection = (sectionIds: string[]): string => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? 'home');
  const sectionKey = sectionIds.join('|');

  useEffect(() => {
    const ids = sectionKey.split('|').filter(Boolean);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    let frame = 0;
    let disposed = false;

    const updateActiveSection = () => {
      frame = 0;

      // Keep the activation line below the fixed navigation on every viewport.
      const activationLine = Math.min(
        Math.max(window.innerHeight * 0.24, 96),
        220,
      );
      const pageBottom = window.scrollY + window.innerHeight;
      const documentBottom = document.documentElement.scrollHeight;
      let nextSection = sections[0].id;

      if (pageBottom >= documentBottom - 2) {
        nextSection = sections.at(-1)?.id ?? nextSection;
      } else {
        for (const section of sections) {
          if (section.getBoundingClientRect().top > activationLine) break;
          nextSection = section.id;
        }
      }

      setActiveSection((current) =>
        current === nextSection ? current : nextSection,
      );
    };

    const scheduleUpdate = () => {
      if (disposed || frame !== 0) return;
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('load', scheduleUpdate);
    document.fonts?.ready.then(scheduleUpdate).catch(() => undefined);

    return () => {
      disposed = true;
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('load', scheduleUpdate);
    };
  }, [sectionKey]);

  return activeSection;
};

export const scrollToSection = (href: string): void => {
  const target = document.querySelector(href);
  target?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth',
    block: 'start',
  });
};
