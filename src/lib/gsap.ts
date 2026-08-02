import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

// Register core plugins
gsap.registerPlugin(ScrollTrigger, Flip);

export { gsap };
