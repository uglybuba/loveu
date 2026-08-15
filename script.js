"use strict";

const preloader = document.getElementById("preloader");

const loaderProgress = document.querySelector(".loader-progress");

const typingElement = document.getElementById("typing-text");

const scrollButtons = document.querySelectorAll("[data-scroll]");

const starsLayer = document.getElementById("stars-layer");

const particlesLayer = document.getElementById("particles-layer");

const shootingLayer = document.getElementById("shooting-stars");


window.addEventListener("load", () => {

    loaderProgress.classList.add("loaded");

    setTimeout(() => {

        preloader.classList.add("hidden");

    }, 1200);

});


scrollButtons.forEach(button => {

    button.addEventListener("click", () => {

        const target = document.querySelector(button.dataset.scroll);

        if (!target) return;

        target.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    });

});

const typingText = `
Спасибо тебе за всё,
за заботу,
за улыбки,
за тепло,
за то, что делаешь каждый мой день счастливее.

Я люблю тебя.`;

let textIndex = 0;

function typeWriter() {

    if (textIndex >= typingText.length) return;

    typingElement.textContent += typingText.charAt(textIndex);

    textIndex++;

    setTimeout(typeWriter, 45);

}

typeWriter();

function createStars() {

    const amount = 220;

    for (let i = 0; i < amount; i++) {

        const star = document.createElement("span");

        star.className = "star";

        if (Math.random() > 0.85) {

            star.classList.add("big");

        }

        const size = Math.random() * 3 + 1;

        star.style.width = `${size}px`;

        star.style.height = `${size}px`;

        star.style.left = `${Math.random() * 100}%`;

        star.style.top = `${Math.random() * 100}%`;

        star.style.setProperty("--duration", `${2 + Math.random() * 5}s`);

        star.style.animationDelay = `${Math.random() * 6}s`;

        starsLayer.appendChild(star);

    }

}

createStars();

function createParticles() {

    const amount = 60;

    for (let i = 0; i < amount; i++) {

        const particle = document.createElement("span");

        particle.className = "particle";

        const size = Math.random() * 4 + 1;

        particle.style.width = `${size}px`;

        particle.style.height = `${size}px`;

        particle.style.left = `${Math.random() * 100}%`;

        particle.style.animationDelay = `${Math.random() * 20}s`;

        particle.style.setProperty(

            "--float-time",

            `${14 + Math.random() * 14}s`

        );

        particlesLayer.appendChild(particle);

    }

}

createParticles();

function createShootingStars() {

    const amount = 8;

    for (let i = 0; i < amount; i++) {

        const comet = document.createElement("span");

        comet.className = "shooting-star";

        comet.style.top = `${Math.random() * 60}%`;

        comet.style.left = `${-20 - Math.random() * 30}%`;

        comet.style.animationDelay = `${Math.random() * 12}s`;

        comet.style.animationDuration = `${6 + Math.random() * 6}s`;

        shootingLayer.appendChild(comet);

    }

}

createShootingStars();

const revealElements = document.querySelectorAll(
    "section, .story-card, .timeline-item, .gallery-item, .timer-box, .paper, .player"
);

revealElements.forEach(element => {

    element.classList.add("reveal");

});

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("show");

            observer.unobserve(entry.target);

        });

    },

    {

        threshold: 0.15,

        rootMargin: "0px 0px -60px 0px"

    }

);

revealElements.forEach(element => observer.observe(element));

const auroras = document.querySelectorAll(".aurora");

window.addEventListener("scroll", () => {

    const offset = window.scrollY;

    auroras.forEach((aurora, index) => {

        const speed = (index + 1) * 0.08;

        aurora.style.transform =
            `translate3d(0, ${offset * speed}px, 0)`;

    });

});

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const relationshipDate = new Date("2026-05-06T00:00:00");

function updateLoveTimer() {

    const now = new Date();

    let difference = now - relationshipDate;

    if (difference < 0) {

        difference = 0;

    }

    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);

    const hours = Math.floor((totalSeconds % 86400) / 3600);

    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const seconds = totalSeconds % 60;

    daysElement.textContent = days;

    hoursElement.textContent = String(hours).padStart(2, "0");

    minutesElement.textContent = String(minutes).padStart(2, "0");

    secondsElement.textContent = String(seconds).padStart(2, "0");

}

updateLoveTimer();

setInterval(updateLoveTimer, 1000);

const photoModal = document.getElementById("photoModal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");
const galleryImages = document.querySelectorAll(".gallery-item img");

galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        modalImage.src = image.src;

        modalImage.alt = image.alt;

        photoModal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});

function closePhotoModal() {

    photoModal.classList.remove("active");

    document.body.style.overflow = "";

}

closeModal.addEventListener("click", closePhotoModal);

photoModal.addEventListener("click", event => {

    if (event.target === photoModal) {

        closePhotoModal();

    }

});

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closePhotoModal();

    }

});

const audio = document.getElementById("audio");
const playButton = document.getElementById("playBtn");
const pauseButton = document.getElementById("pauseBtn");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-bar");
const currentTimeElement = document.getElementById("currentTime");
const durationElement = document.getElementById("duration");
const albumCover = document.querySelector(".album-cover");

function formatTime(time) {

    if (isNaN(time)) {

        return "00:00";

    }

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}

playButton.addEventListener("click", () => {

    audio.play();

});

pauseButton.addEventListener("click", () => {

    audio.pause();

});

audio.addEventListener("play", () => {

    albumCover.classList.add("playing");

});

audio.addEventListener("pause", () => {

    albumCover.classList.remove("playing");

});

audio.addEventListener("loadedmetadata", () => {

    durationElement.textContent = formatTime(audio.duration);

});

audio.addEventListener("timeupdate", () => {

    currentTimeElement.textContent = formatTime(audio.currentTime);

    const percent = (audio.currentTime / audio.duration) * 100 || 0;

    progressBar.style.width = `${percent}%`;

});

progress.addEventListener("click", event => {

    const rect = progress.getBoundingClientRect();

    const percent = (event.clientX - rect.left) / rect.width;

    audio.currentTime = percent * audio.duration;

});

const secretButton = document.getElementById("secretButton");
const secretModal = document.getElementById("secretModal");
const closeSecret = document.getElementById("closeSecret");

function closeSecretModal() {

    secretModal.classList.remove("active");

    document.body.style.overflow = "";

}

secretButton.addEventListener("click", () => {

    secretModal.classList.add("active");

    document.body.style.overflow = "hidden";

});

closeSecret.addEventListener("click", closeSecretModal);

secretModal.addEventListener("click", event => {

    if (event.target === secretModal) {

        closeSecretModal();

    }

});

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeSecretModal();

    }

});

if (window.matchMedia("(pointer:fine)").matches) {

    document.addEventListener("mousemove", event => {

        const x = (event.clientX / window.innerWidth - 0.5) * 30;

        const y = (event.clientY / window.innerHeight - 0.5) * 30;

        auroras.forEach((aurora, index) => {

            const factor = (index + 1) * 0.4;

            aurora.style.transform =
                `translate(${x * factor}px, ${y * factor}px)`;

        });

    });

}

audio.volume = 0.7;

window.addEventListener("pageshow", () => {

    updateLoveTimer();

    currentTimeElement.textContent = "00:00";

    if (!isNaN(audio.duration)) {

        durationElement.textContent = formatTime(audio.duration);

    }

});
