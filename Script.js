// ============================================
// JavaScript Fundamentals & Data Types
// ============================================

// Variables with different data types
let currentTheme = 'light'; // string
const isProduction = false; // boolean
let userPreferences = null; // null
let sessionData = undefined; // undefined
let visitCount = 0; // number
let pageHistory = []; // array
let userInfo = { name: '', email: '', lastVisit: null }; // object

// ============================================
// Browser Object Model (BOM)
// ============================================

// Online/Offline Detection
window.addEventListener('online', handleOnline);
window.addEventListener('offline', handleOffline);

function handleOnline() {
    const banner = document.getElementById('offline-banner');
    if (banner) {
        banner.classList.add('hidden');
    }
    console.log('Connection restored');
}

function handleOffline() {
    const banner = document.getElementById('offline-banner');
    if (banner) {
        banner.classList.remove('hidden');
    }
    console.log('Connection lost');
}

// Check initial online status
if (!navigator.onLine) {
    handleOffline();
}

// Screen Information using BOM
function updateScreenInfo() {
    const screenInfoElement = document.getElementById('screen-info');
    if (screenInfoElement) {
        const width = window.screen.width;
        const height = window.screen.height;
        let deviceType = 'Desktop';
        
        if (width <= 640) {
            deviceType = 'Mobile';
        } else if (width <= 1024) {
            deviceType = 'Tablet';
        }
        
        screenInfoElement.textContent = `${deviceType} (${width}x${height})`;
    }
}

// Update screen info on load and resize
updateScreenInfo();
window.addEventListener('resize', updateScreenInfo);

// ============================================
// Timer API - Current Time Display
// ============================================

function updateTime() {
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        timeElement.textContent = timeString;
    }
}

// Update time every second
setInterval(updateTime, 1000);
updateTime(); // Initial call

// ============================================
// LocalStorage - Theme Management
// ============================================

// function loadTheme() {
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme) {
//         currentTheme = savedTheme;
//         if (savedTheme === 'dark') {
//             document.body.classList.add('dark-mode');
//             const themeToggle = document.getElementById('theme-toggle');
//             if (themeToggle) {
//                 themeToggle.textContent = '☀️';
//             }
//         }
//     }
// }

// function toggleTheme() {
//     document.body.classList.toggle('dark-mode');
//     const isDark = document.body.classList.contains('dark-mode');
//     currentTheme = isDark ? 'dark' : 'light';
    
//     // Save to localStorage
//     localStorage.setItem('theme', currentTheme);
    
//     // Update button icon
//     const themeToggle = document.getElementById('theme-toggle');
//     if (themeToggle) {
//         themeToggle.textContent = isDark ? '☀️' : '🌙';
//     }
    
//     // Log theme change
//     console.log(`Theme changed to: ${currentTheme}`);
// }

// ============================================
// SessionStorage - Visit Tracking
// ============================================

function trackPageVisit() {
    // Get current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Get existing history from sessionStorage
    let history = sessionStorage.getItem('page_history');
    pageHistory = history ? JSON.parse(history) : [];
    
    // Add current visit
    const visit = {
        page: currentPage,
        timestamp: new Date().toISOString()
    };
    pageHistory.push(visit);
    
    // Save back to sessionStorage
    sessionStorage.setItem('page_history', JSON.stringify(pageHistory));
    
    // Update visit count
    visitCount = pageHistory.length;
    sessionStorage.setItem('visit_count', visitCount);
    
    console.log(`Page visits this session: ${visitCount}`);
}

// ============================================
// Mobile Menu Toggle
// ============================================

function toggleMobileMenu() {
    const nav = document.getElementById('main-nav');
    const menuToggle = document.getElementById('mobile-menu-toggle');
    
    if (nav) {
        nav.classList.toggle('active');
        
        // Change icon
        if (menuToggle) {
            menuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
        }
    }
}

// ============================================
// DOM Manipulation - Active Navigation Link
// ============================================

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// ============================================
// Form Data Collection using FormData API
// ============================================

function collectFormData(formId) {
    const form = document.getElementById(formId);
    if (!form) return null;
    
    const formData = new FormData(form);
    const data = {};
    
    // Convert FormData to plain object
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    return data;
}

// ============================================
// Clipboard API - Copy to Clipboard
// ============================================

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification('Copied to clipboard!', 'success');
        return true;
    } catch (err) {
        console.error('Failed to copy:', err);
        // Fallback method
        return fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Copied to clipboard!', 'success');
        return true;
    } catch (err) {
        console.error('Fallback copy failed:', err);
        return false;
    } finally {
        document.body.removeChild(textArea);
    }
}

