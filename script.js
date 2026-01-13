/**
 * Glimpse Style Application Script
 */
document.addEventListener('DOMContentLoaded', () => {

    /**
     * Configuration for localization.
     */
    const config = {
        defaultLocale: 'en-GB',
        supportedLocales: ['en-GB', 'en-US', 'ja', 'ko'],
        translations: {
            'en-GB': {
                "nav-logo": "Glimpse. Genou",
                "hero-title": "New connections.",
                "hero-subtitle": "Aiming to bring joy to the world.",
                "hero-button": "Find out more",
                "modal-title": "Social Media",
                "modal-youtube-id": "Glimpse. Genou",
                "modal-visit": "Visit",
                "content-title": "Upcoming Content",
                "game1-title": "Genshin Impact",
                "game2-title": "Honkai: Star Rail",
                "game3-title": "Zenless Zone Zero",
                "game4-title": "Minecraft",
                "game5-title": "Wuthering Waves",
                "game6-title": "Neverness To Everness",
                "game7-title": "Honkai: Nexus Anima",
                "music-card-title": "Music"
            },
            'en-US': {
                "nav-logo": "Glimpse. Genou",
                "hero-title": "New connections.",
                "hero-subtitle": "Aiming to bring joy to the world.",
                "hero-button": "Learn More",
                "modal-title": "Social Media",
                "modal-youtube-id": "Glimpse. Genou",
                "modal-visit": "Visit",
                "content-title": "Content to be published",
                "game1-title": "Genshin Impact",
                "game2-title": "Honkai: Star Rail",
                "game3-title": "Zenless Zone Zero",
                "game4-title": "Minecraft",
                "game5-title": "Wuthering Waves",
                "game6-title": "Neverness To Everness",
                "game7-title": "Honkai: Nexus Anima",
                "music-card-title": "Music"
            },
            'ja': {
                "nav-logo": "幻櫻いろは",
                "hero-title": "新しい交流を。",
                "hero-subtitle": "世界中に喜びを届けることを目指して。",
                "hero-button": "更に詳しく",
                "modal-title": "ソーシャルメディア",
                "modal-youtube-id": "幻櫻いろは",
                "modal-visit": "見に行く",
                "content-title": "公開予定のコンテンツ",
                "game1-title": "原神",
                "game2-title": "崩壊：スターレイル",
                "game3-title": "ゼンレスゾーンゼロ",
                "game4-title": "マインクラフト",
                "game5-title": "鳴潮 (Wuthering Waves)",
                "game6-title": "ネヴァネス・トゥ・エヴァネス",
                "game7-title": "崩壊：ネクサスアニマ",
                "music-card-title": "ミュージック"
            },
            'ko': {
                "nav-logo": "겐오 이로하",
                "hero-title": "새로운 교류를.",
                "hero-subtitle": "세상에 즐거움을 선사하는 것을 목표로.",
                "hero-button": "더 알아보기",
                "modal-title": "소셜 미디어",
                "modal-youtube-id": "겐오 이로하",
                "modal-visit": "방문하기",
                "content-title": "공개 예정 콘텐츠",
                "game1-title": "원신",
                "game2-title": "붕괴: 스타레일",
                "game3-title": "젠레스 존 제로",
                "game4-title": "마인크래프트",
                "game5-title": "명조: 워더링 웨이브",
                "game6-title": "네버니스 투 에버니스",
                "game7-title": "붕괴: 넥서스 애니마",
                "music-card-title": "음악"
            }
        }
    };

    /**
     * Finds the best matching supported locale from browser languages.
     */
    function getBestLocale() {
        const supported = new Set(config.supportedLocales);
        for (const lang of navigator.languages) {
            if (supported.has(lang)) return lang;
            const langBase = lang.split('-')[0];
            if (supported.has(langBase)) return langBase;
        }
        return config.defaultLocale;
    }

    /**
     * Applies translations to the page.
     */
    function initLocalization() {
        const locale = getBestLocale();
        const langData = config.translations[locale] || config.translations[config.defaultLocale];

        document.documentElement.lang = locale.split('-')[0];

        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (langData[key]) {
                element.textContent = langData[key];
            }
        });
    }

    /**
     * Sets up intersection observer for fade-in animations with staggered delay.
     */
    function initScrollAnimations() {
        const targets = document.querySelectorAll('.fade-in-target');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger effect
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 50); // 50ms delay per item in the batch
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });
        targets.forEach(target => { observer.observe(target); });
    }

    /**
     * Sets up smooth scrolling for anchor links.
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            if (anchor.id.includes('modal')) return;

            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetElement = document.querySelector(this.getAttribute('href'));
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    /**
     * Initializes the social media modal with refined logic.
     */
    function initModal() {
        const modal = document.getElementById('social-modal');
        const modalContent = modal ? modal.querySelector('.modal-content') : null;
        const openModalButton = document.getElementById('open-social-modal');
        const closeModalButton = document.getElementById('close-social-modal');

        if (!modal || !modalContent || !openModalButton || !closeModalButton) return;

        const openModal = () => {
            modal.classList.add('visible');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            setTimeout(() => {
                modalContent.classList.add('visible');
            }, 10);
        };

        const closeModal = () => {
            modalContent.classList.remove('visible');
            setTimeout(() => {
                modal.classList.remove('visible');
                document.body.style.overflow = '';
            }, 400); // Wait for transition
        };

        openModalButton.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });

        closeModalButton.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && modal.classList.contains('visible')) {
                closeModal();
            }
        });
    }

    // --- Run all initializers ---
    initLocalization();
    initScrollAnimations();
    initSmoothScroll();
    initModal();

});
