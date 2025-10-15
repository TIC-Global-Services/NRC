
/**
 * Reusable animation presets for consistent motion patterns
 */
export const AnimationPresets = {
  /**
   * Fade up from bottom
   */
  fadeUp: (el: gsap.TweenTarget, options = {}) => ({
    y: 50,
    opacity: 0,
    scrollTrigger: {
      trigger: el,
      start: "top 90%",
      toggleActions: "play none none reverse",
      ...options,
    },
  }),

  /**
   * Simple fade in
   */
  fadeIn: (el: gsap.TweenTarget, options = {}) => ({
    opacity: 0,
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
      toggleActions: "play none none reverse",
      ...options,
    },
  }),

  /**
   * Slide in from left
   */
  slideInLeft: (el: gsap.TweenTarget, options = {}) => ({
    x: -100,
    opacity: 0,
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none reverse",
      ...options,
    },
  }),

  /**
   * Slide in from right
   */
  slideInRight: (el: gsap.TweenTarget, options = {}) => ({
    x: 100,
    opacity: 0,
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none reverse",
      ...options,
    },
  }),

  /**
   * Scale in effect
   */
  scaleIn: (el: gsap.TweenTarget, options = {}) => ({
    scale: 0.8,
    opacity: 0,
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none reverse",
      ...options,
    },
  }),

  /**
   * Rotate in effect
   */
  rotateIn: (el: gsap.TweenTarget, options = {}) => ({
    rotation: -10,
    opacity: 0,
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none reverse",
      ...options,
    },
  }),

  /**
   * Blur in effect (requires CSS filter support)
   */
  blurIn: (el: gsap.TweenTarget, options = {}) => ({
    filter: "blur(10px)",
    opacity: 0,
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none reverse",
      ...options,
    },
  }),
};
