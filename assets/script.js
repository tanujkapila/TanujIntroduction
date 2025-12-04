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
    const slidesContainer = slider.querySelector(".slides");
    const items = Array.from(slidesContainer.children).filter(item => item.tagName !== "SPAN");
    const prevBtn = slider.querySelector(".slide-prev");
    const nextBtn = slider.querySelector(".slide-next");

    // Ensure each slide takes full width
    items.forEach(item => item.style.minWidth = "100%");

    // Clear container and append items
    slidesContainer.innerHTML = "";
    items.forEach(item => slidesContainer.appendChild(item));

    // Clone first slide for seamless loop
    const firstClone = items[0].cloneNode(true);
    slidesContainer.appendChild(firstClone);

    let index = 0;
    const total = items.length;
    let interval;

    function goToSlide(idx) {
        slidesContainer.style.transition = "transform 0.5s ease-in-out";
        slidesContainer.style.transform = `translateX(-${idx * 100}%)`;
    }

    function nextSlide() {
        index++;
        goToSlide(index);

        // If at clone, jump to first
        if(index > total - 1) {
            setTimeout(() => {
                slidesContainer.style.transition = "none";
                index = 0;
                slidesContainer.style.transform = `translateX(0%)`;
            }, 500);
        }
    }

    function prevSlide() {
        if(index === 0) {
            // Jump to clone instantly
            slidesContainer.style.transition = "none";
            index = total;
            slidesContainer.style.transform = `translateX(-${index * 100}%)`;
            setTimeout(() => {
                slidesContainer.style.transition = "transform 0.5s ease-in-out";
                index--;
                goToSlide(index);
            }, 20);
        } else {
            index--;
            goToSlide(index);
        }
    }

    function startAutoSlide() {
        interval = setInterval(nextSlide, 10000);
    }

    function stopAutoSlide() {
        clearInterval(interval);
    }

    nextBtn.addEventListener("click", () => { stopAutoSlide(); nextSlide(); startAutoSlide(); });
    prevBtn.addEventListener("click", () => { stopAutoSlide(); prevSlide(); startAutoSlide(); });

    startAutoSlide();
});



function openZoom(item) {
    const modal = document.createElement("div");
    modal.className = "zoom-modal";

    const clone = item.cloneNode(true);
    clone.classList.add("zoom-content");

    modal.appendChild(clone);
    document.body.appendChild(modal);

    // trigger animation after adding to DOM
    requestAnimationFrame(() => {
        modal.classList.add("show");
    });

    // close on click outside
    modal.addEventListener("click", () => {
        modal.classList.remove("show");
        setTimeout(() => modal.remove(), 300); // wait for animation
    });
}

// attach click to all tiles
document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('click', () => openZoom(tile));
});



