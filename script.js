import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// homepage-lang-btn
const langButton = document.querySelectorAll(".lang-btn");

langButton.forEach((btn) => {
  btn.addEventListener("click", function () {
    document.querySelector(".lang-btn.active")?.classList.remove("active");
    this.classList.add("active");
  });
});

// storypage
const tl1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".story-section",
    scroller: ".scroll-container",
    start: "top center",
   toggleActions: "play none none reverse",
  },
  delay: 0.5
});

tl1
// 標題左右分開
  .to(".title-text", {
    xPercent: (index) => {
      return index === 0 ? -200 : 200;
    },
    opacity: 1,
    duration: 0.8,
    ease: "power2.out",
  })

//   照片浮現
  .from(
    ".kon-img",
    {
      scale: 0.1,
      opacity: 0,
      duration: 1.3,
      ease: "power3.out",
    },
    "-=0.5"
  )
  
//   跑馬燈浮現
  .to(".title-marquee", {
    opacity: 1,
    duration: 1, 
  }, "-=0.5") 
  // 跑馬燈開跑
  .to(".title-marquee", {
    xPercent: 100,   
    duration: 20,   
    repeat: -1,     
    ease: "none",   
  }, "<")
  .from(".introduce",{
    xPercent:400,
    stagger: 0.2,
    duration:1,
    ease: "power2.out"


  },"<");
