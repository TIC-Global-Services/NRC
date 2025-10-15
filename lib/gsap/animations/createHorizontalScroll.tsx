import { gsap } from "@/lib/gsap/gsapSetup";

export interface HorizontalScrollConfig {
  trigger: Element;
  target: Element;
  pin?: boolean;
  scrub?: number | boolean;
  start?: string;
  end?: string | (() => string);
  anticipatePin?: number;
  invalidateOnRefresh?: boolean;
  onUpdate?: (progress: number) => void;
  markers?: boolean;
}

/**
 * Create a horizontal scroll animation
 * @param config - Configuration object
 * @returns ScrollTrigger instance
 */
export function createHorizontalScroll(config: HorizontalScrollConfig) {
  const {
    trigger,
    target,
    pin = true,
    scrub = 1,
    start = "top top",
    anticipatePin = 1,
    invalidateOnRefresh = true,
    onUpdate,
    markers = false,
  } = config;

  const getScrollAmount = () => {
    const targetElement = target as HTMLElement;
    return -(targetElement.scrollWidth - window.innerWidth);
  };

  const tl = gsap.to(target, {
    x: getScrollAmount,
    ease: "none",
    scrollTrigger: {
      trigger,
      pin,
      start,
      end: config.end || (() => `+=${Math.abs(getScrollAmount())}`),
      scrub,
      invalidateOnRefresh,
      anticipatePin,
      markers,
      onUpdate: (self) => {
        onUpdate?.(self.progress);
      },
    },
  });

  return tl.scrollTrigger;
}
