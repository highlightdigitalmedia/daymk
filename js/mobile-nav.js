document.addEventListener('DOMContentLoaded', function() {
    const hamburgerButton = document.getElementById('hamburger-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');

    // -----------------------
    // Open / Close mobile nav
    // -----------------------
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

    // Open menu on hamburger click
    hamburgerButton?.addEventListener('click', (e) => {
        e.stopPropagation();
        openMenu();
    });

    // Close menu when clicking on the dark overlay
    overlay?.addEventListener('click', closeMenu);

    // Optional: close when pressing Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    // --------------------------------
    // Theme toggle in mobile side nav
    // --------------------------------
    const themeToggleButtonMobile = document.getElementById('theme-toggle-mobile');
    const themeToggleTextMobile = document.getElementById('theme-toggle-mobile-text');
    const htmlElement = document.documentElement;

    function updateThemeToggleText() {
        if (themeToggleTextMobile) {
            themeToggleTextMobile.textContent =
                htmlElement.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
        }
    }

    // Initialize text on load
    updateThemeToggleText();

    // Keep text in sync if theme changes elsewhere (desktop toggle)
    const observer = new MutationObserver(updateThemeToggleText);
    observer.observe(htmlElement, { attributes: true, attributeFilter: ['class'] });

    themeToggleButtonMobile?.addEventListener('click', () => {
        // Reuse the main theme-toggle button logic if present
        const mainThemeToggle = document.getElementById('theme-toggle');
        if (mainThemeToggle) {
            mainThemeToggle.click();
        } else {
            // Fallback: toggle directly
            htmlElement.classList.toggle('dark');
            localStorage.setItem(
                'theme',
                htmlElement.classList.contains('dark') ? 'dark' : 'light'
            );
        }
    });

    // -------------------------------------------------
    // Expandable subnavigation (Вести / Спорт / Магазин)
    // -------------------------------------------------
    const subnavToggleButtons = document.querySelectorAll('[data-subnav-toggle]');

    subnavToggleButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // don’t close the menu or trigger parent links

            const id = button.getAttribute('data-subnav-toggle');
            if (!id) return;

            const target = document.querySelector('[data-subnav-id="' + id + '"]');
            if (!target) return;

            target.classList.toggle('hidden');

            // Optional: rotate chevron icon
            const icon = button.querySelector('svg');
            if (icon) {
                icon.classList.toggle('rotate-180');
            }
        });
    });
});
