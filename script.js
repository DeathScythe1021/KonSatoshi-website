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
    start: "top top",
    end: "+=2000",
   toggleActions: "play none none none",
   scrub:2,
   pin:true
  },
  delay: 0.8
});

// 跑馬燈
const marquee = gsap.to(".title-marquee", {
  xPercent: 100,   
  duration: 20,     
  repeat: -1,      
  ease: "none",   
  paused: true     
});

// 文字介紹效果
const introduce = gsap.from(".introduce",{
    xPercent:400,
    stagger: 0.15,
    duration:0.5,
    ease: "power3.out",
    delay:0.5,
    paused:true
  });

tl1
// 標題左右分開
  .to(".title-text", {
    xPercent: (index) => {
      return index === 0 ? -200 : 200;
    },
    opacity: 1,
    duration: 0.8,
    delay:0.2,
    ease: "power2.out",
  })

//   照片浮現
  .from(
    ".kon-img",
    {
      scale: 0.1,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    },
    "-=0.5"
  )

  // 跑馬燈開跑
  .to(".title-marquee", {
    opacity: 1,
    duration: 0.1,
    
    onStart: () => {
      marquee.play(); 
    },
  }, "<")

  // 介紹文字開跑
  .from(".introduce-text",{
    onStart:()=>{
      introduce.play();
    },
    onReverseComplete: () => {
      introduce.reverse();
    }
  },"+=0.1")
  // 留白（不會馬上滑到下一頁）
  .to({}, { duration: 1 });
  ;


  // story-page下半部
  const tl2 = gsap.timeline({
    scrollTrigger:{
      trigger:".story-bottom-section",
      start:"top 50%",
      toggleActions: "play none none reverse",
      scrub:1
    },
    
  });
// 時間軸
  tl2
  .from(".story-text",{
  
    stagger:1,
    duration:1,
    y: 150,
    
    ease:"power3.out"
  });

  // high-light單獨拉出來做
  const highLight = document.querySelectorAll(".high-light");
  highLight.forEach((element)=>{
    gsap.to(element,{
      backgroundSize: "100% 100%",
      duration: 0.3,
      delay:0.1,               
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 95%",          
        toggleActions: "play none none reverse",
        markers: true
      }
    });
  });

 

