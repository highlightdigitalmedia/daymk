function handleDeviceViewRedirect() {
    const preference = localStorage.getItem('view_preference');
    const isMobileScreen = window.innerWidth < 1024; // Tailwind's 'lg' breakpoint
    const pathname = window.location.pathname;

    // --- Page pairs (desktop vs mobile) ---

    // Home / main sections
    const onDesktopIndex       = pathname.endsWith('/') || pathname.endsWith('index.html');
    const onMobileIndex        = pathname.endsWith('index-mobile.html');

    const onDesktopSports      = pathname.endsWith('sports.html');
    const onMobileSports       = pathname.endsWith('sports-mobile.html');

    const onDesktopMagazine    = pathname.endsWith('magazine.html');
    const onMobileMagazine     = pathname.endsWith('magazine-mobile.html');

    const onDesktopLatestNews  = pathname.endsWith('latest-news.html');
    const onMobileLatestNews   = pathname.endsWith('latest-news-mobile.html');

    // Vesti categories
    const onDesktopMacedonia   = pathname.endsWith('macedonia.html');
    const onMobileMacedonia    = pathname.endsWith('macedonia-mobile.html');

    const onDesktopEconomy     = pathname.endsWith('economy.html');
    const onMobileEconomy      = pathname.endsWith('economy-mobile.html');

    const onDesktopBalkan      = pathname.endsWith('balkan.html');
    const onMobileBalkan       = pathname.endsWith('balkan-mobile.html');

    const onDesktopWorld       = pathname.endsWith('world.html');
    const onMobileWorld        = pathname.endsWith('world-mobile.html');

    const onDesktopSkopje      = pathname.endsWith('skopje.html');
    const onMobileSkopje       = pathname.endsWith('skopje-mobile.html');

    const onDesktopBitola      = pathname.endsWith('bitola.html');
    const onMobileBitola       = pathname.endsWith('bitola-mobile.html');

    const onDesktopHronika     = pathname.endsWith('hronika.html');
    const onMobileHronika      = pathname.endsWith('hronika-mobile.html');

    const onDesktopRepublika   = pathname.endsWith('republika.html');
    const onMobileRepublika    = pathname.endsWith('republika-mobile.html');

    const onDesktopCulture     = pathname.endsWith('culture.html');
    const onMobileCulture      = pathname.endsWith('culture-mobile.html');

    const onDesktopTechnology  = pathname.endsWith('technology.html');
    const onMobileTechnology   = pathname.endsWith('technology-mobile.html');

    const onDesktopScene       = pathname.endsWith('scene.html');
    const onMobileScene        = pathname.endsWith('scene-mobile.html');

    // Sport subcategories
    const onDesktopSportFootball    = pathname.endsWith('sport-football.html');
    const onMobileSportFootball     = pathname.endsWith('sport-football-mobile.html');

    const onDesktopSportBasketball  = pathname.endsWith('sport-basketball.html');
    const onMobileSportBasketball   = pathname.endsWith('sport-basketball-mobile.html');

    const onDesktopSportHandball    = pathname.endsWith('sport-handball.html');
    const onMobileSportHandball     = pathname.endsWith('sport-handball-mobile.html');

    const onDesktopSportTennis      = pathname.endsWith('sport-tennis.html');
    const onMobileSportTennis       = pathname.endsWith('sport-tennis-mobile.html');

    const onDesktopSportAutoMoto    = pathname.endsWith('sport-automoto.html');
    const onMobileSportAutoMoto     = pathname.endsWith('sport-automoto-mobile.html');

    const onDesktopSportOther       = pathname.endsWith('sport-othersports.html');
    const onMobileSportOther        = pathname.endsWith('sport-othersports-mobile.html');

    // Magazine subcategories
    const onDesktopMagFun           = pathname.endsWith('magazine-fun.html');
    const onMobileMagFun            = pathname.endsWith('magazine-fun-mobile.html');

    const onDesktopMagCars          = pathname.endsWith('magazine-cars.html');
    const onMobileMagCars           = pathname.endsWith('magazine-cars-mobile.html');

    const onDesktopMagLife          = pathname.endsWith('magazine-life.html');
    const onMobileMagLife           = pathname.endsWith('magazine-life-mobile.html');

    const onDesktopMagTravel        = pathname.endsWith('magazine-travel.html');
    const onMobileMagTravel         = pathname.endsWith('magazine-travel-mobile.html');

    const onDesktopMagHealth        = pathname.endsWith('magazine-health.html');
    const onMobileMagHealth         = pathname.endsWith('magazine-health-mobile.html');

    const onDesktopMagFood          = pathname.endsWith('magazine-food.html');
    const onMobileMagFood           = pathname.endsWith('magazine-food-mobile.html');

    const onDesktopMagStyle         = pathname.endsWith('magazine-style.html');
    const onMobileMagStyle          = pathname.endsWith('magazine-style-mobile.html');

    const onDesktopMagIntimacy      = pathname.endsWith('magazine-intimacy.html');
    const onMobileMagIntimacy       = pathname.endsWith('magazine-intimacy-mobile.html');

    // --- 1. Handle User's Explicit Preference ---
    if (preference) {
        if (preference === 'desktop') {
            // If user prefers desktop, push them to desktop versions

            if (onMobileIndex)          window.location.replace('index.html');
            if (onMobileSports)         window.location.replace('sports.html');
            if (onMobileMagazine)       window.location.replace('magazine.html');
            if (onMobileLatestNews)     window.location.replace('latest-news.html');

            if (onMobileMacedonia)      window.location.replace('macedonia.html');
            if (onMobileEconomy)        window.location.replace('economy.html');
            if (onMobileBalkan)         window.location.replace('balkan.html');
            if (onMobileWorld)          window.location.replace('world.html');
            if (onMobileSkopje)         window.location.replace('skopje.html');
            if (onMobileBitola)         window.location.replace('bitola.html');
            if (onMobileHronika)        window.location.replace('hronika.html');
            if (onMobileRepublika)      window.location.replace('republika.html');
            if (onMobileCulture)        window.location.replace('culture.html');
            if (onMobileTechnology)     window.location.replace('technology.html');
            if (onMobileScene)          window.location.replace('scene.html');

            if (onMobileSportFootball)   window.location.replace('sport-football.html');
            if (onMobileSportBasketball) window.location.replace('sport-basketball.html');
            if (onMobileSportHandball)   window.location.replace('sport-handball.html');
            if (onMobileSportTennis)     window.location.replace('sport-tennis.html');
            if (onMobileSportAutoMoto)   window.location.replace('sport-automoto.html');
            if (onMobileSportOther)      window.location.replace('sport-othersports.html');

            if (onMobileMagFun)          window.location.replace('magazine-fun.html');
            if (onMobileMagCars)         window.location.replace('magazine-cars.html');
            if (onMobileMagLife)         window.location.replace('magazine-life.html');
            if (onMobileMagTravel)       window.location.replace('magazine-travel.html');
            if (onMobileMagHealth)       window.location.replace('magazine-health.html');
            if (onMobileMagFood)         window.location.replace('magazine-food.html');
            if (onMobileMagStyle)        window.location.replace('magazine-style.html');
            if (onMobileMagIntimacy)     window.location.replace('magazine-intimacy.html');

        } else if (preference === 'mobile') {
            // If user prefers mobile, push them to mobile versions

            if (onDesktopIndex)         window.location.replace('index-mobile.html');
            if (onDesktopSports)        window.location.replace('sports-mobile.html');
            if (onDesktopMagazine)      window.location.replace('magazine-mobile.html');
            if (onDesktopLatestNews)    window.location.replace('latest-news-mobile.html');

            if (onDesktopMacedonia)     window.location.replace('macedonia-mobile.html');
            if (onDesktopEconomy)       window.location.replace('economy-mobile.html');
            if (onDesktopBalkan)        window.location.replace('balkan-mobile.html');
            if (onDesktopWorld)         window.location.replace('world-mobile.html');
            if (onDesktopSkopje)        window.location.replace('skopje-mobile.html');
            if (onDesktopBitola)        window.location.replace('bitola-mobile.html');
            if (onDesktopHronika)       window.location.replace('hronika-mobile.html');
            if (onDesktopRepublika)     window.location.replace('republika-mobile.html');
            if (onDesktopCulture)       window.location.replace('culture-mobile.html');
            if (onDesktopTechnology)    window.location.replace('technology-mobile.html');
            if (onDesktopScene)         window.location.replace('scene-mobile.html');

            if (onDesktopSportFootball)   window.location.replace('sport-football-mobile.html');
            if (onDesktopSportBasketball) window.location.replace('sport-basketball-mobile.html');
            if (onDesktopSportHandball)   window.location.replace('sport-handball-mobile.html');
            if (onDesktopSportTennis)     window.location.replace('sport-tennis-mobile.html');
            if (onDesktopSportAutoMoto)   window.location.replace('sport-automoto-mobile.html');
            if (onDesktopSportOther)      window.location.replace('sport-othersports-mobile.html');

            if (onDesktopMagFun)          window.location.replace('magazine-fun-mobile.html');
            if (onDesktopMagCars)         window.location.replace('magazine-cars-mobile.html');
            if (onDesktopMagLife)         window.location.replace('magazine-life-mobile.html');
            if (onDesktopMagTravel)       window.location.replace('magazine-travel-mobile.html');
            if (onDesktopMagHealth)       window.location.replace('magazine-health-mobile.html');
            if (onDesktopMagFood)         window.location.replace('magazine-food-mobile.html');
            if (onDesktopMagStyle)        window.location.replace('magazine-style-mobile.html');
            if (onDesktopMagIntimacy)     window.location.replace('magazine-intimacy-mobile.html');
        }
        return;
    }

    // --- 2. Handle First-Time Visitors (No Preference) ---
    if (isMobileScreen) {
        // If on small screen, prefer mobile pages
        if (onDesktopIndex)         window.location.replace('index-mobile.html');
        if (onDesktopSports)        window.location.replace('sports-mobile.html');
        if (onDesktopMagazine)      window.location.replace('magazine-mobile.html');
        if (onDesktopLatestNews)    window.location.replace('latest-news-mobile.html');

        if (onDesktopMacedonia)     window.location.replace('macedonia-mobile.html');
        if (onDesktopEconomy)       window.location.replace('economy-mobile.html');
        if (onDesktopBalkan)        window.location.replace('balkan-mobile.html');
        if (onDesktopWorld)         window.location.replace('world-mobile.html');
        if (onDesktopSkopje)        window.location.replace('skopje-mobile.html');
        if (onDesktopBitola)        window.location.replace('bitola-mobile.html');
        if (onDesktopHronika)       window.location.replace('hronika-mobile.html');
        if (onDesktopRepublika)     window.location.replace('republika-mobile.html');
        if (onDesktopCulture)       window.location.replace('culture-mobile.html');
        if (onDesktopTechnology)    window.location.replace('technology-mobile.html');
        if (onDesktopScene)         window.location.replace('scene-mobile.html');

        if (onDesktopSportFootball)   window.location.replace('sport-football-mobile.html');
        if (onDesktopSportBasketball) window.location.replace('sport-basketball-mobile.html');
        if (onDesktopSportHandball)   window.location.replace('sport-handball-mobile.html');
        if (onDesktopSportTennis)     window.location.replace('sport-tennis-mobile.html');
        if (onDesktopSportAutoMoto)   window.location.replace('sport-automoto-mobile.html');
        if (onDesktopSportOther)      window.location.replace('sport-othersports-mobile.html');

        if (onDesktopMagFun)          window.location.replace('magazine-fun-mobile.html');
        if (onDesktopMagCars)         window.location.replace('magazine-cars-mobile.html');
        if (onDesktopMagLife)         window.location.replace('magazine-life-mobile.html');
        if (onDesktopMagTravel)       window.location.replace('magazine-travel-mobile.html');
        if (onDesktopMagHealth)       window.location.replace('magazine-health-mobile.html');
        if (onDesktopMagFood)         window.location.replace('magazine-food-mobile.html');
        if (onDesktopMagStyle)        window.location.replace('magazine-style-mobile.html');
        if (onDesktopMagIntimacy)     window.location.replace('magazine-intimacy-mobile.html');

    } else {
        // On big screen, prefer desktop pages
        if (onMobileIndex)          window.location.replace('index.html');
        if (onMobileSports)         window.location.replace('sports.html');
        if (onMobileMagazine)       window.location.replace('magazine.html');
        if (onMobileLatestNews)     window.location.replace('latest-news.html');

        if (onMobileMacedonia)      window.location.replace('macedonia.html');
        if (onMobileEconomy)        window.location.replace('economy.html');
        if (onMobileBalkan)         window.location.replace('balkan.html');
        if (onMobileWorld)          window.location.replace('world.html');
        if (onMobileSkopje)         window.location.replace('skopje.html');
        if (onMobileBitola)         window.location.replace('bitola.html');
        if (onMobileHronika)        window.location.replace('hronika.html');
        if (onMobileRepublika)      window.location.replace('republika.html');
        if (onMobileCulture)        window.location.replace('culture.html');
        if (onMobileTechnology)     window.location.replace('technology.html');
        if (onMobileScene)          window.location.replace('scene.html');

        if (onMobileSportFootball)   window.location.replace('sport-football.html');
        if (onMobileSportBasketball) window.location.replace('sport-basketball.html');
        if (onMobileSportHandball)   window.location.replace('sport-handball.html');
        if (onMobileSportTennis)     window.location.replace('sport-tennis.html');
        if (onMobileSportAutoMoto)   window.location.replace('sport-automoto.html');
        if (onMobileSportOther)      window.location.replace('sport-othersports.html');

        if (onMobileMagFun)          window.location.replace('magazine-fun.html');
        if (onMobileMagCars)         window.location.replace('magazine-cars.html');
        if (onMobileMagLife)         window.location.replace('magazine-life.html');
        if (onMobileMagTravel)       window.location.replace('magazine-travel.html');
        if (onMobileMagHealth)       window.location.replace('magazine-health.html');
        if (onMobileMagFood)         window.location.replace('magazine-food.html');
        if (onMobileMagStyle)        window.location.replace('magazine-style.html');
        if (onMobileMagIntimacy)     window.location.replace('magazine-intimacy.html');
    }
}

