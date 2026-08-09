/* =========================================================
   MEHRANÉ — PREMIUM PAKISTANI FINE DINING
   JavaScript
   Designed & Developed by Anas Murtaza
   ========================================================= */


/* =========================
   DOM ELEMENTS
   ========================= */

const preloader = document.getElementById("preloader");
const header = document.getElementById("header");

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

const backToTop = document.getElementById("backToTop");

const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");

const reservationForm = document.getElementById("reservationForm");


/* =========================
   PRELOADER
   ========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        preloader.classList.add("hide");

        document.body.classList.remove("no-scroll");

    }, 900);

});


/* =========================
   MOBILE NAVIGATION
   ========================= */

menuToggle.addEventListener("click", () => {

    menuToggle.classList.toggle("active");

    navMenu.classList.toggle("open");

    document.body.classList.toggle("no-scroll");

});


/* =========================
   CLOSE MOBILE MENU
   ========================= */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        menuToggle.classList.remove("active");

        navMenu.classList.remove("open");

        document.body.classList.remove("no-scroll");

    });

});


/* =========================
   HEADER SCROLL EFFECT
   ========================= */

function handleHeader() {

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", handleHeader);

handleHeader();


/* =========================
   ACTIVE NAVIGATION
   ========================= */

const sections = document.querySelectorAll("main section[id]");

function updateActiveNav() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 180;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const target = link.getAttribute("href");

        if (target === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveNav);

updateActiveNav();


/* =========================
   SCROLL REVEAL
   ========================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .about-content, .about-images, .menu-card, .chef-content, .chef-image, .gallery-item, .review-card, .reservation-content, .reservation-form, .contact-info, .map-placeholder"
);


revealElements.forEach(element => {

    element.classList.add("reveal");

});


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    }
);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================
   MENU FILTER
   ========================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;


        /* Active button */

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");


        /* Filter cards */

        menuCards.forEach(card => {

            const category = card.dataset.category;

            card.classList.remove("filter-in");


            if (filter === "all" || category === filter) {

                card.classList.remove("hide");

                void card.offsetWidth;

                card.classList.add("filter-in");

            } else {

                card.classList.add("hide");

            }

        });

    });

});


/* =========================
   BACK TO TOP
   ========================= */

function handleBackToTop() {

    if (window.scrollY > 700) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}

window.addEventListener("scroll", handleBackToTop);


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================
   RESERVATION FORM
   ========================= */

reservationForm.addEventListener("submit", event => {

    event.preventDefault();


    const name = document.getElementById("name").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const date = document.getElementById("date").value;

    const guests = document.getElementById("guests").value;


    if (!name || !phone || !date) {

        showNotification(
            "Please complete the required reservation details."
        );

        return;

    }


    showNotification(
        `Thank you, ${name}. Your reservation request for ${guests} guest(s) has been received.`
    );


    reservationForm.reset();

});


/* =========================
   CUSTOM NOTIFICATION
   ========================= */

function showNotification(message) {

    const existingNotification =
        document.querySelector(".site-notification");

    if (existingNotification) {

        existingNotification.remove();

    }


    const notification = document.createElement("div");

    notification.className = "site-notification";


    notification.innerHTML = `
        <div class="notification-icon">✓</div>

        <div class="notification-content">

            <strong>MEHRANÉ</strong>

            <p>${message}</p>

        </div>

        <button class="notification-close" aria-label="Close">
            ×
        </button>
    `;


    document.body.appendChild(notification);


    requestAnimationFrame(() => {

        notification.classList.add("show");

    });


    const closeButton =
        notification.querySelector(".notification-close");


    closeButton.addEventListener("click", () => {

        closeNotification(notification);

    });


    setTimeout(() => {

        closeNotification(notification);

    }, 5500);

}


function closeNotification(notification) {

    notification.classList.remove("show");

    setTimeout(() => {

        notification.remove();

    }, 400);

}


/* =========================
   NOTIFICATION STYLING
   ========================= */

const notificationStyle = document.createElement("style");

