document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // ===============================
    // CARROSSEL HERO E EFEITOS TOUCH 
    // ===============================
    const heroSection = document.getElementById('hero-section');
    const heroTrack = document.getElementById('hero-track');
    const prevHero = document.getElementById('prev-hero');
    const nextHero = document.getElementById('next-hero');
    const heroDots = document.getElementById('hero-dots');
    const floatingLogo = document.getElementById('floating-hero-logo');

    if (heroTrack && heroDots) {
        const slides = heroTrack.children;
        const totalSlides = slides.length;
        let currentHeroSlide = 0;
        
        let heroAutoPlay = null; 
        const AUTO_PLAY_DELAY = 10000;

        function startAutoPlay() {
            if (heroAutoPlay) clearInterval(heroAutoPlay);
            heroAutoPlay = setInterval(() => {
                goToHeroSlide(currentHeroSlide + 1, false);
            }, AUTO_PLAY_DELAY);
        }

        function stopAutoPlay() {
            if (heroAutoPlay) clearInterval(heroAutoPlay);
            heroAutoPlay = null;
        }

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('w-6', 'h-3', 'border-2', 'border-black', 'bg-white', 'transition-colors', 'cursor-pointer');
            dot.addEventListener('click', () => goToHeroSlide(i, true));
            heroDots.appendChild(dot);
        }

        const updateHeroUI = () => {
            Array.from(heroDots.children).forEach((dot, index) => {
                dot.classList.remove('bg-[#0055ff]', 'bg-[#ff00ff]', 'bg-white');
                if (index === currentHeroSlide) {
                    dot.classList.add(index === 0 ? 'bg-[#0055ff]' : 'bg-[#ff00ff]');
                } else {
                    dot.classList.add('bg-white');
                }
            });

            if (floatingLogo) {
                if (currentHeroSlide === 0) {
                    floatingLogo.classList.add('logo-state-center');
                    floatingLogo.classList.remove('logo-state-corner');
                } else {
                    floatingLogo.classList.add('logo-state-corner');
                    floatingLogo.classList.remove('logo-state-center');
                }
            }
        };

        const goToHeroSlide = (index, manual = false) => {
            if (index < 0) index = totalSlides - 1; 
            if (index >= totalSlides) index = 0;    
            
            currentHeroSlide = index;
            heroTrack.style.transform = `translateX(-${currentHeroSlide * 100}%)`;
            updateHeroUI(); 
            
            if (manual) {
                startAutoPlay();
            }
        };

        if (prevHero) prevHero.addEventListener('click', () => {
            stopAutoPlay();
            goToHeroSlide(currentHeroSlide - 1, true);
        });
        
        if (nextHero) nextHero.addEventListener('click', () => {
            stopAutoPlay();
            goToHeroSlide(currentHeroSlide + 1, true);
        });

        updateHeroUI();
        startAutoPlay();

        heroTrack.parentElement.addEventListener('mouseenter', stopAutoPlay);
        heroTrack.parentElement.addEventListener('mouseleave', startAutoPlay);

        // SWIPE
        let touchStartX = 0;
        let touchEndX = 0;

        heroTrack.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        }, {passive: true});

        heroTrack.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) {
                goToHeroSlide(currentHeroSlide + 1, true); 
            } else if (touchEndX > touchStartX + 50) {
                goToHeroSlide(currentHeroSlide - 1, true); 
            } else {
                startAutoPlay();
            }
        }, {passive: true});

        // RASTRO DE LUZ
        let lastTouchX = null;
        let lastTouchY = null;

        if (heroSection) {
            heroSection.addEventListener('touchstart', (e) => {
                if(window.matchMedia("(pointer: coarse)").matches) {
                    const rect = heroSection.getBoundingClientRect();
                    lastTouchX = e.touches[0].clientX - rect.left;
                    lastTouchY = e.touches[0].clientY - rect.top;
                }
            }, {passive: true});

            heroSection.addEventListener('touchmove', (e) => {
                if(window.matchMedia("(pointer: coarse)").matches) {
                    const rect = heroSection.getBoundingClientRect();
                    const currentX = e.touches[0].clientX - rect.left;
                    const currentY = e.touches[0].clientY - rect.top;

                    if (lastTouchX !== null && lastTouchY !== null) {
                        const dx = currentX - lastTouchX;
                        const dy = currentY - lastTouchY;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

                        if (distance > 2) {
                            const segment = document.createElement('div');
                            segment.classList.add('touch-trail-segment');
                            segment.style.width = distance + 'px';
                            segment.style.left = lastTouchX + 'px';
                            segment.style.top = lastTouchY + 'px';
                            segment.style.transform = `rotate(${angle}deg)`;

                            const inner = document.createElement('div');
                            inner.classList.add('touch-trail-inner');
                            
                            segment.appendChild(inner);
                            heroSection.appendChild(segment);

                            setTimeout(() => { segment.remove(); }, 400);

                            lastTouchX = currentX;
                            lastTouchY = currentY;
                        }
                    } else {
                        lastTouchX = currentX;
                        lastTouchY = currentY;
                    }
                }
            }, {passive: true});

            heroSection.addEventListener('touchend', () => {
                lastTouchX = null;
                lastTouchY = null;
            }, {passive: true});
        }
    }

    // ANIMAÇÃO EA FC 26
    const fcPlayerRender = document.getElementById('fc-player-render');
    if(fcPlayerRender) {
        const renderPoolFC = [
            '/assets/render-vini.png',
            '/assets/render-marta.png',
            '/assets/render-bell.png',
            '/assets/render-haaland.png',
            '/assets/render-cr7.png'
        ];
        let currentIndexFC = 0;
        fcPlayerRender.style.transition = 'all 0.6s ease-in-out';

        setInterval(() => {
            fcPlayerRender.style.opacity = '0';
            fcPlayerRender.style.transform = 'translateX(-60px) scale(0.95)';
            
            setTimeout(() => {
                currentIndexFC = (currentIndexFC + 1) % renderPoolFC.length;
                fcPlayerRender.src = renderPoolFC[currentIndexFC];
                fcPlayerRender.style.transition = 'none';
                fcPlayerRender.style.transform = 'translateX(60px) scale(0.95)';
                void fcPlayerRender.offsetWidth;
                fcPlayerRender.style.transition = 'all 0.6s ease-out';
                fcPlayerRender.style.opacity = '1';
                fcPlayerRender.style.transform = 'translateX(0px) scale(1)';
            }, 600); 
        }, 4000); 
    }

    // ANIMAÇÃO MORTAL KOMBAT 11
    const mkPlayerRender = document.getElementById('mk-player-render');
    if(mkPlayerRender) {
        const renderPoolMK = [
            '/assets/full-1.png',
            '/assets/full-2.png',
            '/assets/full-3.png',
            '/assets/full-4.png',
            '/assets/full-5.png'
        ];
        let currentIndexMK = 0;
        mkPlayerRender.style.transition = 'all 0.6s ease-in-out';

        setInterval(() => {
            mkPlayerRender.style.opacity = '0';
            mkPlayerRender.style.transform = 'translateX(60px) scale(0.95)';
            
            setTimeout(() => {
                currentIndexMK = (currentIndexMK + 1) % renderPoolMK.length;
                mkPlayerRender.src = renderPoolMK[currentIndexMK];
                mkPlayerRender.style.transition = 'none';
                mkPlayerRender.style.transform = 'translateX(-60px) scale(0.95)';
                void mkPlayerRender.offsetWidth;
                mkPlayerRender.style.transition = 'all 0.6s ease-out';
                mkPlayerRender.style.opacity = '1';
                mkPlayerRender.style.transform = 'translateX(0px) scale(1)';
            }, 600); 
        }, 4500); 
    }
});