// Weekly Mastery Home Screen JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Add entrance animations
    animateElements();
    
    // Add badge interaction
    setupBadgeInteraction();
    
    // Add progress bar animation
    animateProgressBar();
});

function animateElements() {
    const elements = [
        '.mastery-title',
        '.theme-headline',
        '.gratitude-badge',
        '.progress-container',
        '.burned-caption'
    ];
    
    elements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}

function setupBadgeInteraction() {
    const badge = document.querySelector('.gratitude-badge');
    if (!badge) return;
    
    // Add click interaction
    badge.addEventListener('click', function() {
        // Add a subtle bounce effect
        this.style.transform = 'scale(1.05)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Show achievement message
        showAchievementMessage();
    });
    
    // Add hover sound effect (optional)
    badge.addEventListener('mouseenter', function() {
        // Could add subtle sound effect here
        this.style.cursor = 'pointer';
    });
}

function showAchievementMessage() {
    // Create achievement message
    const message = document.createElement('div');
    message.className = 'achievement-message';
    message.innerHTML = `
        <div class="message-content">
            <span class="message-icon">🎉</span>
            <span class="message-text">Gratitude Mastery Complete!</span>
        </div>
    `;
    
    // Style the message
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10B981, #059669);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        font-weight: 600;
        font-size: 1rem;
        z-index: 1000;
        transform: translateX(400px);
        transition: transform 0.5s ease;
        max-width: 300px;
    `;
    
    // Add message content styles
    const messageContent = message.querySelector('.message-content');
    messageContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    const messageIcon = message.querySelector('.message-icon');
    messageIcon.style.fontSize = '1.5rem';
    
    const messageText = message.querySelector('.message-text');
    messageText.style.fontSize = '0.95rem';
    
    // Add to page
    document.body.appendChild(message);
    
    // Animate in
    setTimeout(() => {
        message.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        message.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 500);
    }, 3000);
}

function animateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    if (!progressFill) return;
    
    // Start with 0% width
    progressFill.style.width = '0%';
    
    // Animate to 100% after a short delay
    setTimeout(() => {
        progressFill.style.transition = 'width 1.5s ease-out';
        progressFill.style.width = '100%';
    }, 800);
}

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        const badge = document.querySelector('.gratitude-badge');
        if (badge && document.activeElement === badge) {
            event.preventDefault();
            badge.click();
        }
    }
});

// Add focus management for accessibility
function setupAccessibility() {
    const badge = document.querySelector('.gratitude-badge');
    if (badge) {
        badge.setAttribute('tabindex', '0');
        badge.setAttribute('role', 'button');
        badge.setAttribute('aria-label', 'Gratitude Starter Badge - Click to view achievement');
    }
}

// Initialize accessibility features
setupAccessibility();

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add error handling for missing elements
function handleMissingElements() {
    const requiredElements = [
        '.mastery-title',
        '.theme-headline',
        '.gratitude-badge',
        '.progress-container'
    ];
    
    requiredElements.forEach(selector => {
        if (!document.querySelector(selector)) {
            console.warn(`Required element not found: ${selector}`);
        }
    });
}

// Check for missing elements
handleMissingElements();
