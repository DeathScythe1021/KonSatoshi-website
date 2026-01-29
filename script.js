import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from 'split-type';
gsap.registerPlugin(ScrollTrigger);

//#region homepage-lang-btn
const langButton = document.querySelectorAll(".lang-btn");

langButton.forEach((btn) => {
  btn.addEventListener("click", function () {
    document.querySelector(".lang-btn.active")?.classList.remove("active");
    this.classList.add("active");
  });
});
// #endregion

// #region story-page-section
const tl1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".story-section",
    start: "top top",
    end: "+=2000",
    toggleActions: "play none none none",
    scrub: 2,
    pin: true,
  },
  delay: 0.8,
});

// 跑馬燈
const marquee = gsap.to(".title-marquee", {
  xPercent: 100,
  duration: 20,
  repeat: -1,
  ease: "none",
  paused: true,
});

// 文字介紹效果
const introduce = gsap.from(".introduce", {
  xPercent: 400,
  stagger: 0.15,
  duration: 0.5,
  ease: "power3.out",
  delay: 0.5,
  paused: true,
});

tl1
  // 標題左右分開
  .to(".title-text", {
    xPercent: (index) => {
      return index === 0 ? -200 : 200;
    },
    opacity: 1,
    duration: 0.8,
    delay: 0.2,
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
    "-=0.5",
  )

  // 跑馬燈開跑
  .to(
    ".title-marquee",
    {
      opacity: 1,
      duration: 0.1,

      onStart: () => {
        marquee.play();
      },
    },
    "<",
  )

  // 介紹文字開跑
  .from(
    ".introduce-text",
    {
      onStart: () => {
        introduce.play();
      },
      onReverseComplete: () => {
        introduce.reverse();
      },
    },
    "+=0.1",
  )
  // 留白（不會馬上滑到下一頁）
  .to({}, { duration: 1 });
// #endregion

// #region story-bottom-section

// 針對每一個 story-bottom-section 獨立製作動畫
gsap.utils.toArray(".story-bottom-section").forEach((section) => {
  // 限制範圍：只抓「這個 Section」裡面的東西
  const text = section.querySelector(".story-text");
  const topImgs = section.querySelectorAll(".float-top");
  const bottomImgs = section.querySelectorAll(".float-bottom");

  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 90%",
      end: "bottom 20%",

      markers: true,
    },
  });

  // 浮動效果
  const wave1 = gsap.to(topImgs, {
    yPercent: 40,
    duration: 2,
    yoyo: true,
    repeat: -1,
    paused: true,
    ease: "power1.inOut",
  });
  const wave2 = gsap.to(bottomImgs, {
    yPercent: -40,
    duration: 2,
    yoyo: true,
    repeat: -1,
    paused: true,
    ease: "power1.inOut",
  });
  // 文字+圖片動畫時間軸
  tl2
    .from(text, {
      y: 200,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })

    .from(
      topImgs,
      {
        y: -400,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
        onComplete: () => wave1.play(),
        onReverseComplete: () => {
          wave1.pause();
          wave1.progress(0);
        },
      },

      "<",
    )

    .from(
      bottomImgs,
      {
        y: 400,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
        onComplete: () => wave2.play(),
        onReverseComplete: () => {
          wave2.pause();
          wave2.progress(0);
        },
      },
      "<",
    );
});
// 文字+圖片動畫時間軸
const highLight = document.querySelectorAll(".high-light");
highLight.forEach((element) => {
  gsap.to(element, {
    backgroundSize: "100% 100%",
    duration: 0.3,
    delay: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 100%",
      toggleActions: "play none none reverse",
      markers: true,
    },
  });
});

// 文字變色特效
const text = new SplitType('.story-text', { types: 'chars' });

text.chars.forEach((char) => {
  
  // 當滑鼠「碰到」單個字元時
  char.addEventListener('mouseenter', () => {
    gsap.to(char, {
      color: "#e9f5f5",
      duration: 0.2,
      overwrite: true
    });
  });

  char.addEventListener('mouseleave', () => {
  // 直接根據是否有 .high-light 類別來決定回歸哪種 CSS 變數
  const isHighLight = char.closest('.high-light');
  
  gsap.to(char, {
    color: isHighLight ? "#212529" : "#d73b35",
    duration: 0.5,
    overwrite: true
  });
});
});
// #endregion

// #region cursor-dot
const dot = document.querySelector(".cursor-dot");
const path = document.querySelector(".trail-path");
const svgContainer = document.querySelector(".cursor-trail");
const activeZones = document.querySelectorAll(".story-bottom-section, .story-text");

// 設定尾巴長度與陣列
const segments = 15;
const points = [];
const mouse = { x: 0, y: 0 };

// 初始化所有點至 (0,0)
for (let i = 0; i < segments; i++) {
  points.push({ x: 0, y: 0 });
}

// 設定 GSAP quickTo (紅點跟隨優化)
const xTo = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
const yTo = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });

// 滑鼠位置紀錄
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  // 紅點隨時跟隨 (即使隱藏中也在跟，避免顯示瞬間位置錯誤)
  xTo(mouse.x);
  yTo(mouse.y);
});

// B. 動畫繪製迴圈 (60FPS)

gsap.ticker.add(() => {
  // 1. 物理運算 (Lerp 插值)
  // 第一點跟滑鼠
  points[0].x += (mouse.x - points[0].x) * 0.8;
  points[0].y += (mouse.y - points[0].y) * 0.8;

  // 後續點跟前一點
  for (let i = 1; i < segments; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    curr.x += (prev.x - curr.x) * 0.35;
    curr.y += (prev.y - curr.y) * 0.35;
  }

  // 2. 繪製 SVG 路徑
  let pathString = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < segments; i++) {
    pathString += ` L ${points[i].x} ${points[i].y}`;
  }
  path.setAttribute("d", pathString);
});

// C.區域進出判斷

activeZones.forEach((zone) => {
  // --- 進場：淡入 (Opacity 0 -> 1) ---
  zone.addEventListener("mouseenter", (e) => {
    // 1. 直接用 GSAP 控制透明度 (0.3秒淡入)
    // 陣列寫法 [dot, svgContainer] 可以同時控制紅點跟線條
    gsap.to([dot, svgContainer], { opacity: 1, duration: 0.3 });

    // 2. 【重要】瞬移重置 (邏輯不變)
    const startX = e.clientX;
    const startY = e.clientY;

    xTo(startX);
    yTo(startY);

    points.forEach((p) => {
      p.x = startX;
      p.y = startY;
    });
  });

  // --- 離場：淡出 (Opacity 1 -> 0) ---
  zone.addEventListener("mouseleave", () => {
    // 直接用 GSAP 控制透明度 (0.3秒淡出)
    gsap.to([dot, svgContainer], { opacity: 0, duration: 0.3 });
  });
});

// #endregion
