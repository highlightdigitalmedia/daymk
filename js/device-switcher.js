document.addEventListener('DOMContentLoaded', function() {
    const viewMode = localStorage.getItem('view_mode'); // Can be 'desktop' or 'mobile'
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isMobilePage = window.location.pathname.endsWith('index-mobile.html');

    // Determine if we are on any kind of "desktop" index page.
    const isDesktopPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');

    // 1. Redirect based on stored preference
    if (viewMode === 'desktop') {
        if (isMobilePage) {
            // User prefers desktop view but is on mobile page, so redirect.
            window.location.href = 'index.html';
            return; // Stop further execution
        }
    } else if (viewMode === 'mobile') {
        if (!isMobilePage) {
            // User prefers mobile view but is on a desktop page, so redirect.
            window.location.href = 'index-mobile.html';
            return; // Stop further execution
        }
    } else {
        // 2. No preference stored, so auto-detect and redirect if necessary
        if (isMobileDevice && isDesktopPage) {
            window.location.href = 'index-mobile.html';
            return;
        } else if (!isMobileDevice && isMobilePage) {
            window.location.href = 'index.html';
            return;
        }
    }

    // 3. Add click listener to the switcher button in the header
    const switcherButton = document.getElementById('device-switcher-button');
    if (switcherButton) {
        switcherButton.addEventListener('click', function() {
            if (isMobilePage) {
                // Currently on the mobile page, switch to desktop view
                localStorage.setItem('view_mode', 'desktop');
                window.location.href = 'index.html';
            } else {
                // Currently on a desktop page, switch to mobile view
                localStorage.setItem('view_mode', 'mobile');
                window.location.href = 'index-mobile.html';
            }
        });
    }
});

