function handleDeviceViewRedirect() {
    const preference = localStorage.getItem('view_preference');
    const isMobileScreen = window.innerWidth < 1024; // Tailwind's 'lg' breakpoint
    const pathname = window.location.pathname;

    // Define page pairs for redirection
    const onDesktopIndex = pathname.endsWith('/') || pathname.endsWith('index.html');
    const onMobileIndex = pathname.endsWith('index-mobile.html');
    const onDesktopSports = pathname.endsWith('sports.html');
    const onMobileSports = pathname.endsWith('sports-mobile.html');
    const onDesktopMagazine = pathname.endsWith('magazine.html');
    const onMobileMagazine = pathname.endsWith('magazine-mobile.html');
    const onDesktopLatestNews = pathname.endsWith('latest-news.html');
    const onMobileLatestNews = pathname.endsWith('latest-news-mobile.html');

    // --- 1. Handle User's Explicit Preference ---
    if (preference) {
        if (preference === 'desktop') {
            if (onMobileIndex) window.location.replace('index.html');
            if (onMobileSports) window.location.replace('sports.html');
            if (onMobileMagazine) window.location.replace('magazine.html');
            if (onMobileLatestNews) window.location.replace('latest-news.html');
        } else if (preference === 'mobile') {
            if (onDesktopIndex) window.location.replace('index-mobile.html');
            if (onDesktopSports) window.location.replace('sports-mobile.html');
            if (onDesktopMagazine) window.location.replace('magazine-mobile.html');
            if (onDesktopLatestNews) window.location.replace('latest-news-mobile.html');

        }
        return;
    }

    // --- 2. Handle First-Time Visitors (No Preference) ---
    if (isMobileScreen) {
        if (onDesktopIndex) window.location.replace('index-mobile.html');
        if (onDesktopSports) window.location.replace('sports-mobile.html');
        if (onDesktopMagazine) window.location.replace('magazine-mobile.html');
        if (onDesktopLatestNews) window.location.replace('latest-news-mobile.html');
    } else {
        if (onMobileIndex) window.location.replace('index.html');
        if (onMobileSports) window.location.replace('sports.html');
        if (onMobileMagazine) window.location.replace('magazine.html');
        if (onMobileLatestNews) window.location.replace('latest-news.html');
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
        if (window.location.pathname.endsWith('sports.html')) {
            window.location.href = 'sports-mobile.html';
        } else if (window.location.pathname.endsWith('magazine.html')) {
            window.location.href = 'magazine-mobile.html';
        } else if (window.location.pathname.endsWith('latest-news.html')) {
                    window.location.href = 'latest-news-mobile.html';
        } else {
            window.location.href = 'index-mobile.html';
        }
    });

    switchToDesktopButton?.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.setItem('view_preference', 'desktop');
        if (window.location.pathname.endsWith('sports-mobile.html')) {
            window.location.href = 'sports.html';
        } else if (window.location.pathname.endsWith('magazine-mobile.html')) {
            window.location.href = 'magazine.html';
        } else if (window.location.pathname.endsWith('latest-news-mobile.html')) {
            window.location.href = 'latest-news.html';
        } else {
            window.location.href = 'index.html';
        }
    });
});
