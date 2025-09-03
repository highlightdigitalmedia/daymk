document.addEventListener('DOMContentLoaded', function() {
    const viewPreference = localStorage.getItem('view_preference');
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isMobilePage = window.location.pathname.includes('index-mobile.html');

    // 1. Automatic redirection for FIRST-TIME visitors
    if (!viewPreference) {
        if (isMobileDevice && !isMobilePage) {
            window.location.href = 'index-mobile.html';
            return;
        }
        if (!isMobileDevice && isMobilePage) {
            window.location.href = 'index.html';
            return;
        }
    }

    // 2. Manual switching logic for the button
    const switcherButton = document.getElementById('device-switcher-button');
    const mobileIcon = document.getElementById('mobile-icon');
    const desktopIcon = document.getElementById('desktop-icon');

    function updateIcons() {
        if (isMobilePage) {
            if (mobileIcon) mobileIcon.style.display = 'none';
            if (desktopIcon) desktopIcon.style.display = 'block';
        } else {
            if (mobileIcon) mobileIcon.style.display = 'block';
            if (desktopIcon) desktopIcon.style.display = 'none';
        }
    }

    if (switcherButton) {
        updateIcons(); // Set the correct icon on page load

        switcherButton.addEventListener('click', () => {
            if (isMobilePage) {
                // If on mobile page, switch to desktop
                localStorage.setItem('view_preference', 'desktop');
                window.location.href = 'index.html';
            } else {
                // If on desktop page, switch to mobile
                localStorage.setItem('view_preference', 'mobile');
                window.location.href = 'index-mobile.html';
            }
        });
    }
});
