document.addEventListener('DOMContentLoaded', function () {
    var hamburgerButton = document.getElementById('hamburger-menu-button');
    var mobileMenu = document.getElementById('mobile-menu');
    var overlay = document.getElementById('mobile-menu-overlay');

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
    if (hamburgerButton) {
        hamburgerButton.addEventListener('click', function (e) {
            e.stopPropagation();
            openMenu();
        });
    }

    // Close menu when clicking on the dark overlay
    if (overlay) {
        overlay.addEventListener('click', function () {
            closeMenu();
        });
    }

    // (Optional) close when pressing Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.keyCode === 27) {
            closeMenu();
        }
    });

    // -------------------------------
    // Theme toggle in mobile side nav
    // -------------------------------
    var themeToggleButtonMobile = document.getElementById('theme-toggle-mobile');
    var themeToggleTextMobile = document.getElementById('theme-toggle-mobile-text');
    var htmlElement = document.documentElement;

    function updateThemeToggleText() {
        if (themeToggleTextMobile) {
            if (htmlElement.classList.contains('dark')) {
                themeToggleTextMobile.textContent = 'Light Mode';
            } else {
                themeToggleTextMobile.textContent = 'Dark Mode';
            }
        }
    }

    // Initialize text on load
    updateThemeToggleText();

    // Watch for changes to the <html> class (so desktop toggle & mobile stay in sync)
    if (window.MutationObserver) {
        var observer = new MutationObserver(function () {
            updateThemeToggleText();
        });
        observer.observe(htmlElement, { attributes: true, attributeFilter: ['class'] });
    }

    if (themeToggleButtonMobile) {
        themeToggleButtonMobile.addEventListener('click', function () {
            // Reuse main theme-toggle logic if available
            var mainThemeToggle = document.getElementById('theme-toggle');
            if (mainThemeToggle) {
                mainThemeToggle.click();
            } else {
                // Fallback: toggle directly
                htmlElement.classList.toggle('dark');
                localStorage.setItem(
                    'theme',
                    htmlElement.classList.contains('dark') ? 'dark' : 'light'
                );
                updateThemeToggleText();
            }
        });
    }

    // ---------------------------------------
    // Expandable subnavigation (Вести / Спорт / Магазин)
    // ---------------------------------------
    var subnavToggleButtons = document.querySelectorAll('[data-subnav-toggle]');
    for (var i = 0; i < subnavToggleButtons.length; i++) {
        (function (button) {
            button.addEventListener('click', function (e) {
                e.stopPropagation(); // don’t close menu or trigger parent links

                var id = button.getAttribute('data-subnav-toggle');
                if (!id) return;

                var selector = '[data-subnav-id="' + id + '"]';
                var target = document.querySelector(selector);
                if (!target) return;

                target.classList.toggle('hidden');

                // Optional: rotate chevron icon
                var icon = button.querySelector('svg');
                if (icon) {
                    icon.classList.toggle('rotate-180');
                }
            });
        })(subnavToggleButtons[i]);
    }
});
