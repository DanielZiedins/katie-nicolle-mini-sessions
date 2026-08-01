const imageRange = (folder, count) => Array.from(
  { length: count },
  (_, index) => `/images/drive/${folder}/${String(index + 1).padStart(3, "0")}.jpg`
);

const GALLERY_INTERVAL = 1500;

const sessions = [
  {
    id: "flower-farm",
    folder: "flower",
    count: 82,
    season: "summer",
    index: "01",
    name: "Flower Farm",
    date: "August 21",
    location: "All Who Wander Flower Farm · Dundas",
    mood: "Wildflowers & golden light",
    description: "A dreamy garden setting filled with soft colour, long grasses and effortless summer warmth.",
    duration: "25 minutes",
    imagesIncluded: "25 images",
    price: "$395 + HST",
    url: "https://katienicollephotography.pixieset.com/booking/flower-farm-minis"
  },
  {
    id: "hamilton-beach",
    folder: "hamilton",
    assetFolder: "hamilton-current-20260801-r1",
    count: 90,
    season: "autumn",
    index: "02",
    name: "Hamilton Beach",
    date: "September 27",
    location: "Van Wagner’s Beach · Hamilton",
    mood: "Sand & shoreline",
    description: "Soft sand, windswept grasses and open water create a luminous, relaxed setting with room for everyone to move and play.",
    duration: "30 minutes",
    imagesIncluded: "30 images",
    price: "$385 + HST",
    url: "https://katienicollephotography.pixieset.com/booking/hamilton-beach"
  },
  {
    id: "tree-farm",
    folder: "tree",
    assetFolder: "tree-current-20260801-r2",
    count: 43,
    season: "holiday",
    index: "03",
    name: "Tree Farm",
    date: "October 18",
    location: "Hepburn Christmas Trees · Waterdown",
    mood: "Evergreens & quiet wonder",
    description: "Fresh air, open rows of evergreens and a nostalgic holiday feeling—natural, unfussy and full of heart.",
    duration: "20 minutes",
    imagesIncluded: "20 images",
    price: "$265 + HST",
    url: "https://katienicollephotography.pixieset.com/booking/tree-farm-minis"
  },
  {
    id: "beamers-falls",
    folder: "beamers",
    count: 48,
    season: "autumn",
    index: "04",
    name: "Beamers Falls",
    date: "October 24",
    location: "Beamers Falls · Grimsby",
    mood: "Golden fields & forest paths",
    description: "A luminous fall setting with a wide-open field, a pathway into the forest and layers of colourful leaves.",
    duration: "30 minutes",
    imagesIncluded: "30 images",
    price: "$385 + HST",
    url: "https://katienicollephotography.pixieset.com/booking/beamers-falls"
  },
  {
    id: "dundurn-castle",
    folder: "dundurn",
    count: 42,
    season: "autumn",
    index: "05",
    name: "Dundurn Castle",
    date: "October 25",
    location: "Dundurn Castle · Hamilton",
    mood: "Architecture & autumn",
    description: "Timeless stone, elegant lines and glowing fall colour for a polished gallery with plenty of playfulness.",
    duration: "30 minutes",
    imagesIncluded: "30 images",
    price: "$385 + HST",
    url: "https://katienicollephotography.pixieset.com/booking/dundurn-castle"
  },
  {
    id: "village-co",
    folder: "village",
    count: 35,
    season: "holiday",
    index: "06",
    name: "Village Co",
    date: "November 15",
    location: "The Village Co · Jordan Village",
    mood: "Cozy & beautifully styled",
    description: "A warm indoor studio with refined holiday details—the perfect weather-proof setting for little ones.",
    duration: "20 minutes",
    imagesIncluded: "15 images",
    price: "$300 + HST",
    url: "https://katienicollephotography.pixieset.com/booking/village-co"
  }
].map(session => ({
  ...session,
  photos: imageRange(session.assetFolder || session.folder, session.count),
  alts: Array.from(
    { length: session.count },
    (_, index) => `${session.name} mini session gallery — photograph ${index + 1} of ${session.count}`
  )
}));

const sessionList = document.querySelector("[data-session-list]");

