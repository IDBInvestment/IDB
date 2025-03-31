document.addEventListener('DOMContentLoaded', () => {
    // Auto logout timer (30 minutes)
    const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds
    let inactivityTimer;

    const resetTimer = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            alert('Session expired due to inactivity. Redirecting to login page...');
            window.location.href = 'index.html';
        }, INACTIVITY_TIMEOUT);
    };

    // Reset timer on user activity
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(
        event => document.addEventListener(event, resetTimer, true)
    );

    // Start the timer
    resetTimer();
});