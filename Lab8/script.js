const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});


let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-slide img');
const totalSlides = slides.length;
const slideContainer = document.getElementById('carousel-slide');
const indicatorsContainer = document.getElementById('indicators');


slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.onclick = () => goToSlide(i);
    indicatorsContainer.appendChild(dot);
});

function updateIndicators() {
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

function moveSlide(step) {
    currentIndex = (currentIndex + step + totalSlides) % totalSlides;
    slideContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateIndicators();
}

function goToSlide(index) {
    currentIndex = index;
    slideContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateIndicators();
}


setInterval(() => moveSlide(1), 5000);
