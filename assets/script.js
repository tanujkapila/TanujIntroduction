
// ----- Audio -----
const audio = document.getElementById("bg-music");
const btn = document.getElementById("play-music-btn");

// Start muted; attempt autoplay (may be blocked)
audio.volume = 0.5;
audio.play().catch(err => console.log("Autoplay blocked:", err));

// Unmute & play on button click
btn.addEventListener("click", () => {
  audio.muted = false;
  audio.play().then(() => console.log("Music playing!")).catch(console.log);
}, { once: true });

// ----- GSAP & ScrollTrigger -----
gsap.registerPlugin(ScrollTrigger);

// Hero subtle reveal
gsap.to(".hero-bg", { scale: 1, filter: "blur(0px) brightness(0.6)", duration: 1.6, ease: "power2.out" });
gsap.from(".big-name", { y: 80, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.2 });
gsap.from(".tagline", { y: 40, opacity: 0, duration: 1, ease: "power3.out", delay: 0.35 });

// ----- Horizontal story (patched) -----
// Move the .panels container horizontally, not the section itself.
// Compute end distance from number of panels and viewport width so there's no extra blank scroll.
const panels = gsap.utils.toArray(".story.horizontal .panel");
const panelsContainer = document.querySelector(".story.horizontal .panels");

function getTotalShift() {
  return (panels.length - 1) * window.innerWidth;
}

function setupHorizontal() {
  const totalShift = getTotalShift();

  // Kill previous tween/trigger if we re-init on resize
  if (panelsContainer._hTween) {
    panelsContainer._hTween.scrollTrigger && panelsContainer._hTween.scrollTrigger.kill();
    panelsContainer._hTween.kill();
  }

  panelsContainer._hTween = gsap.to(panelsContainer, {
    x: -totalShift,
    ease: "none",
    scrollTrigger: {
      trigger: ".story.horizontal",
      start: "top top",
      end: () => "+=" + totalShift, // matches horizontal distance exactly
      scrub: true,
      pin: true,
      anticipatePin: 1
      // pinSpacing: true by default (keeps next section positioned correctly)
    }
  });
}

setupHorizontal();
window.addEventListener("resize", () => {
  setupHorizontal();
  ScrollTrigger.refresh();
});

// ----- Experience cards reveal (fixed selector) -----
gsap.from(".timeline .timeline-content", {
  y: 40,
  opacity: 0,
  stagger: 0.18,
  duration: 0.8,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".experience",
    start: "top 80%"
  }
});

// ----- Hobby tiles pop-in -----
gsap.to(".tile", {
  scale: 1,
  opacity: 1,
  stagger: 0.12,
  duration: 0.7,
  ease: "back.out(1.2)",
  scrollTrigger: {
    trigger: ".hobbies",
    start: "top 85%"
  }
});

// ----- Fun fact flip -----
gsap.to(".fact-card", {
  opacity: 1,
  rotateY: 0,
  stagger: 0.15,
  duration: 0.9,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".funfacts",
    start: "top 85%"
  }
});

// ----- Parallax subtle on scroll for hero bg -----
ScrollTrigger.create({
  trigger: ".hero",
  start: "top top",
  end: "bottom top",
  scrub: true,
  onUpdate: self => {
    const v = 1 + Math.abs(self.progress) * 0.04;
    gsap.to(".hero-bg", { scale: v, overwrite: true, duration: 0.5 });
   }
