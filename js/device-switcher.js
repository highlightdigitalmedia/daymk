function handleDeviceViewRedirect() {
    const preference = localStorage.getItem('view_preference');
    const isMobileScreen = window.innerWidth < 1024; // Tailwind's 'lg' breakpoint
    const pathname = window.location.pathname;

    // Define page pairs for redirection
    const onDesktopIndex = pathname.endsWith('/') || pathname.endsWith('index.html');
    const onMobileIndex = pathname.endsWith('index-mobile.html');
    const onDesktopSports = pathname.endsWith('sports.html');
    const onMobileSports = pathname.endsWith('sports-mobile.html');

    // --- 1. Handle User's Explicit Preference ---
    // If a preference is set, it has the highest priority and overrides screen size.
    if (preference) {
        if (preference === 'desktop') {
            if (onMobileIndex) window.location.replace('index.html');
            if (onMobileSports) window.location.replace('sports.html');
        } else if (preference === 'mobile') {
            if (onDesktopIndex) window.location.replace('index-mobile.html');
            if (onDesktopSports) window.location.replace('sports-mobile.html');
        }
        return; // Stop further checks if a preference was handled.
    }

    // --- 2. Handle First-Time Visitors (No Preference) Based on Screen Size ---
    // This logic only runs if no 'view_preference' is set in localStorage.
    if (isMobileScreen) {
        // User is on a small screen, so default them to a mobile page.
        if (onDesktopIndex) window.location.replace('index-mobile.html');
        if (onDesktopSports) window.location.replace('sports-mobile.html');
    } else {
        // User is on a large screen, so default them to a desktop page.
        if (onMobileIndex) window.location.replace('index.html');
        if (onMobileSports) window.location.replace('sports.html');
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
        } else {
            window.location.href = 'index-mobile.html';
        }
    });

    switchToDesktopButton?.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.setItem('view_preference', 'desktop');
        if (window.location.pathname.endsWith('sports-mobile.html')) {
            window.location.href = 'sports.html';
        } else {
            window.location.href = 'index.html';
        }
    });
});