function sessionCard(session) {
  const slides = session.photos.map((photo, index) => {
    const smallPhoto = photo.replace("/drive/", "/drive-sm/");
    const sourceAttributes = index === 0
      ? `src="${photo}" srcset="${smallPhoto} 600w, ${photo} 1024w"`
      : `data-src="${photo}" data-srcset="${smallPhoto} 600w, ${photo} 1024w"`;
    return `
    <button class="gallery-slide${index === 0 ? " is-active" : ""}" type="button" data-slide="${index}" aria-label="Enlarge photo ${index + 1} of ${session.photos.length}" aria-keyshortcuts="ArrowLeft ArrowRight Home End">
      <img ${sourceAttributes} sizes="(max-width: 760px) calc(100vw - 32px), 58vw" alt="${session.alts[index]}" width="1200" height="1800" decoding="async" loading="lazy" />
    </button>`;
  }).join("");

  return `
    <article class="session-card reveal" id="${session.id}" data-season="${session.season}" data-session="${session.id}">
      <div class="session-gallery" aria-label="${session.name} photo gallery">
        <div class="gallery-slides">${slides}</div>
        <div class="gallery-topline"><span>${session.mood}</span><span><i>Complete </i>${session.photos.length}<i>-frame preview</i> · ${session.index} / 06</span></div>
        <button class="gallery-arrow gallery-prev" type="button" data-direction="-1" aria-label="Previous ${session.name} photo">←</button>
        <button class="gallery-arrow gallery-next" type="button" data-direction="1" aria-label="Next ${session.name} photo">→</button>
        <div class="gallery-status">
          <span class="gallery-count"><strong>01</strong> / ${String(session.photos.length).padStart(2, "0")}</span>
          <button class="gallery-pause" type="button" aria-label="Pause ${session.name} gallery" aria-pressed="false"><i></i><i></i></button>
        </div>
        <div class="gallery-progress" aria-hidden="true"><i></i></div>
      </div>
      <div class="session-copy">
        <div class="session-date"><span>${session.date.split(" ")[0]}</span><strong>${session.date.split(" ")[1]}</strong></div>
        <div class="session-title-wrap">
          <p class="eyebrow">Mini session · ${session.location}</p>
          <h3>${session.name}</h3>
          <p class="session-description">${session.description}</p>
        </div>
        <dl class="session-details">
          <div><dt>Time</dt><dd>${session.duration}</dd></div>
          <div><dt>Includes</dt><dd>${session.imagesIncluded}</dd></div>
          <div><dt>Investment</dt><dd>${session.price}</dd></div>
        </dl>
        <div class="session-actions">
          <a class="book-link" href="${session.url}" target="_blank" rel="noreferrer" aria-label="Book the ${session.name} mini session on Pixieset">
            <span>View times & book</span><i aria-hidden="true">↗</i>
          </a>
          <button class="share-session" type="button" data-share-session="${session.id}" aria-label="Share the ${session.name} mini session"><span aria-hidden="true">↗</span> Share</button>
        </div>
      </div>
    </article>`;
}

sessionList.innerHTML = sessions.map(sessionCard).join("");

function alignSessionHash() {
  if (!window.location.hash) return;
  const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
  if (target?.matches("[data-session]")) target.scrollIntoView({ block: "start", behavior: "instant" });
}

requestAnimationFrame(alignSessionHash);
window.addEventListener("load", alignSessionHash, { once: true });
setTimeout(alignSessionHash, 250);
window.addEventListener("hashchange", () => requestAnimationFrame(alignSessionHash));

