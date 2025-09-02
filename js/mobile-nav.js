document.addEventListener('DOMContentLoaded', function() {
    const hamburgerButton = document.getElementById('hamburger-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');

    function openMenu() {
        mobileMenu.classList.remove('-translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        overlay.classList.remove('hidden');
    }

    function closeMenu() {
        mobileMenu.classList.add('-translate-x-full');
        mobileMenu.classList.remove('translate-x-0');
        overlay.classList.add('hidden');
    }

    if (hamburgerButton) {
        hamburgerButton.addEventListener('click', (e) => {
            e.stopPropagation();
            openMenu();
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            closeMenu();
        });
    }
});
