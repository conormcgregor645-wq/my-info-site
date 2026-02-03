// Анимация появления при скролле
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

// Подсветка активного раздела в меню
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
// Плавная прокрутка при клике на меню
const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault(); // отменяем стандартное поведение

        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        const headerOffset = 70; // высота хедера
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    });
});

