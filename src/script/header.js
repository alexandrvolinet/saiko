import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const loaderLogo = loader.querySelector(".loader__logo");

  const showLoader = gsap.timeline();

  showLoader
    .to(loaderLogo, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    })
    .to(loaderLogo, {
      y: -10,
      repeat: 3,
      yoyo: true,
      duration: 0.3,
      ease: "sine.inOut",
    })
    .to(loader, {
      autoAlpha: 0,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        loader.style.display = "none";
        animateHeader();
      },
    });

  function animateHeader() {
    const allPaths = gsap.utils.toArray(".st0");
    const line = document.querySelector(".nav__line");
    const leftItems = gsap.utils.toArray(".nav__left div");
    const rightItems = gsap.utils.toArray(".nav__right div");
    const logo = document.querySelector(".nav__logo svg");
    const burger = document.querySelector(".nav__burger");

    gsap.set("header", {
      visibility: "visible",
      opacity: 1,
    });

    gsap.set(allPaths, {
      stroke: "#fff",
      strokeWidth: 1,
      fill: "transparent",
    });

    gsap.set(leftItems, { x: -40, opacity: 0 });
    gsap.set(rightItems, { x: 40, opacity: 0 });
    gsap.set(burger, { autoAlpha: 0, x: 20 });

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(
      ".nav__line",
      { y: -100 },
      {
        y: 0,
        duration: 0.5,
        ease: "bounce.out",
      }
    );

    tl.to(line, {
      scaleX: 1,
      duration: 0.8,
      ease: "elastic.out(0.8, 0.8)",
    });

    allPaths.forEach((path) => {
      tl.from(
        path,
        {
          drawSVG: "0%",
          duration: 0.5,
          ease: "power2.inOut",
        },
        "-=0.3"
      );

      tl.to(
        path,
        {
          fill: "#fff",
          duration: 0.5,
          ease: "power1.out",
        },
        ">-0.5"
      );
    });

    tl.add("menuStart", "-=0.5");

    tl.to(
      leftItems,
      {
        x: 0,
        opacity: 1,
        duration: 0.3,
        stagger: 0.1,
      },
      "menuStart"
    );

    tl.to(
      rightItems,
      {
        x: 0,
        opacity: 1,
        duration: 0.3,
        stagger: 0.1,
      },
      "menuStart"
    );

    // ScrollTrigger
    ScrollTrigger.create({
      trigger: "#header-trigger",
      start: "top bottom",
      onEnter: () => {
        gsap.to(leftItems, {
          x: -40,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.in",
        });

        gsap.to(rightItems, {
          x: 40,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.in",
        });

        gsap.to(logo, {
          width: 24,
          duration: 0.4,
          ease: "power3.inOut",
        });
      },
      onLeaveBack: () => {
        gsap.to(leftItems, {
          x: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
        });

        gsap.to(rightItems, {
          x: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
        });

        gsap.to(logo, {
          width: 40,
          duration: 0.4,
          ease: "power3.inOut",
        });
      },
    });
  }
});
