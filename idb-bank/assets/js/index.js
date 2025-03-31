document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(0, 18, 51, 0.98)';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.background = 'rgba(0, 18, 51, 0.95)';
            nav.style.boxShadow = 'none';
        }
    });
});