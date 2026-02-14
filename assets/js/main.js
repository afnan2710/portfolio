function createBinary() {
    const container = document.getElementById('binaryContainer');
    const binaryChars = ['0', '1', '//', '{}', '<>', '[]'];

    for (let i = 0; i < 80; i++) {
        const binary = document.createElement('div');
        binary.className = 'binary';
        binary.textContent = binaryChars[Math.floor(Math.random() * binaryChars.length)];
        binary.style.left = Math.random() * 100 + 'vw';
        binary.style.animationDuration = (Math.random() * 15 + 10) + 's';
        binary.style.animationDelay = Math.random() * 10 + 's';
        binary.style.fontSize = (Math.random() * 15 + 10) + 'px';
        binary.style.opacity = Math.random() * 0.5 + 0.1;
        binary.style.color = Math.random() > 0.5 ? 'var(--primary)' : 'var(--secondary)';
        container.appendChild(binary);
    }
}

function createMatrixRain() {
    const container = document.getElementById('matrixRain');
    const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const fontSize = 14;
    const columns = Math.floor(window.innerWidth / fontSize);

    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.style.position = 'absolute';
        column.style.top = '-100px';
        column.style.left = (i * fontSize) + 'px';
        column.style.fontSize = fontSize + 'px';
        column.style.fontFamily = 'monospace';
        column.style.color = 'var(--primary)';
        column.style.opacity = '0.8';
        column.style.textShadow = '0 0 5px var(--primary)';
        column.style.whiteSpace = 'nowrap';
        column.style.animation = `matrixRain ${Math.random() * 5 + 5}s linear infinite`;
        column.style.animationDelay = Math.random() * 5 + 's';

        let text = '';
        for (let j = 0; j < 30; j++) {
            text += characters[Math.floor(Math.random() * characters.length)];
        }

        column.textContent = text;
        container.appendChild(column);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes matrixRain {
            0% { transform: translateY(-100px); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("scrollProgress").style.width = scrolled + "%";
}

function checkScroll() {
    const fadeElements = document.querySelectorAll('.fade-in');

    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function setupCardHoverEffects() {
    const cards = document.querySelectorAll('.project-card, .experience-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function animateName() {
    const phrases = [
        "Hey! I am Afnan",
        "CSE Undergrad",
        "Web Developer",
        "App Developer",
        "UI/UX Designer",
        "AI & ML Enthusiast",
        "HCI Researcher",
        "Innovator"
    ];

    const nameElement = document.getElementById('fullName');
    let phraseIndex = 0;
    let charIndex = 0;
    let isTyping = true;
    let isDeleting = false;
    let isWaiting = false;

    nameElement.style.borderRight = '3px solid var(--primary)';
    nameElement.style.animation = 'blink-caret 0.75s step-end infinite';

    function typeAnimation() {
        const currentPhrase = phrases[phraseIndex];

        if (isTyping && charIndex < currentPhrase.length) {
            nameElement.textContent += currentPhrase.charAt(charIndex);
            charIndex++;
            setTimeout(typeAnimation, 100);
        } else if (isTyping && charIndex >= currentPhrase.length) {
            isTyping = false;
            isWaiting = true;
            setTimeout(typeAnimation, 1500);
        } else if (isWaiting) {
            isWaiting = false;
            isDeleting = true;
            setTimeout(typeAnimation, 300);
        } else if (isDeleting && charIndex > 0) {
            nameElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeAnimation, 50);
        } else if (isDeleting && charIndex <= 0) {
            isDeleting = false;
            isTyping = true;

            phraseIndex = (phraseIndex + 1) % phrases.length;

            setTimeout(typeAnimation, 500);
        }
    }

    setTimeout(typeAnimation, 500);
}

function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.toggle('light-mode', savedTheme === 'light');
    } else if (!prefersDarkScheme.matches) {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');

        const isLightMode = document.body.classList.contains('light-mode');
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
        updateBinaryColors();
    });

    function updateBinaryColors() {
        const binaryElements = document.querySelectorAll('.binary');
        binaryElements.forEach(binary => {
            binary.style.color = Math.random() > 0.5 ? 'var(--primary)' : 'var(--secondary)';
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    createBinary();
    createMatrixRain();
    checkScroll();
    setupMobileMenu();
    setupSmoothScroll();
    setupCardHoverEffects();
    setupThemeToggle();

    animateName();

    window.addEventListener('scroll', () => {
        updateScrollProgress();
        checkScroll();
    });

    updateScrollProgress();
});