document.querySelectorAll('img[src^="/images/drive/"]').forEach(image => {
  if (!image.srcset) image.srcset = `${image.getAttribute("src").replace("/drive/", "/drive-sm/")} 600w, ${image.getAttribute("src")} 1024w`;
  if (!image.sizes) image.sizes = "(max-width: 760px) 70vw, 32vw";
  image.decoding = "async";
  if (!image.width) image.width = 1200;
  if (!image.height) image.height = 1800;
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const galleries = [];

document.querySelectorAll("[data-session]").forEach((card, cardIndex) => {
  const slides = [...card.querySelectorAll("[data-slide]")];
  const progress = card.querySelector(".gallery-progress i");
  const counter = card.querySelector(".gallery-count strong");
  const pauseButton = card.querySelector(".gallery-pause");
  const gallery = card.querySelector(".session-gallery");
  let current = 0;
  let timer;
  let paused = false;
  let isNearViewport = false;
  let touchStartX = 0;
  let swiped = false;

  const hydrate = index => {
    const image = slides[(index + slides.length) % slides.length].querySelector("img");
    if (!image.dataset.src) return;
    image.src = image.dataset.src;
    image.srcset = image.dataset.srcset;
    delete image.dataset.src;
    delete image.dataset.srcset;
  };

  const animateProgress = () => {
    progress.style.animation = "none";
    progress.offsetHeight;
    if (!prefersReducedMotion && !paused && isNearViewport) progress.style.animation = `galleryTimer ${GALLERY_INTERVAL}ms linear forwards`;
  };

  const show = (next, userInitiated = false) => {
    current = (next + slides.length) % slides.length;
    hydrate(current);
    hydrate(current + 1);
    slides.forEach((slide, index) => {
      const active = index === current;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
      slide.tabIndex = active ? 0 : -1;
    });
    counter.textContent = String(current + 1).padStart(2, "0");
    animateProgress();
    if (userInitiated && !card.matches(":hover") && !card.contains(document.activeElement)) restart();
  };

  const stop = () => {
    clearInterval(timer);
    progress.style.animationPlayState = "paused";
  };

  const start = () => {
    if (prefersReducedMotion || paused || document.hidden || !isNearViewport || card.hidden) return;
    clearInterval(timer);
    timer = setInterval(() => show(current + 1), GALLERY_INTERVAL);
    animateProgress();
  };

  const restart = () => {
    stop();
    start();
  };

  card.querySelectorAll("[data-direction]").forEach(button => {
    button.addEventListener("click", () => show(current + Number(button.dataset.direction), true));
  });

  pauseButton.addEventListener("click", () => {
    paused = !paused;
    pauseButton.classList.toggle("is-paused", paused);
    pauseButton.setAttribute("aria-pressed", String(paused));
    pauseButton.setAttribute("aria-label", `${paused ? "Play" : "Pause"} ${card.querySelector("h3").textContent} gallery`);
    if (paused) stop(); else start();
  });

  gallery.addEventListener("touchstart", event => {
    touchStartX = event.changedTouches[0].clientX;
    swiped = false;
  }, { passive: true });
  gallery.addEventListener("touchend", event => {
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) < 50) return;
    swiped = true;
    show(current + (distance < 0 ? 1 : -1), true);
  }, { passive: true });
  gallery.addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home") show(0, true);
    else if (event.key === "End") show(slides.length - 1, true);
    else show(current + (event.key === "ArrowRight" ? 1 : -1), true);
  });

  card.addEventListener("mouseenter", stop);
  card.addEventListener("mouseleave", start);
  card.addEventListener("focusin", stop);
  card.addEventListener("focusout", event => {
    if (!card.contains(event.relatedTarget)) start();
  });

  show(0);
  if (cardIndex) setTimeout(restart, cardIndex * 540);
  galleries.push({
    card,
    slides,
    show,
    hydrate,
    start,
    stop,
    setNearViewport: value => {
      isNearViewport = value;
      if (value) start(); else stop();
    },
    getCurrent: () => current,
    wasSwiped: () => swiped
  });
});

const galleryAutoplayObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const gallery = galleries.find(item => item.card === entry.target);
    gallery?.setNearViewport(entry.isIntersecting);
  });
}, { rootMargin: "35% 0px", threshold: 0.01 });
galleries.forEach(({ card }) => galleryAutoplayObserver.observe(card));

document.addEventListener("visibilitychange", () => {
  galleries.forEach(gallery => document.hidden ? gallery.stop() : gallery.start());
});

const filterButtons = [...document.querySelectorAll("[data-filter]")];
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    galleries.forEach(({ card, start, stop }) => {
      const visible = filter === "all" || card.dataset.season === filter;
      card.hidden = !visible;
      if (visible) start(); else stop();
    });
  });
});

const toast = document.querySelector("[data-toast]");
let toastTimer;
function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

document.querySelectorAll("[data-share-session]").forEach(button => {
  button.addEventListener("click", async () => {
    const session = sessions.find(item => item.id === button.dataset.shareSession);
    const shareData = {
      title: `${session.name} Mini Session | Katie Nicolle Photography`,
      text: `Come see the ${session.name} mini session on ${session.date}.`,
      url: `${window.location.origin}${window.location.pathname}#${session.id}`
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        showToast("Session shared");
      } else {
        await navigator.clipboard.writeText(shareData.url);
        showToast("Session link copied");
      }
    } catch (error) {
      if (error.name !== "AbortError") showToast("Copy the page address to share this session");
    }
  });
});

