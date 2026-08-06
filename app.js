const imageRange = (folder, count) => Array.from(
  { length: count },
  (_, index) => `/images/drive/${folder}/${String(index + 1).padStart(3, "0")}.jpg`
);

const GALLERY_INTERVAL = 1500;
const ZONE = "America/Toronto";

// Dates live here as ISO strings only — every label, the running order and the
// 01–06 numbering are derived from them, so changing a date is a one-line edit.
const sessionSource = [
  {
    id: "flower-farm",
    folder: "flower",
    count: 82,
    season: "summer",
    name: "Flower Farm",
    date: "2026-08-31",
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
    name: "Hamilton Beach",
    date: "2026-10-03",
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
    name: "Tree Farm",
    date: "2026-10-18",
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
    name: "Beamers Falls",
    date: "2026-10-24",
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
    name: "Dundurn Castle",
    date: "2026-10-25",
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
    name: "Village Co",
    date: "2026-11-15",
    location: "The Village Co · Jordan Village",
    mood: "Cozy & beautifully styled",
    description: "A warm indoor studio with refined holiday details—the perfect weather-proof setting for little ones.",
    duration: "20 minutes",
    imagesIncluded: "15 images",
    price: "$300 + HST",
    url: "https://katienicollephotography.pixieset.com/booking/village-co"
  }
];

const today = new Date().toLocaleDateString("en-CA", { timeZone: ZONE });
const dateParts = (iso, options) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { timeZone: "UTC", ...options });

// Upcoming dates first, in date order; anything already past drops to the end so
// the page still reads correctly once the earliest sessions have come and gone.
const orderedSessions = sessionSource
  .map(session => ({
    ...session,
    isPast: session.date < today,
    dateLabel: dateParts(session.date, { month: "long", day: "numeric" }),
    weekday: dateParts(session.date, { weekday: "long" }),
    shortDate: dateParts(session.date, { month: "short", day: "numeric" }),
    shortWeekday: dateParts(session.date, { weekday: "short" })
  }))
  .sort((a, b) => (a.isPast - b.isPast) || a.date.localeCompare(b.date));

const sessionTotal = String(orderedSessions.length).padStart(2, "0");

const sessions = orderedSessions.map((session, position) => ({
  ...session,
  index: String(position + 1).padStart(2, "0"),
  photos: imageRange(session.assetFolder || session.folder, session.count),
  alts: Array.from(
    { length: session.count },
    (_, index) => `${session.name} mini session gallery — photograph ${index + 1} of ${session.count}`
  )
}));

const sessionList = document.querySelector("[data-session-list]");
const sessionCompass = document.querySelector(".session-compass");

// The markup in index.html is the no-JS fallback; this keeps the compass in step
// with the running order above.
sessionCompass.innerHTML = sessions.map(session => `
    <a href="#${session.id}"${session.isPast ? ' class="is-past"' : ""}>
      <img src="/images/drive-sm/${session.assetFolder || session.folder}/001.jpg" alt="" loading="lazy" decoding="async" />
      <span>${session.index}</span>
      <strong>${session.name}</strong>
      <small>${session.isPast ? "Date passed" : `${session.shortWeekday} · ${session.shortDate}`}</small>
    </a>`).join("");

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
    <article class="session-card reveal${session.isPast ? " is-past" : ""}" id="${session.id}" data-season="${session.season}" data-session="${session.id}">
      <div class="session-gallery" aria-label="${session.name} photo gallery">
        <div class="gallery-slides">${slides}</div>
        <div class="gallery-topline"><span>${session.mood}</span><span><i>Complete </i>${session.photos.length}<i>-frame preview</i> · ${session.index} / ${sessionTotal}</span></div>
        <button class="gallery-arrow gallery-prev" type="button" data-direction="-1" aria-label="Previous ${session.name} photo">←</button>
        <button class="gallery-arrow gallery-next" type="button" data-direction="1" aria-label="Next ${session.name} photo">→</button>
        <div class="gallery-status">
          <span class="gallery-count"><strong>01</strong> / ${String(session.photos.length).padStart(2, "0")}</span>
          <button class="gallery-pause" type="button" aria-label="Pause ${session.name} gallery" aria-pressed="false"><i></i><i></i></button>
        </div>
        <div class="gallery-progress" aria-hidden="true"><i></i></div>
      </div>
      <div class="session-copy">
        <time class="session-date" datetime="${session.date}"><span>${session.dateLabel.split(" ")[0]}</span><strong>${session.dateLabel.split(" ")[1]}</strong><i class="sr-only">${session.weekday}</i></time>
        <div class="session-title-wrap">
          ${session.isPast ? '<p class="session-flag">This date has passed</p>' : ""}
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
const sessionStatus = document.querySelector("[data-session-status]");
const nextSession = sessions.find(session => !session.isPast);

function describeSelection(filter, shown) {
  if (filter !== "all") {
    const label = filterButtons.find(button => button.dataset.filter === filter)?.textContent.toLowerCase();
    return `Showing ${shown} of ${sessions.length} ${label} ${shown === 1 ? "setting" : "settings"}`;
  }
  if (!nextSession) return "Every date in this collection has passed";
  return `Next date · ${nextSession.name} · ${nextSession.weekday}, ${nextSession.dateLabel}`;
}

function applyFilter(filter) {
  filterButtons.forEach(button => {
    const active = button.dataset.filter === filter;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  let shown = 0;
  galleries.forEach(({ card, start, stop }) => {
    const visible = filter === "all" || card.dataset.season === filter;
    card.hidden = !visible;
    if (visible) {
      shown += 1;
      start();
    } else {
      stop();
    }
  });
  sessionStatus.textContent = describeSelection(filter, shown);
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => applyFilter(button.dataset.filter));
});
sessionStatus.textContent = describeSelection("all", sessions.length);

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
      text: `Come see the ${session.name} mini session on ${session.weekday}, ${session.dateLabel}.`,
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

// Jumping to a session that the active season filter has hidden used to land
// nowhere — clear the filter first so the card is there to scroll to.
compassLinks.forEach(link => link.addEventListener("click", () => {
  if (document.getElementById(link.getAttribute("href").slice(1))?.hidden) applyFilter("all");
}));

function setActiveSession(id) {
  const session = sessions.find(item => item.id === id);
  if (!session) return;
  conciergeName.textContent = session.name;
  conciergeDate.textContent = session.isPast ? "Date passed" : `${session.shortWeekday} · ${session.dateLabel}`;
  conciergeLink.href = session.url;
  conciergeLink.setAttribute("aria-label", `Book the ${session.name} mini session on Pixieset`);
  compassLinks.forEach(link => link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`));
}

if (nextSession) setActiveSession(nextSession.id);

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