// ============================================
// Notification System
// ============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// Smooth Scroll to Top
// ============================================

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #3b82f6, #6366f1);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        display: none;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 999;
        transition: all 0.3s ease;
    `;
    
    button.addEventListener('click', scrollToTop);
    document.body.appendChild(button);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
}

// ============================================
// Input Validation Utilities
// ============================================

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePhone(phone) {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
}

function validateName(name) {
    return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
}

function validateRequired(value) {
    return value !== null && value !== undefined && value.trim().length > 0;
}

// ============================================
// Asynchronous Operations - Promises
// ============================================

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Fetch data with error handling
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Fetch error:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// Callback Pattern Example
// ============================================

function processWithCallback(data, callback) {
    setTimeout(() => {
        const result = data ? data.toUpperCase() : '';
        callback(result);
    }, 500);
}

// ============================================
// Array and Object Operations
// ============================================

// Filter function
function filterItems(items, searchTerm) {
    if (!searchTerm) return items;
    
    return items.filter(item => {
        return Object.values(item).some(value => 
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
    });
}

// Sort function
function sortItems(items, key, order = 'asc') {
    return [...items].sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];
        
        if (aVal < bVal) return order === 'asc' ? -1 : 1;
        if (aVal > bVal) return order === 'asc' ? 1 : -1;
        return 0;
    });
}

// ============================================
// Local Data Storage Management
// ============================================

const StorageManager = {
    // Save data to localStorage
    save: function(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Storage save error:', error);
            return false;
        }
    },
    
    // Load data from localStorage
    load: function(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Storage load error:', error);
            return null;
        }
    },
    
    // Remove data from localStorage
    remove: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Storage remove error:', error);
            return false;
        }
    },
    
    // Clear all localStorage
    clear: function() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Storage clear error:', error);
            return false;
        }
    }
};

// ============================================
// Analytics and Tracking
// ============================================

function trackEvent(eventName, eventData = {}) {
    const event = {
        name: eventName,
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
        data: eventData
    };
    
    // Get existing events
    let events = StorageManager.load('analytics_events') || [];
    events.push(event);
    
    // Keep only last 100 events
    if (events.length > 100) {
        events = events.slice(-100);
    }
    
    StorageManager.save('analytics_events', events);
    console.log('Event tracked:', eventName);
}

// ============================================
// Page Load Performance
// ============================================

function measurePageLoad() {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
        
        // Track performance
        trackEvent('page_load', {
            loadTime: loadTime,
            page: window.location.pathname
        });
    });
}

// ============================================
// Intersection Observer for Animations
// ============================================

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe elements with animation class
    document.querySelectorAll('.card, .feature-card, .course-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// Debounce Function
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// Footer Information Update
// ============================================

function updateFooterInfo() {
    const footerInfo = document.getElementById('footer-info');
    if (footerInfo) {
        const screenWidth = window.screen.width;
        const online = navigator.onLine ? 'Online' : 'Offline';
        footerInfo.textContent = `Screen: ${screenWidth}px | Status: ${online}`;
    }
}

// ============================================
// Event Listeners Setup
// ============================================

function initializeEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const nav = document.getElementById('main-nav');
        const toggle = document.getElementById('mobile-menu-toggle');
        
        if (nav && toggle && nav.classList.contains('active')) {
            if (!nav.contains(e.target) && !toggle.contains(e.target)) {
                nav.classList.remove('active');
                toggle.textContent = '☰';
            }
        }
    });
}

// ============================================
// Geolocation API (Optional)
// ============================================

function getUserLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log(`User location: ${latitude}, ${longitude}`);
                StorageManager.save('user_location', { latitude, longitude });
            },
            (error) => {
                console.warn('Geolocation error:', error.message);
            }
        );
    } else {
        console.log('Geolocation not supported');
    }
}

// ============================================
// Match Media API - Responsive Behavior
// ============================================

function setupMediaQueries() {
    // Mobile query
    const mobileQuery = window.matchMedia('(max-width: 640px)');
    const tabletQuery = window.matchMedia('(max-width: 1024px)');
    
    function handleMobileChange(e) {
        if (e.matches) {
            console.log('Mobile view active');
            // Add mobile-specific behavior
        }
    }
    
    function handleTabletChange(e) {
        if (e.matches) {
            console.log('Tablet view active');
            // Add tablet-specific behavior
        }
    }
    
    mobileQuery.addListener(handleMobileChange);
    tabletQuery.addListener(handleTabletChange);
    
    // Initial check
    handleMobileChange(mobileQuery);
    handleTabletChange(tabletQuery);
}

// ============================================
// Browser History Management
// ============================================

function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = 'index.html';
    }
}

function goForward() {
    window.history.forward();
}

// ============================================
// Page Visibility API
// ============================================

function setupVisibilityTracking() {
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.log('Page hidden');
            trackEvent('page_hidden');
        } else {
            console.log('Page visible');
            trackEvent('page_visible');
        }
    });
}

// ============================================
// Initialize on Page Load
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // Initialize all features
    loadTheme();
    trackPageVisit();
    setActiveNavLink();
    updateFooterInfo();
    initializeEventListeners();
    createScrollToTopButton();
    initScrollAnimations();
    measurePageLoad();
    setupMediaQueries();
    setupVisibilityTracking();
    
    // Optional: Get user location (commented out for privacy)
    // getUserLocation();
    
    console.log('All systems initialized');
    
    // Track page view
    trackEvent('page_view', {
        page: window.location.pathname,
        referrer: document.referrer
    });
});

// Window load event
window.addEventListener('load', function() {
    console.log('Window fully loaded');
    updateScreenInfo();
    updateFooterInfo();
});

// Before unload - save session data
window.addEventListener('beforeunload', function() {
    const sessionData = {
        lastPage: window.location.pathname,
        timestamp: new Date().toISOString(),
        visitCount: visitCount
    };
    sessionStorage.setItem('last_session', JSON.stringify(sessionData));
});

// ============================================
// Utility Functions Export (for other scripts)
// ============================================

// Make functions available globally
window.utils = {
    validateEmail,
    validatePhone,
    validateName,
    validateRequired,
    copyToClipboard,
    showNotification,
    scrollToTop,
    delay,
    fetchData,
    filterItems,
    sortItems,
    debounce,
    StorageManager,
    trackEvent
};

console.log('Script.js loaded successfully!');