const concierge = document.querySelector("[data-booking-concierge]");
const conciergeName = concierge.querySelector("[data-concierge-name]");
const conciergeDate = concierge.querySelector("[data-concierge-date]");
const conciergeLink = concierge.querySelector("[data-concierge-link]");
const compassLinks = [...document.querySelectorAll(".session-compass a")];

function setActiveSession(id) {
  const session = sessions.find(item => item.id === id);
  if (!session) return;
  conciergeName.textContent = session.name;
  conciergeDate.textContent = session.date;
  conciergeLink.href = session.url;
  conciergeLink.setAttribute("aria-label", `Book the ${session.name} mini session on Pixieset`);
  compassLinks.forEach(link => link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`));
}

const activeSessionObserver = new IntersectionObserver(entries => {
  const active = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (active) setActiveSession(active.target.dataset.session);
}, { rootMargin: "-15% 0px -42%", threshold: [0.18, 0.35, 0.55] });
galleries.forEach(({ card }) => activeSessionObserver.observe(card));

const conciergeObserver = new IntersectionObserver(([entry]) => {
  concierge.classList.toggle("is-visible", entry.isIntersecting);
  concierge.setAttribute("aria-hidden", String(!entry.isIntersecting));
}, { threshold: 0.02 });
conciergeObserver.observe(document.querySelector(".session-list"));

const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("p");
const lightboxCount = lightbox.querySelector("[data-lightbox-count]");
const lightboxClose = lightbox.querySelector(".lightbox-close");
let activeLightboxGallery;
let activeLightboxIndex = 0;
let lastTrigger;

function renderLightbox(index) {
  if (!activeLightboxGallery) return;
  activeLightboxIndex = (index + activeLightboxGallery.slides.length) % activeLightboxGallery.slides.length;
  activeLightboxGallery.hydrate(activeLightboxIndex);
  const slide = activeLightboxGallery.slides[activeLightboxIndex];
  const image = slide.querySelector("img");
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = image.alt.replace(/ — photograph.*$/, "");
  lightboxCount.textContent = `${String(activeLightboxIndex + 1).padStart(2, "0")} / ${String(activeLightboxGallery.slides.length).padStart(2, "0")}`;
}

galleries.forEach(gallery => {
  gallery.slides.forEach((slide, index) => {
    slide.addEventListener("click", () => {
      if (gallery.wasSwiped()) return;
      activeLightboxGallery = gallery;
      lastTrigger = slide;
      renderLightbox(index);
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
      gallery.stop();
      lightboxClose.focus();
    });
  });
});

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  activeLightboxGallery?.start();
  lastTrigger?.focus();
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.querySelectorAll("[data-lightbox-direction]").forEach(button => {
  button.addEventListener("click", () => renderLightbox(activeLightboxIndex + Number(button.dataset.lightboxDirection)));
});
lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("is-open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") renderLightbox(activeLightboxIndex - 1);
  if (event.key === "ArrowRight") renderLightbox(activeLightboxIndex + 1);
  if (event.key === "Home") renderLightbox(0);
  if (event.key === "End") renderLightbox(activeLightboxGallery.slides.length - 1);
});

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!open));
  mobileMenu.setAttribute("aria-hidden", String(open));
  document.body.classList.toggle("menu-open", !open);
});
mobileMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  menuToggle.setAttribute("aria-expanded", "false");
  mobileMenu.setAttribute("aria-hidden", "true");
  document.body.classList.remove("menu-open");
}));

const header = document.querySelector("[data-header]");
const pageProgress = document.querySelector("[data-page-progress]");
function updateScrollDetails() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  pageProgress.style.transform = `scaleX(${scrollable > 0 ? window.scrollY / scrollable : 0})`;
}
window.addEventListener("scroll", updateScrollDetails, { passive: true });
updateScrollDetails();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const delay = entry.target.dataset.delay || 0;
    setTimeout(() => entry.target.classList.add("is-visible"), Number(delay));
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

document.querySelector("[data-year]").textContent = new Date().getFullYear();
