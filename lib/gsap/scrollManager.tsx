import { ScrollTrigger } from "@/lib/gsap/gsapSetup";

/**
 * Centralized ScrollTrigger management utilities
 */
export const ScrollManager = {
  /**
   * Refresh all ScrollTriggers (useful after layout changes)
   * @param hard - If true, recalculates start/end values
   */
  refresh(hard = true) {
    ScrollTrigger.refresh(hard);
  },

  /**
   * Kill all active ScrollTriggers (useful on route changes)
   */
  killAll() {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  },

  /**
   * Get count of active ScrollTriggers (useful for debugging)
   */
  getCount() {
    return ScrollTrigger.getAll().length;
  },

  /**
   * Kill a specific ScrollTrigger instance
   */
  kill(trigger: ScrollTrigger) {
    trigger?.kill();
  },

  /**
   * Get all ScrollTrigger instances
   */
  getAll() {
    return ScrollTrigger.getAll();
  },

  /**
   * Disable all ScrollTriggers temporarily
   */
  disable() {
    ScrollTrigger.getAll().forEach((trigger) => trigger.disable());
  },

  /**
   * Enable all ScrollTriggers
   */
  enable() {
    ScrollTrigger.getAll().forEach((trigger) => trigger.enable());
  },

  /**
   * Create a batch of ScrollTriggers for multiple elements
   * Reduces number of triggers for better performance
   */
  batch(targets: string | Element[], options: ScrollTrigger.BatchVars) {
    return ScrollTrigger.batch(targets, options);
  },
};
