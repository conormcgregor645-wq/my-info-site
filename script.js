// Находим все элементы с классом .fade-in
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.1, // процент видимости элемента, когда анимация срабатывает
    rootMargin: "0px 0px -50px 0px"
};

// Создаем наблюдателя (Intersection Observer)
const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
    });
}, appearOptions);

// Подключаем наблюдателя к каждому элементу
faders.forEach(fader => {
    appearOnScroll.observe(fader);
});
