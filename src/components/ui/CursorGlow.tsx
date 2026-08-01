import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../utils/gsap';

const CURSOR_CENTER = 24;
const BASE_SCALE = 1 / 3;
const HOVER_SCALE = 0.75;
const PRESSED_SCALE = 1;

export const CursorGlow = () => {
  const cursor = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLSpanElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const element = cursor.current;
      const dotElement = dot.current;
      if (!element || !dotElement || !contextSafe) return;

      const media = gsap.matchMedia();
      media.add(
        {
          desktop: '(min-width: 768px) and (pointer: fine)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { desktop, reduceMotion } = context.conditions as {
            desktop: boolean;
            reduceMotion: boolean;
          };

          if (!desktop || reduceMotion) {
            gsap.set(element, { autoAlpha: 0 });
            return;
          }

          gsap.set(element, {
            opacity: 0,
            visibility: 'visible',
            x: -CURSOR_CENTER,
            y: -CURSOR_CENTER,
          });
          gsap.set(dotElement, {
            scale: BASE_SCALE,
            transformOrigin: '50% 50%',
          });

          const xTo = gsap.quickTo(element, 'x', {
            duration: 0.22,
            ease: 'power3.out',
          });
          const yTo = gsap.quickTo(element, 'y', {
            duration: 0.22,
            ease: 'power3.out',
          });
          const visibilityTo = gsap.quickTo(element, 'opacity', {
            duration: 0.15,
            ease: 'power2.out',
          });
          const interactiveSelector = [
            'a[href]',
            'button:not(:disabled)',
            '[role="button"]:not([aria-disabled="true"])',
            'input:not(:disabled)',
            'textarea:not(:disabled)',
            'select:not(:disabled)',
            'label',
            '[data-cursor="interactive"]',
          ].join(',');
          let isInteractive = false;
          let isPressed = false;

          const hasInteractiveTarget = (target: EventTarget | null) =>
            target instanceof Element && Boolean(target.closest(interactiveSelector));
          const animateScale = (scale: number, duration = 0.28) => {
            gsap.to(dotElement, {
              scale,
              duration,
              ease: 'power3.out',
              overwrite: 'auto',
            });
          };

          const onMove = contextSafe((event: PointerEvent) => {
            visibilityTo(1);
            xTo(event.clientX - CURSOR_CENTER);
            yTo(event.clientY - CURSOR_CENTER);

            const nextInteractive = hasInteractiveTarget(event.target);
            if (nextInteractive !== isInteractive) {
              isInteractive = nextInteractive;
              if (!isPressed) {
                animateScale(isInteractive ? HOVER_SCALE : BASE_SCALE);
              }
            }
          });
          const onPointerDown = contextSafe((event: PointerEvent) => {
            if (!hasInteractiveTarget(event.target)) return;
            isPressed = true;
            animateScale(PRESSED_SCALE, 0.2);
          });
          const onPointerUp = contextSafe((event: PointerEvent) => {
            isPressed = false;
            isInteractive = hasInteractiveTarget(event.target);
            animateScale(
              isInteractive ? HOVER_SCALE : BASE_SCALE,
              0.24,
            );
          });
          const onLeave = contextSafe(() => {
            isInteractive = false;
            isPressed = false;
            visibilityTo(0);
            animateScale(BASE_SCALE, 0.2);
          });
          const onEnter = () => visibilityTo(1);

          window.addEventListener('pointermove', onMove, { passive: true });
          window.addEventListener('pointerdown', onPointerDown, {
            passive: true,
          });
          window.addEventListener('pointerup', onPointerUp, { passive: true });
          window.addEventListener('pointercancel', onPointerUp, {
            passive: true,
          });
          document.documentElement.addEventListener('mouseleave', onLeave);
          document.documentElement.addEventListener('mouseenter', onEnter);

          return () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('pointercancel', onPointerUp);
            document.documentElement.removeEventListener('mouseleave', onLeave);
            document.documentElement.removeEventListener('mouseenter', onEnter);
            gsap.killTweensOf(dotElement);
          };
        },
        element,
      );

      return () => media.revert();
    },
    { scope: cursor },
  );

  return (
    <div
      ref={cursor}
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden size-12 opacity-0 mix-blend-difference will-change-transform md:block"
      aria-hidden="true"
    >
      <span
        ref={dot}
        className="block size-full rounded-full bg-white"
      />
    </div>
  );
};
