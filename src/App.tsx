import { useCallback, useEffect, useState } from 'react';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Hero } from './components/sections/Hero';
import { LoadingScreen } from './components/sections/LoadingScreen';
import { Projects } from './components/sections/Projects';
import { ScrollMarquee } from './components/sections/ScrollMarquee';
import { SchoolOrganizations } from './components/sections/SchoolOrganizations';
import { Skills } from './components/sections/Skills';
import { CursorGlow } from './components/ui/CursorGlow';
import { ScrollTrigger } from './utils/gsap';

const App = () => {
  const [isLoading, setIsLoading] = useState(
    () => !new URLSearchParams(window.location.search).has('skipIntro'),
  );
  const finishLoading = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    if (isLoading) return;

    let frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    const refresh = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh).catch(() => undefined);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('load', refresh);
    };
  }, [isLoading]);

  useEffect(() => {
    if (isLoading || !window.location.hash) return;

    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(window.location.hash.slice(1));
      target?.scrollIntoView({ block: 'start' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isLoading]);

  return (
    <div className="min-h-screen overflow-x-clip bg-canvas-light text-text-on-light">
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[120] -translate-y-20 bg-accent px-4 py-2 font-mono text-xs font-black uppercase tracking-wider text-text-on-dark transition focus:translate-y-0"
      >
        Skip to content
      </a>

      {isLoading && <LoadingScreen onComplete={finishLoading} />}
      <CursorGlow />
      <Navbar />

      <main id="main-content">
        <Hero />
        <ScrollMarquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <SchoolOrganizations />
      </main>

      <Footer />
    </div>
  );
};

export default App;
