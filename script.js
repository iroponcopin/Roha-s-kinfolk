// --- 多言語対応機能 & 初期化 ---
document.addEventListener('DOMContentLoaded', () => {
    // 翻訳データ
    const translations = {
        en: { 
            "nav-logo": "IROHA. Genou", 
            // "nav-social": "Social Media", // [削除]
            "hero-title": "New connections.", 
            "hero-subtitle": "Aiming to bring joy to the world.", 
            "hero-button": "Learn More", 
            "modal-title": "Social Media", // [変更]
            "modal-youtube-id": "IROHA. Genou", // [変更]
            "modal-visit": "Visit", // [変更]
            "games-title": "Content title to be published", 
            "game1-title": "Genshin Impact", 
            "game2-title": "Honkai: Star Rail", 
            "game3-title": "Zenless Zone Zero", 
            "game4-title": "Minecraft", 
            "game5-title": "Wuthering Waves", 
            "game6-title": "Neverness To Everness",
            "game7-title": "Honkai: Nexus Anima",
            "music-card-title": "Music"
        },
        ja: { 
            "nav-logo": "幻櫻いろは", 
            // "nav-social": "ソーシャルメディア", // [削除]
            "hero-title": "新しい交流を。", 
            "hero-subtitle": "世界中に喜びを届けることを目指して。", 
            "hero-button": "更に詳しく", 
            "modal-title": "ソーシャルメディア", // [変更]
            "modal-youtube-id": "幻櫻いろは", // [変更]
            "modal-visit": "見に行く", // [変更]
            "games-title": "公開予定のコンテンツ", 
            "game1-title": "原神", 
            "game2-title": "崩壊：スターレイル", 
            "game3-title": "ゼンレスゾーンゼロ", 
            "game4-title": "マインクラフト", 
            "game5-title": "鳴潮 (Wuthering Waves)", 
            "game6-title": "ネヴァネス・トゥ・エヴァネス",
            "game7-title": "崩壊：ネクサスアニマ",
            "music-card-title": "ミュージック"
        },
        ko: { 
            "nav-logo": "겐오 이로하", 
            // "nav-social": "소셜 미디어", // [削除]
            "hero-title": "새로운 교류를.", 
            "hero-subtitle": "세상에 즐거움을 선사하는 것을 목표로.", 
            "hero-button": "더 알아보기", 
            "modal-title": "소셜 미디어", // [変更]
            "modal-youtube-id": "겐오 이로하", // [変更]
            "modal-visit": "방문하기", // [変更]
            "games-title": "공개 예정 콘텐츠", 
            "game1-title": "원신", 
            "game2-title": "붕괴: 스타레일", 
            "game3-title": "젠레스 존 제로", 
            "game4-title": "마인크래프트", 
            "game5-title": "명조: 워더링 웨이브", 
            "game6-title": "네버니스 투 에버니스",
            "game7-title": "붕괴: 넥서스 애니마",
            "music-card-title": "음악"
        }
    };
    
    // 多言語対応の実行
    const userLang = navigator.language.slice(0, 2);
    const langData = translations[userLang] || translations.en;
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (langData[key]) { element.textContent = langData[key]; }
    });

    // [削除] Mega Menu 機能 (関連コードをすべて削除)

    // スクロールアニメーション (fade-in)
    const targets = document.querySelectorAll('.fade-in-target');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    });
    targets.forEach(target => { observer.observe(target); });

    // スムーズスクロール機能 (Learn More ボタンは除外)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // モーダルを開くボタンは除外
        if (anchor.id === 'open-social-modal') return; 

        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ▼▼▼ [追加] モーダル機能 ▼▼▼
    const modal = document.getElementById('social-modal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    const openModalButton = document.getElementById('open-social-modal');
    const closeModalButton = document.getElementById('close-social-modal');

    const openModal = () => {
        if (!modal || !modalContent) return;
        modal.classList.add('visible');
        document.body.classList.add('modal-open'); // 背景スクロール停止
        // アニメーションをトリガー
        setTimeout(() => {
            modalContent.classList.add('visible'); // .fade-in-target と同じクラスを活用
        }, 10); // 少し遅らせて transition を有効にする
    };

    const closeModal = () => {
        if (!modal || !modalContent) return;
        // アニメーションのために先に中身を非表示
        modalContent.classList.remove('visible');
        
        // transition の時間（CSSと合わせる）後にオーバーレイを非表示
        setTimeout(() => {
            modal.classList.remove('visible');
            document.body.classList.remove('modal-open'); // スクロール再開
        }, 300); // CSSの transition 0.3s と合わせる
    };

    if (openModalButton) {
        openModalButton.addEventListener('click', (e) => {
            e.preventDefault(); // ページトップへのジャンプを防ぐ
            openModal();
        });
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }

    if (modal) {
        // モーダルの背景クリックで閉じる
        modal.addEventListener('click', (e) => {
            if (e.target === modal) { // 背景（modal-overlay）自身がクリックされた場合
                closeModal();
            }
        });
    }
    // ▲▲▲ [追加] モーダル機能 ▲▲▲

});