notificationStyle.textContent = `

    .site-notification {

        position: fixed;

        right: 25px;
        bottom: 25px;

        z-index: 9998;

        width: min(90%, 390px);

        display: flex;

        align-items: flex-start;

        gap: 15px;

        padding: 20px;

        background: rgba(15, 13, 10, 0.96);

        border: 1px solid rgba(201, 164, 92, 0.35);

        box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.45);

        backdrop-filter: blur(20px);

        opacity: 0;

        transform:
            translateY(30px)
            scale(0.97);

        transition:
            opacity 0.4s ease,
            transform 0.4s ease;

    }


    .site-notification.show {

        opacity: 1;

        transform:
            translateY(0)
            scale(1);

    }


    .notification-icon {

        width: 30px;
        height: 30px;

        flex-shrink: 0;

        display: grid;
        place-items: center;

        border: 1px solid #c9a45c;

        border-radius: 50%;

        color: #c9a45c;

        font-size: 13px;

    }


    .notification-content {

        flex: 1;

    }


    .notification-content strong {

        display: block;

        color: #e6c982;

        font-family:
            "Cormorant Garamond",
            serif;

        font-size: 22px;

        font-weight: 500;

        letter-spacing: 2px;

    }


    .notification-content p {

        margin-top: 3px;

        color: #9b9488;

        font-family: "Inter", sans-serif;

        font-size: 11px;

        line-height: 1.6;

    }


    .notification-close {

        background: transparent;

        color: #777168;

        font-size: 20px;

        line-height: 1;

        transition: color 0.3s ease;

    }


    .notification-close:hover {

        color: #e6c982;

    }


    @media (max-width: 480px) {

        .site-notification {

            right: 15px;
            bottom: 15px;

            width: calc(100% - 30px);

        }

    }

`;

document.head.appendChild(notificationStyle);


/* =========================
   IMAGE LOAD EFFECT
   ========================= */

const images = document.querySelectorAll("img");


images.forEach(image => {

    image.addEventListener("load", () => {

        image.classList.add("loaded");

    });

});


/* =========================
   PARALLAX HERO
   ========================= */

const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-content");


window.addEventListener("scroll", () => {

    if (!hero || !heroContent) return;


    const scrollPosition = window.scrollY;


    if (scrollPosition < window.innerHeight) {

        heroContent.style.transform =
            `translateY(${scrollPosition * 0.18}px)`;

        hero.style.backgroundPosition =
            `center ${scrollPosition * 0.12}px`;

    }

});


/* =========================
   MOUSE MOVEMENT EFFECT
   ========================= */

const heroSection = document.querySelector(".hero");


if (heroSection && window.innerWidth > 900) {

    heroSection.addEventListener("mousemove", event => {

        const x =
            (event.clientX / window.innerWidth - 0.5) * 10;

        const y =
            (event.clientY / window.innerHeight - 0.5) * 10;


        heroContent.style.transform =
            `translate(${x * 0.35}px, ${y * 0.35}px)`;

    });


    heroSection.addEventListener("mouseleave", () => {

        heroContent.style.transform =
            "translate(0, 0)";

    });

}

/* =========================
   CURRENT YEAR
   ========================= */

const currentYear = new Date().getFullYear();

const footerYear = document.querySelector(".footer-bottom p");

if (footerYear) {

    footerYear.innerHTML =
        `© ${currentYear} MEHRANÉ. All Rights Reserved.`;

}


/* =========================
   DATE RESTRICTION
   ========================= */

const dateInput = document.getElementById("date");


if (dateInput) {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");


    const formattedDate =
        `${year}-${month}-${day}`;


    dateInput.min = formattedDate;

}


/* =========================
   CONSOLE BRANDING
   ========================= */

console.log(
    "%c MEHRANÉ ",
    "background:#c9a45c;color:#0b0907;font-size:20px;padding:8px;"
);

console.log(
    "%c Designed & Developed by Anas Murtaza ",
    "color:#c9a45c;font-size:12px;"
);

