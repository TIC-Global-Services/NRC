import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";

// Track if plugins are already registered
let pluginsRegistered = false;

// Register plugins only once
if (typeof window !== "undefined" && !pluginsRegistered) {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Draggable);
  pluginsRegistered = true;
}

// Set global defaults for all animations
gsap.defaults({
  ease: "power3.out",
  duration: 1,
});

export { gsap, ScrollTrigger, ScrollToPlugin, Draggable };