// Run the redirection check as soon as the script is loaded.
handleDeviceViewRedirect();

// Set up the button click listeners after the page's HTML is ready.
document.addEventListener('DOMContentLoaded', function() {
    const switchToMobileButton = document.getElementById('device-switcher-button');
    const switchToDesktopButton = document.getElementById('switch-to-desktop-button');

    switchToMobileButton?.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.setItem('view_preference', 'mobile');

        const pathname = window.location.pathname;

        if (pathname.endsWith('sports.html')) {
            window.location.href = 'sports-mobile.html';
        } else if (pathname.endsWith('magazine.html')) {
            window.location.href = 'magazine-mobile.html';
        } else if (pathname.endsWith('latest-news.html')) {
            window.location.href = 'latest-news-mobile.html';
        } else if (pathname.endsWith('macedonia.html')) {
            window.location.href = 'macedonia-mobile.html';
        } else if (pathname.endsWith('economy.html')) {
            window.location.href = 'economy-mobile.html';
        } else if (pathname.endsWith('balkan.html')) {
            window.location.href = 'balkan-mobile.html';
        } else if (pathname.endsWith('world.html')) {
            window.location.href = 'world-mobile.html';
        } else if (pathname.endsWith('skopje.html')) {
            window.location.href = 'skopje-mobile.html';
        } else if (pathname.endsWith('bitola.html')) {
            window.location.href = 'bitola-mobile.html';
        } else if (pathname.endsWith('hronika.html')) {
            window.location.href = 'hronika-mobile.html';
        } else if (pathname.endsWith('republika.html')) {
            window.location.href = 'republika-mobile.html';
        } else if (pathname.endsWith('culture.html')) {
            window.location.href = 'culture-mobile.html';
        } else if (pathname.endsWith('technology.html')) {
            window.location.href = 'technology-mobile.html';
        } else if (pathname.endsWith('scene.html')) {
            window.location.href = 'scene-mobile.html';
        } else if (pathname.endsWith('sport-football.html')) {
            window.location.href = 'sport-football-mobile.html';
        } else if (pathname.endsWith('sport-basketball.html')) {
            window.location.href = 'sport-basketball-mobile.html';
        } else if (pathname.endsWith('sport-handball.html')) {
            window.location.href = 'sport-handball-mobile.html';
        } else if (pathname.endsWith('sport-tennis.html')) {
            window.location.href = 'sport-tennis-mobile.html';
        } else if (pathname.endsWith('sport-automoto.html')) {
            window.location.href = 'sport-automoto-mobile.html';
        } else if (pathname.endsWith('sport-othersports.html')) {
            window.location.href = 'sport-othersports-mobile.html';
        } else if (pathname.endsWith('magazine-fun.html')) {
            window.location.href = 'magazine-fun-mobile.html';
        } else if (pathname.endsWith('magazine-cars.html')) {
            window.location.href = 'magazine-cars-mobile.html';
        } else if (pathname.endsWith('magazine-life.html')) {
            window.location.href = 'magazine-life-mobile.html';
        } else if (pathname.endsWith('magazine-travel.html')) {
            window.location.href = 'magazine-travel-mobile.html';
        } else if (pathname.endsWith('magazine-health.html')) {
            window.location.href = 'magazine-health-mobile.html';
        } else if (pathname.endsWith('magazine-food.html')) {
            window.location.href = 'magazine-food-mobile.html';
        } else if (pathname.endsWith('magazine-style.html')) {
            window.location.href = 'magazine-style-mobile.html';
        } else if (pathname.endsWith('magazine-intimacy.html')) {
            window.location.href = 'magazine-intimacy-mobile.html';
        } else {
            window.location.href = 'index-mobile.html';
        }
    });

    switchToDesktopButton?.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.setItem('view_preference', 'desktop');

        const pathname = window.location.pathname;

        if (pathname.endsWith('sports-mobile.html')) {
            window.location.href = 'sports.html';
        } else if (pathname.endsWith('magazine-mobile.html')) {
            window.location.href = 'magazine.html';
        } else if (pathname.endsWith('latest-news-mobile.html')) {
            window.location.href = 'latest-news.html';
        } else if (pathname.endsWith('macedonia-mobile.html')) {
            window.location.href = 'macedonia.html';
        } else if (pathname.endsWith('economy-mobile.html')) {
            window.location.href = 'economy.html';
        } else if (pathname.endsWith('balkan-mobile.html')) {
            window.location.href = 'balkan.html';
        } else if (pathname.endsWith('world-mobile.html')) {
            window.location.href = 'world.html';
        } else if (pathname.endsWith('skopje-mobile.html')) {
            window.location.href = 'skopje.html';
        } else if (pathname.endsWith('bitola-mobile.html')) {
            window.location.href = 'bitola.html';
        } else if (pathname.endsWith('hronika-mobile.html')) {
            window.location.href = 'hronika.html';
        } else if (pathname.endsWith('republika-mobile.html')) {
            window.location.href = 'republika.html';
        } else if (pathname.endsWith('culture-mobile.html')) {
            window.location.href = 'culture.html';
        } else if (pathname.endsWith('technology-mobile.html')) {
            window.location.href = 'technology.html';
        } else if (pathname.endsWith('scene-mobile.html')) {
            window.location.href = 'scene.html';
        } else if (pathname.endsWith('sport-football-mobile.html')) {
            window.location.href = 'sport-football.html';
        } else if (pathname.endsWith('sport-basketball-mobile.html')) {
            window.location.href = 'sport-basketball.html';
        } else if (pathname.endsWith('sport-handball-mobile.html')) {
            window.location.href = 'sport-handball.html';
        } else if (pathname.endsWith('sport-tennis-mobile.html')) {
            window.location.href = 'sport-tennis.html';
        } else if (pathname.endsWith('sport-automoto-mobile.html')) {
            window.location.href = 'sport-automoto.html';
        } else if (pathname.endsWith('sport-othersports-mobile.html')) {
            window.location.href = 'sport-othersports.html';
        } else if (pathname.endsWith('magazine-fun-mobile.html')) {
            window.location.href = 'magazine-fun.html';
        } else if (pathname.endsWith('magazine-cars-mobile.html')) {
            window.location.href = 'magazine-cars.html';
        } else if (pathname.endsWith('magazine-life-mobile.html')) {
            window.location.href = 'magazine-life.html';
        } else if (pathname.endsWith('magazine-travel-mobile.html')) {
            window.location.href = 'magazine-travel.html';
        } else if (pathname.endsWith('magazine-health-mobile.html')) {
            window.location.href = 'magazine-health.html';
        } else if (pathname.endsWith('magazine-food-mobile.html')) {
            window.location.href = 'magazine-food.html';
        } else if (pathname.endsWith('magazine-style-mobile.html')) {
            window.location.href = 'magazine-style.html';
        } else if (pathname.endsWith('magazine-intimacy-mobile.html')) {
            window.location.href = 'magazine-intimacy.html';
        } else {
            window.location.href = 'index.html';
        }
    });
});
