   document.addEventListener('DOMContentLoaded', function() {
            console.log('✅ Загрузка завершена. Инициализация эффектов...');
// Предзагрузка критичных изображений
const preloadImages = ['park.jpg', 'venecia_vostochya.jpg'];
preloadImages.forEach(src => {
  const img = new Image();
  img.src = `images/${src}`;
});
// Анимация галереи — бесконечный цикл движения
let position = 0;
let speed = 0.4;
const galleryTrack = document.getElementById('galleryTrack');
const galleryItems = document.querySelectorAll('.gallery-item');
const itemWidth = galleryItems[0]?.offsetWidth + 40 || 510;

function animateGallery() {
    position += speed;
    // Возвращаемся к началу после прохода половины
    if (position >= itemWidth * Math.ceil(galleryItems.length / 2)) {
        position = 0;
    }
    galleryTrack.style.transform = `translateX(-${position}px)`;
    requestAnimationFrame(animateGallery);
}

// Запуск
if (galleryTrack) animateGallery();

// Замедление при наведении
galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => speed = 0.1);
    item.addEventListener('mouseleave', () => speed = 0.4);
});

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
                    themeIcon.className = 'fas fa-sun';
                    themeTexts.forEach(t => {
                        if (t.classList.contains('lang-zh')) t.textContent = 'Светлая';
                        else if (t.classList.contains('lang-en')) t.textContent = 'Light';
                        else t.textContent = 'Светлая';
                    });
                } else {
                    themeIcon.className = 'fas fa-moon';
                    themeTexts.forEach(t => {
                        if (t.classList.contains('lang-zh')) t.textContent = 'Темная';
                        else if (t.classList.contains('lang-en')) t.textContent = 'Dark';
                        else t.textContent = 'Темная';
                    });
                }
            }

            // Загрузка сохранённой темы или системной
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

            
            // ========== ДРАКОНЫ (вместо облаков в светлой теме) ==========

  // ========== ОБЛАКА (вместо драконов) ==========
