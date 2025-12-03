const audio = document.getElementById("bg-music");
audio.volume = 0.5;
// Optional: try autoplay muted
audio.play().catch(err => console.log("Autoplay blocked:", err));
// Listen for user click to unmute & play
document.addEventListener("click", () => {
    audio.muted = false;
    audio.play().then(() => console.log("Music playing!"));
}, { once: true }); // only first click


// GSAP animations with ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hero subtle reveal
gsap.to(".hero-bg", { scale: 1, filter: "blur(0px) brightness(0.6)", duration: 1.6, ease: "power2.out" });
gsap.from(".big-name", { y: 80, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.2 });
gsap.from(".tagline", { y: 40, opacity: 0, duration: 1, ease: "power3.out", delay: 0.35 });

// Horizontal story (pin and sideways scroll)
gsap.to(".story", {
  xPercent: -200,
  ease: "none",
  scrollTrigger: {
    trigger: ".story",
    start: "top top",
    end: "+=300%",
    scrub: 1,
    pin: true
  }
});

// Experience cards reveal
gsap.to(".job-card", {
  y: 0,
  opacity: 1,
  stagger: 0.18,
  duration: 0.8,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".experience",
    start: "top 80%",
  }
});

// Hobby tiles pop-in
gsap.to(".tile", {
  scale: 1,
  opacity: 1,
  stagger: 0.12,
  duration: 0.7,
  ease: "back.out(1.2)",
  scrollTrigger: {
    trigger: ".hobbies",
    start: "top 85%",
  }
});

// Fun fact flip
gsap.to(".fact-card", {
  opacity: 1,
  rotateY: 0,
  stagger: 0.15,
  duration: 0.9,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".funfacts",
    start: "top 85%",
  }
});

// Parallax subtle on scroll for hero bg
ScrollTrigger.create({
  trigger: ".hero",
  start: "top top",
  end: "bottom top",
  scrub: true,
  onUpdate: self => {
    const v = 1 + Math.abs(self.progress) * 0.04;
    gsap.to(".hero-bg", { scale: v, overwrite: true, duration: 0.5 });
  }
});



document.querySelectorAll(".slider").forEach((slider) => {
    const slides = slider.querySelector(".slides");
    const items = slides.children;
    const prevBtn = slider.querySelector(".slide-prev");
    const nextBtn = slider.querySelector(".slide-next");

    let index = 0;
    let interval;

    function updateSlide() {
        slides.style.transform = `translateX(-${index * 100}%)`;
    }

    function startAutoSlide() {
        interval = setInterval(() => {
            index = (index + 1) % items.length;
            updateSlide();
        }, 2500);
    }

    function resetAutoSlide() {
        clearInterval(interval);
        startAutoSlide();
    }

    // Buttons
    nextBtn.addEventListener("click", () => {
        index = (index + 1) % items.length;
        updateSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
        index = (index - 1 + items.length) % items.length;
        updateSlide();
        resetAutoSlide();
    });

    // CLICK TO ZOOM
    Array.from(items).forEach((item) => {
        item.addEventListener("click", () => {
            openZoom(item);
        });
    });

    startAutoSlide();
});

/* ZOOM POPUP */
function openZoom(item) {
    const modal = document.createElement("div");
    modal.className = "zoom-modal";

    const clone = item.cloneNode(true);
    clone.classList.add("zoom-content");

    modal.appendChild(clone);

    modal.addEventListener("click", () => {
        modal.remove();
    });

    document.body.appendChild(modal);
}


