import { useGSAP } from '@gsap/react';
import type { RefObject } from 'react';
import { gsap } from '../utils/gsap';

export const useMagnetic = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  enabled: boolean,
): void => {
  useGSAP(
    () => {
      const element = ref.current;
      if (
        !element ||
        !enabled ||
        window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return;
      }

      let removeListeners = () => {};
      const ctx = gsap.context(() => {
        const xTo = gsap.quickTo(element, 'x', {
          duration: 0.45,
          ease: 'power3.out',
        });
        const yTo = gsap.quickTo(element, 'y', {
          duration: 0.45,
          ease: 'power3.out',
        });

        const onMove = (event: PointerEvent) => {
          const bounds = element.getBoundingClientRect();
          xTo((event.clientX - bounds.left - bounds.width / 2) * 0.16);
          yTo((event.clientY - bounds.top - bounds.height / 2) * 0.16);
        };

        const onLeave = () => {
          xTo(0);
          yTo(0);
        };

        element.addEventListener('pointermove', onMove);
        element.addEventListener('pointerleave', onLeave);
        removeListeners = () => {
          element.removeEventListener('pointermove', onMove);
          element.removeEventListener('pointerleave', onLeave);
        };
      }, element);

      return () => {
        removeListeners();
        ctx.revert();
      };
    },
    { scope: ref, dependencies: [enabled], revertOnUpdate: true },
  );
};
