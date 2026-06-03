document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Загрузка завершена. Инициализация эффектов...');
    
    // Предзагрузка критичных изображений
    const preloadImages = ['park.jpg', 'venecia_vostochya.jpg'];
    preloadImages.forEach(src => {
        const img = new Image();
        img.src = `images/${src}`;
    });
    
    // Анимация галереи
   

// Анимация галереи — можно перетаскивать мышкой
let position = 0;
let speed = 0.4;
let isDragging = false;
let startX = 0;
let startPosition = 0;

// Анимация галереи — можно перетаскивать мышкой
const galleryTrack = document.getElementById('galleryTrack');
const galleryWrapper = document.getElementById('galleryWrapper');
const galleryItems = document.querySelectorAll('.gallery-item');

// Проверяем, что галерея существует на странице
if (galleryTrack && galleryWrapper && galleryItems.length > 0) {
    let position = 0;
    let speed = 0.4;
    let isDragging = false;
    let startX = 0;
    let startPosition = 0;
    const itemWidth = galleryItems[0]?.offsetWidth + 40 || 510;

    function animateGallery() {
        if (!isDragging) {
            position += speed;
            if (position >= itemWidth * galleryItems.length) {
                position = 0;
            }
        }
        galleryTrack.style.transform = `translateX(-${position}px)`;
        requestAnimationFrame(animateGallery);
    }

    animateGallery();

    // Перетаскивание мышкой
    galleryTrack.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startPosition = position;
        galleryTrack.style.cursor = 'grabbing';
        galleryTrack.style.transition = 'none';
        e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = startX - e.clientX;
        let newPosition = startPosition + dx;
        
        if (newPosition < 0) newPosition = 0;
        
        const trackWidth = galleryTrack.scrollWidth;
        const wrapperWidth = galleryWrapper.offsetWidth;
        const maxPosition = trackWidth - wrapperWidth;
        
        if (maxPosition > 0 && newPosition > maxPosition) {
            newPosition = maxPosition;
        }
        
        position = newPosition;
    });

    window.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            galleryTrack.style.cursor = 'grab';
            galleryTrack.style.transition = 'transform 0.3s ease';
        }
    });

    // Замедление при наведении
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => { if (!isDragging) speed = 0.1; });
        item.addEventListener('mouseleave', () => { if (!isDragging) speed = 0.4; });
    });
}

    // ========== ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ ==========
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    const themeTexts = themeToggle ? document.querySelectorAll('.theme-text') : [];

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        document.body.classList.add('theme-switching');
        setTimeout(() => document.body.classList.remove('theme-switching'), 600);

        if (theme === 'dark') {
            if (themeIcon) themeIcon.className = 'fas fa-sun';
            themeTexts.forEach(t => {
                if (t.classList.contains('lang-zh')) t.textContent = 'Светлая';
                else if (t.classList.contains('lang-en')) t.textContent = 'Light';
                else t.textContent = 'Светлая';
            });
        } else {
            if (themeIcon) themeIcon.className = 'fas fa-moon';
            themeTexts.forEach(t => {
                if (t.classList.contains('lang-zh')) t.textContent = 'Темная';
                else if (t.classList.contains('lang-en')) t.textContent = 'Dark';
                else t.textContent = 'Темная';
            });
        }
    }

    const savedTheme = localStorage.getItem('theme') ||
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
        });
    }

    // ========== ОБЛАКА ==========
    function createClouds() {
        const cloudsContainer = document.getElementById('cloudsContainer');
        if (!cloudsContainer) return;

        const cloudSVG = `<svg viewBox="0 0 200 80" width="200" height="80" xmlns="http://www.w3.org/2000/svg">
            <path class="cloud-base" d="M20,30 Q40,10 70,20 Q100,5 130,20 Q160,10 180,30 Q170,45 150,40 Q130,55 100,45 Q70,55 40,40 Q20,45 10,30 Z"/>
        </svg>`;

        const configs = [
            { w: 180, h: 70, top: '12%', delay: 0,   duration: 110 },
            { w: 220, h: 85, top: '25%', delay: 15,  duration: 140 },
            { w: 150, h: 60, top: '8%',  delay: 30,  duration: 90  },
            { w: 200, h: 75, top: '20%', delay: 45,  duration: 125 },
            { w: 170, h: 65, top: '16%', delay: 60,  duration: 105 },
            { w: 210, h: 80, top: '28%', delay: 75,  duration: 135 },
            { w: 160, h: 62, top: '10%', delay: 90,  duration: 95  },
            { w: 190, h: 72, top: '22%', delay: 105, duration: 120 },
            { w: 230, h: 90, top: '30%', delay: 10,  duration: 150 },
            { w: 140, h: 55, top: '15%', delay: 20,  duration: 85  },
            { w: 195, h: 78, top: '18%', delay: 50,  duration: 130 },
            { w: 175, h: 68, top: '24%', delay: 70,  duration: 100 }
        ];

        configs.forEach(({ w, h, top, delay, duration }) => {
            const cloud = document.createElement('div');
            cloud.className = 'cloud';
            cloud.innerHTML = cloudSVG;
            cloud.style.width = `${w}px`;
            cloud.style.height = `${h}px`;
            cloud.style.top = top;
            cloud.style.left = '-250px';
            cloud.style.animationName = 'cloudMove';
            cloud.style.animationDuration = `${duration}s`;
            cloud.style.animationDelay = `${delay}s`;
            cloud.style.animationTimingFunction = 'linear';
            cloud.style.animationIterationCount = 'infinite';
            cloud.style.opacity = '0.85';
            cloud.style.filter = 'blur(1.5px) drop-shadow(0 2px 6px rgba(255,255,255,0.25))';
            cloudsContainer.appendChild(cloud);
        });
    }

    // ========== ЗВЁЗДЫ ==========
    function createStars() {
        const starsBg = document.getElementById('starsBg');
        if (!starsBg) return;

        const currentTheme = document.documentElement.getAttribute('data-theme');
        const starCount = 200;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');

            const size = Math.random() * 2.5 + 0.5;
            const left = Math.random() * 100;
            const top = Math.random() * 100;

            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${left}%`;
            star.style.top = `${top}%`;
            star.style.opacity = Math.random() > 0.7 ? '1' : '0.6';
            star.style.animation = `twinkle ${Math.random() * 4 + 2}s infinite ease-in-out`;
            
            // Скрываем в светлой теме
            if (currentTheme === 'light') {
                star.style.display = 'none';
            }

            starsBg.appendChild(star);
        }
    }

    function toggleStarsVisibility() {
        const stars = document.querySelectorAll('.star');
        const theme = document.documentElement.getAttribute('data-theme');
        stars.forEach(star => {
            star.style.display = theme === 'dark' ? 'block' : 'none';
        });
    }

    // ========== ФОНАРИКИ ==========
    function createSingleLantern() {
        const container = document.getElementById('lanternsContainer');
        if (!container) return null;

        const lantern = document.createElement('div');
        lantern.classList.add('lantern');

        const positions = [
            { left: '5%', top: '8%' },
            { left: '18%', top: '12%' },
            { left: '32%', top: '6%' },
            { left: '48%', top: '10%' },
            { left: '62%', top: '7%' },
            { left: '75%', top: '13%' },
            { left: '88%', top: '5%' },
            { left: '10%', top: '22%' },
            { left: '28%', top: '18%' },
            { left: '45%', top: '20%' },
            { left: '65%', top: '16%' },
            { left: '82%', top: '21%' }
        ];

        const pos = positions[Math.floor(Math.random() * positions.length)];
        
        lantern.style.left = pos.left;
        lantern.style.top = pos.top;

        const sizes = ['700px', '860px', '600px', '1000px', '900px', '750px'];
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];

        const img = document.createElement('img');
        img.src = 'images/фонарь (2).png';
        img.alt = 'Фонарь';
        img.style.width = randomSize;
        img.style.height = 'auto';
        img.style.filter = 'drop-shadow(0 0 30px rgba(255, 120, 30, 0.8))';
        img.style.pointerEvents = 'none';
        
        lantern.appendChild(img);
        container.appendChild(lantern);

        lantern.style.animation = `sway ${Math.random() * 3 + 3}s infinite ease-in-out`;
        lantern.style.animationDelay = `${Math.random() * 2}s`;

        return lantern;
    }

    function createLanterns(count = 12) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                createSingleLantern();
            }, i * 150);
        }
    }

    // ========== БОНСАЙ ЛИСТЬЯ ==========
    function createBonsaiLeaf(x, y) {
        const container = document.getElementById('bonsaiContainer');
        if (!container) return;

        const leaf = document.createElement('div');
        leaf.classList.add('bonsai-leaf');

        const size = Math.random() * 15 + 10;
        leaf.style.width = `${size}px`;
        leaf.style.height = `${size}px`;
        leaf.style.left = `${x}px`;
        leaf.style.top = `${y}px`;
        leaf.style.animationDuration = `${Math.random() * 2 + 1}s`;
        leaf.style.setProperty('--random-x', (Math.random() - 0.5) * 2);
        leaf.style.setProperty('--random-y', Math.random() * 1.5 + 0.5);
        leaf.style.setProperty('--random-rotate', Math.random() * 360);
        leaf.style.filter = `hue-rotate(${Math.random() * 20 + 330}deg) brightness(1.1)`;

        container.appendChild(leaf);
        leaf.addEventListener('animationend', () => {
            if (leaf.parentNode) leaf.remove();
        }, { once: true });
    }

    // ========== КУРСОРНЫЕ ЛЕПЕСТКИ ==========
    const toggleCursorBtn = document.getElementById('toggleCursorBtn');
    let cursorPetalsEnabled = localStorage.getItem('cursorPetalsEnabled') !== 'false';

    if (!cursorPetalsEnabled) {
        document.body.classList.add('no-cursor-petals');
        if (toggleCursorBtn) toggleCursorBtn.classList.add('active');
    }

    if (toggleCursorBtn) {
        toggleCursorBtn.addEventListener('click', () => {
            cursorPetalsEnabled = !cursorPetalsEnabled;
            document.body.classList.toggle('no-cursor-petals', !cursorPetalsEnabled);
            toggleCursorBtn.classList.toggle('active', !cursorPetalsEnabled);
            localStorage.setItem('cursorPetalsEnabled', cursorPetalsEnabled);
        });
    }

    document.addEventListener('mousemove', e => {
        if (cursorPetalsEnabled) createBonsaiLeaf(e.clientX, e.clientY);
    });

    document.addEventListener('click', e => {
        if (!e.target.closest('.lantern')) {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => createBonsaiLeaf(e.clientX, e.clientY), i * 100);
            }
        }
    });

    document.querySelectorAll('.btn, .menu-item').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            const rect = this.getBoundingClientRect();
            for (let i = 0; i < 3; i++) {
                setTimeout(() => createBonsaiLeaf(rect.left + rect.width/2, rect.top + rect.height/2), i * 100);
            }
        });
    });

    // ========== МЕНЮ ==========
    const menuToggle = document.getElementById('menuToggle');
    const menuPanel = document.getElementById('menuPanel');
    const topMenu = document.getElementById('topMenu');

    if (menuToggle && menuPanel && topMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            menuPanel.classList.toggle('active');
        });
    }

    // ========== АНИМАЦИИ ПРИ ПРОКРУТКЕ ==========
    const animateOnScroll = () => {
        document.querySelectorAll('.featured-section, .gallery-title, .scroll-effect').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('load', () => {
        document.querySelectorAll('.featured-section, .gallery-title, .scroll-effect').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = 'opacity 1s ease, transform 1s ease';
        });
        setTimeout(animateOnScroll, 600);
    });

    window.addEventListener('scroll', animateOnScroll);

    // ========== ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКА ==========
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');

    function toggleLanguage(lang) {
        document.querySelectorAll('.lang-zh, .lang-en, .lang-ru').forEach(el => el.style.display = 'none');
        document.querySelectorAll(`.lang-${lang}`).forEach(el => el.style.display = '');
        if (languageDropdown) languageDropdown.classList.remove('active');
        localStorage.setItem('preferredLanguage', lang);
    }

    const savedLang = localStorage.getItem('preferredLanguage') || 'zh';
    toggleLanguage(savedLang);

    if (languageBtn && languageDropdown) {
        languageBtn.addEventListener('click', e => {
            e.stopPropagation();
            languageDropdown.classList.toggle('active');
        });

        document.querySelectorAll('.language-dropdown a').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                toggleLanguage(link.dataset.lang);
            });
        });

        document.addEventListener('click', () => {
            if (languageDropdown) languageDropdown.classList.remove('active');
        });

        languageDropdown.addEventListener('click', e => e.stopPropagation());
    }

    // ========== ЗАПУСК ВСЕХ ЭФФЕКТОВ ==========
    console.log('✅ Создаём облака...');
    createClouds();
    console.log('✅ Создаём звёзды...');
    createStars();
    
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        console.log('✅ Тема: тёмная → создаём фонарики');
        createLanterns(12);
    }

    const observer = new MutationObserver(() => {
        const theme = document.documentElement.getAttribute('data-theme');
        const lanterns = document.querySelectorAll('.lantern');
        if (theme === 'dark' && lanterns.length === 0) {
            console.log('🌙 Тема → тёмная: создаём фонарики');
            createLanterns(12);
        } else if (theme === 'light' && lanterns.length > 0) {
            console.log('☀️ Тема → светлая: удаляем фонарики');
            lanterns.forEach(l => l.remove());
        }
        toggleStarsVisibility();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.animation = 'fadeOutLoader 0.6s forwards';
            setTimeout(() => loader.remove(), 600);
        }
    }, 800);
    
    console.log('🎉 Инициализация завершена. Сайт готов к работе.');
});