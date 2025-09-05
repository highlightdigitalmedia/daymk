function handleDeviceViewRedirect() {
    const preference = localStorage.getItem('view_preference');
    const isMobileScreen = window.innerWidth < 1024;
    const onMobilePage = window.location.pathname.endsWith('index-mobile.html');
    const onDesktopPage = window.location.pathname.endsWith('index.html');

    // If a preference is set, it has the highest priority.
    if (preference) {
        if (preference === 'desktop' && onMobilePage) {
            // User wants desktop but is on mobile page -> redirect to desktop.
            window.location.replace('index.html');
        } else if (preference === 'mobile' && onDesktopPage) {
            // User wants mobile but is on desktop page -> redirect to mobile.
            window.location.replace('index-mobile.html');
        }
        // If preference matches the current page, do nothing.
        return;
    }

    // If NO preference is set, then use screen size as a fallback.
    if (isMobileScreen && onDesktopPage) {
        window.location.replace('index-mobile.html');
    }
}

// Run the redirection check as soon as the script is loaded.
handleDeviceViewRedirect();

// Set up the button click listeners after the page's HTML is ready.
document.addEventListener('DOMContentLoaded', function() {
    const switchToMobileButton = document.getElementById('device-switcher-button');
    const switchToDesktopButton = document.getElementById('switch-to-desktop-button');

    // Listener for the button on the DESKTOP page to switch to mobile
    switchToMobileButton?.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.setItem('view_preference', 'mobile');
        window.location.href = 'index-mobile.html';
    });

    // Listener for the button on the MOBILE page to switch to desktop
    switchToDesktopButton?.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.setItem('view_preference', 'desktop');
        window.location.href = 'index.html';
    });
});