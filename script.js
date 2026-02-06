// ======================================
// 1️⃣ Анимация появления при скролле
// ======================================
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// ======================================
// 2️⃣ Подсветка активного раздела
// ======================================
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 70;
        if (pageYOffset >= sectionTop) current = section.getAttribute("id");
    });

    navLi.forEach(a => {
        a.classList.remove("active");
        if (a.getAttribute("href") === "#" + current) a.classList.add("active");
    });
});

// ======================================
// 3️⃣ Плавная прокрутка при кликах на меню
// ======================================
const navLinks = document.querySelectorAll("nav ul li a");
navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        const headerOffset = 70;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    });
});

// ======================================
// 4️⃣ Кнопка Наверх
// ======================================
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
    scrollTopBtn.style.display =
        (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300)
            ? "block"
            : "none";
});

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ======================================
// 5️⃣ Загрузка новостей (ОДИН раз)
// ======================================
async function loadNews() {
    try {
        const response = await fetch("news.json");
        if (!response.ok) throw new Error("Не удалось загрузить news.json");

        const news = await response.json();
        const container = document.getElementById("newsContainer");

        if (!container) return;

        container.innerHTML = ""; // очищаем перед отрисовкой

        news.forEach(item => {
            const card = document.createElement("div");
            card.className = "news-item";

            card.innerHTML = `
                <img src="${item.img}" alt="${item.title}">
                <h3>${item.title}</h3>
                <span class="date">${item.date}</span>
                <p>${item.text}</p>
                <a href="${item.link}" class="btn">Читать подробнее</a>
            `;

            container.appendChild(card);
        });

    } catch (e) {
        console.error("Ошибка загрузки новостей:", e);
    }
}

document.addEventListener("DOMContentLoaded", loadNews);
