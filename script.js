// Authentication credentials
const VALID_USERNAME = 'flagship';
const VALID_PASSWORD = 'voiceagent';

// DOM elements
const loginContainer = document.getElementById('loginContainer');
const appContainer = document.getElementById('appContainer');
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const logoutButton = document.getElementById('logoutButton');

// Check if user is already logged in
window.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
});

// Check authentication status
function checkAuthentication() {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
    
    if (isAuthenticated) {
        showApp();
    } else {
        showLogin();
    }
}

// Show login page
function showLogin() {
    loginContainer.style.display = 'flex';
    appContainer.style.display = 'none';
}

// Show main app
function showApp() {
    loginContainer.style.display = 'none';
    appContainer.style.display = 'block';
}

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Clear previous error message
    errorMessage.textContent = '';
    
    // Validate credentials
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        // Set authentication flag
        sessionStorage.setItem('isAuthenticated', 'true');
        
        // Clear form
        loginForm.reset();
        
        // Show app
        showApp();
    } else {
        // Show error message
        errorMessage.textContent = 'Invalid username or password. Please try again.';
        
        // Shake animation for error
        loginForm.classList.add('shake');
        setTimeout(() => {
            loginForm.classList.remove('shake');
        }, 500);
    }
});

// Handle logout
logoutButton.addEventListener('click', () => {
    // Clear authentication
    sessionStorage.removeItem('isAuthenticated');
    
    // Show login page
    showLogin();
});

// Add shake animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    .shake {
        animation: shake 0.5s ease-in-out;
    }
`;
document.head.appendChild(style);