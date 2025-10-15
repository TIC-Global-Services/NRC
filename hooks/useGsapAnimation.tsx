import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/gsapSetup";

/**
 * Hook for GSAP animations with automatic cleanup
 * @param animationFn - Function that receives gsap.Context and optionally returns cleanup function
 * @param deps - Dependency array to re-run animation
 * @returns ref - React ref to attach to the container element
 */
export function useGsapAnimation(
  animationFn: (ctx: gsap.Context) => void | (() => void),
  deps: any[] = []
) {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    // Create GSAP context scoped to ref element
    const ctx = gsap.context((self) => {
      // Pass the context to the animation function
      const cleanup = animationFn(self);
      return cleanup;
    }, ref);

    // Automatic cleanup on unmount or deps change
    return () => ctx.revert();
  }, deps);

  return ref;
}
