import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

document.addEventListener("DOMContentLoaded", () => {
  const allPaths = gsap.utils.toArray(".st0");
  
  gsap.set(allPaths, {
    stroke: "#fff",
    strokeWidth: 1,
    fill: "transparent"
  });

  const tl = gsap.timeline();
  
  allPaths.forEach((path, i) => {
    tl.from(path, {
      drawSVG: "0%",
      duration: 2,
      ease: "power2.inOut"
    }, i * 0.2); 
    
    tl.to(path, {
      fill: "#fff",
      duration: 0.5,
      ease: "power1.out"
    }, `-=0.4`);
  });
});