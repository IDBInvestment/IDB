document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Valid credentials
    const VALID_CREDENTIALS = {
        clientId: 'IDB558901',
        accessCode: '3088f4e43e673770'
    };

    // Attempt counter for security
    let loginAttempts = 0;
    const MAX_ATTEMPTS = 3;
    const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
    const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds

    // Create and show notification
    const showNotification = (message, isError = false) => {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification ${isError ? 'error' : 'success'}`;
        notification.textContent = message;
        
        const loginCard = document.querySelector('.login-card');
        loginCard.insertBefore(notification, loginCard.firstChild);

        // Auto remove after 5 seconds
        setTimeout(() => notification.remove(), 5000);
    };

    // Form submission handler
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Check if account is locked
        const lockoutTime = localStorage.getItem('loginLockout');
        if (lockoutTime && Date.now() < parseInt(lockoutTime)) {
            const remainingMinutes = Math.ceil((parseInt(lockoutTime) - Date.now()) / 60000);
            showNotification(`Account temporarily locked. Please try again in ${remainingMinutes} minutes.`, true);
            return;
        }

        const clientId = usernameInput.value.trim();
        const accessCode = passwordInput.value.trim();

        // Basic input validation
        if (!clientId || !accessCode) {
            showNotification('Please enter both Client ID and Access Code.', true);
            return;
        }

        // Simulate server delay for security
        const loginBtn = document.querySelector('.login-btn');
        loginBtn.disabled = true;
        loginBtn.textContent = 'Authenticating...';

        await new Promise(resolve => setTimeout(resolve, 1500));

        // Validate credentials
        if (clientId === VALID_CREDENTIALS.clientId && 
            accessCode === VALID_CREDENTIALS.accessCode) {
            
            showNotification('Authentication successful. Redirecting...', false);
            loginAttempts = 0;
            localStorage.removeItem('loginLockout');
            
            // Redirect after showing success message
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        } else {
            loginAttempts++;
            
            if (loginAttempts >= MAX_ATTEMPTS) {
                // Lock the account
                const lockoutExpiry = Date.now() + LOCKOUT_DURATION;
                localStorage.setItem('loginLockout', lockoutExpiry.toString());
                showNotification(`Account locked for 15 minutes due to multiple failed attempts.`, true);
            } else {
                const remainingAttempts = MAX_ATTEMPTS - loginAttempts;
                showNotification(`Invalid credentials. ${remainingAttempts} attempts remaining.`, true);
            }

            loginBtn.disabled = false;
            loginBtn.textContent = 'Authenticate';
        }
    });

    // Auto logout timer (30 minutes)
    let inactivityTimer;
    
    const resetTimer = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            showNotification('Session expired due to inactivity.', true);
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }, INACTIVITY_TIMEOUT);
    };

    // Reset timer on user activity
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(
        event => document.addEventListener(event, resetTimer, true)
    );

    // Start the timer
    resetTimer();
});