function createClouds() {
    const cloudsContainer = document.getElementById('cloudsContainer');
    if (!cloudsContainer) return;

    // Простое SVG-облако в стиле китайской акварели
    const cloudSVG = `<svg viewBox="0 0 200 80" width="200" height="80" xmlns="http://www.w3.org/2000/svg">
        <path class="cloud-base" d="M20,30 Q40,10 70,20 Q100,5 130,20 Q160,10 180,30 Q170,45 150,40 Q130,55 100,45 Q70,55 40,40 Q20,45 10,30 Z"/>
    </svg>`;

    // 8 облаков — разный размер, высота, скорость
    const configs = [
        { w: 180, h: 70, top: '12%', delay: 0,   duration: 110 },
        { w: 220, h: 85, top: '25%', delay: 25,  duration: 140 },
        { w: 150, h: 60, top: '8%',  delay: 55,  duration: 90  },
        { w: 200, h: 75, top: '20%', delay: 95,  duration: 125 },
        { w: 170, h: 65, top: '16%', delay: 140, duration: 105 },
        { w: 210, h: 80, top: '28%', delay: 180, duration: 135 },
        { w: 160, h: 62, top: '10%', delay: 220, duration: 95  },
        { w: 190, h: 72, top: '22%', delay: 260, duration: 120 }
    ];

    configs.forEach(({ w, h, top, delay, duration }, i) => {
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
        cloud.style.opacity = '0.88';
        cloud.style.filter = 'blur(1.5px) drop-shadow(0 2px 6px rgba(255,255,255,0.25))';
        cloudsContainer.appendChild(cloud);
    });
}          // ========== ЗВЁЗДЫ ==========
            function createStars() {
                const starsBg = document.getElementById('starsBg');
                if (!starsBg) return;

                const starCount = 250;
                for (let i = 0; i < starCount; i++) {
                    const star = document.createElement('div');
                    star.classList.add('star');

                    const size = Math.random() * 2.5 + 0.5;
                    const left = Math.random() * 100;
                    const top = Math.random() * 100;
                    const delay = Math.random() * 5;
                    const duration = Math.random() * 3 + 2;
                    const twinkleSpeed = Math.random() * 4 + 2;

                    star.style.width = `${size}px`;
                    star.style.height = `${size}px`;
                    star.style.left = `${left}%`;
                    star.style.top = `${top}%`;
                    star.style.animationDelay = `${delay}s`;
                    star.style.animationDuration = `${duration}s`;
                    star.style.opacity = Math.random() > 0.7 ? '1' : '0.6';
                    star.style.animation = `twinkle ${twinkleSpeed}s infinite ease-in-out`;

                    starsBg.appendChild(star);
                }
            }

            // ========== ФОНАРИКИ ==========
            function createSingleLantern() {
                const container = document.getElementById('lanternsContainer');
                if (!container) return null;

                const lantern = document.createElement('div');
                lantern.classList.add('lantern');

                // Случайная позиция (избегаем краёв)
                const left = Math.random() * 85 + 7.5; // 7.5% - 92.5%
                const top = Math.random() * 60 + 15;  // 15% - 75%
                lantern.style.left = `${left}%`;
                lantern.style.top = `${top}%`;
                lantern.style.animationDelay = `${Math.random() * 4}s`;

                // Структура фонарика
                const body = document.createElement('div');
                body.classList.add('lantern-body');
                body.innerHTML = '<i class="fas fa-star" style="font-size:10px"></i>';

                const topPart = document.createElement('div');
                topPart.classList.add('lantern-top');

                const bottomPart = document.createElement('div');
                bottomPart.classList.add('lantern-bottom');

                const tassel = document.createElement('div');
                tassel.classList.add('lantern-tassel');

                lantern.append(body, topPart, bottomPart, tassel);
                container.appendChild(lantern);

                // Обработчик клика — ✅ РАБОТАЕТ
                lantern.addEventListener('click', function(e) {
                    e.stopPropagation();

                    // 1. Очищаем предыдущие состояния
                    lantern.classList.remove('flying');
                    lantern.style.animation = 'none';
                    void lantern.offsetHeight; // reflow

                    // 2. Смещение
                    const dx = (Math.random() - 0.5) * 80;  // ±40px
                    const dy = (Math.random() - 0.5) * 60;  // ±30px
                    const dr = (Math.random() - 0.5) * 90;  // ±45°

                    lantern.style.setProperty('--lantern-dx', dx + 'px');
                    lantern.style.setProperty('--lantern-dy', dy + 'px');
                    lantern.style.setProperty('--lantern-dr', dr + 'deg');

                    // 3. Запускаем анимацию
                    lantern.classList.add('flying');

                    // 4. По окончании — удаляем и создаём новый
                    const cleanup = () => {
                        if (lantern.parentNode) lantern.remove();
                        setTimeout(createSingleLantern, 250);
                        lantern.removeEventListener('animationend', cleanup);
                    };
                    lantern.addEventListener('animationend', cleanup, { once: true });
                });

                return lantern;
            }

            function createLanterns(count = 12) {
                for (let i = 0; i < count; i++) {
                    setTimeout(() => {
                        const l = createSingleLantern();
                        if (l && Math.random() > 0.7) {
                            l.style.animationDelay = '0s';
                        }
                    }, i * 180);
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
                leaf.style.animationDelay = `${Math.random() * 0.5}s`;
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
                    topMenu.style.height = menuPanel.classList.contains('active') ? '60px' : (window.scrollY > 50 ? '70px' : '80px');
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

           //Язычок//
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
           // Запуск облаков (8 шт) и звёзд
console.log('✅ Создаём облака...');
createClouds();
console.log('✅ Создаём звёзды...');
createStars();
            // Фонарики — только в тёмной теме ИЛИ при переключении
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                console.log('✅ Тема: тёмная → создаём фонарики');
                createLanterns(12);
            }

            // Слушатель на изменение темы: создаём/удаляем фонарики
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
            });
            observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
// Убираем загрузочный экран
setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.animation = 'fadeOutLoader 0.6s forwards';
        setTimeout(() => loader.remove(), 600);
    }
}, 800);
            console.log('🎉 Инициализация завершена. Сайт готов к работе.');
        });