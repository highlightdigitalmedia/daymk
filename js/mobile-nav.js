document.addEventListener('DOMContentLoaded', function() {
    const hamburgerButton = document.getElementById('hamburger-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');

    function openMenu() {
        if (mobileMenu && overlay) {
            mobileMenu.classList.remove('-translate-x-full');
            overlay.classList.remove('hidden');
        }
    }

    function closeMenu() {
        if (mobileMenu && overlay) {
            mobileMenu.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
        }
    }

    hamburgerButton?.addEventListener('click', (e) => {
        e.stopPropagation();
        openMenu();
    });

    overlay?.addEventListener('click', closeMenu);

    // --- Theme toggle logic for the mobile menu button ---
    const themeToggleButtonMobile = document.getElementById('theme-toggle-mobile');
    const themeToggleTextMobile = document.getElementById('theme-toggle-mobile-text');
    const htmlElement = document.documentElement;


    function updateThemeToggleText() {
        if (themeToggleTextMobile) {
            themeToggleTextMobile.textContent = htmlElement.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
        }
    }

    // Initialize text on load
    updateThemeToggleText();

    // Use a MutationObserver to detect when the 'dark' class changes on the <html> element
    const observer = new MutationObserver(updateThemeToggleText);
    observer.observe(htmlElement, { attributes: true, attributeFilter: ['class'] });

    themeToggleButtonMobile?.addEventListener('click', () => {
        // Find the main theme toggle button (which is hidden in the mobile header) and click it programmatically.
        // This reuses the logic from theme-toggle.js without duplicating it.
        const mainThemeToggle = document.getElementById('theme-toggle');
        if (mainThemeToggle) {
             mainThemeToggle.click();
        } else {
            // Fallback in case the main button isn't in the DOM for some reason
            htmlElement.classList.toggle('dark');
            localStorage.setItem('theme', htmlElement.classList.contains('dark') ? 'dark' : 'light');
        }
    });

        switchToDesktopButton?.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the link from navigating immediately
            localStorage.setItem('view_preference', 'desktop');
            window.location.href = 'index.html';
        });
});

