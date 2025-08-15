// Badge & Streaks Screen JavaScript

// Badge data structure
const badgeData = {
    'gratitude-starter': {
        title: 'Gratitude Starter',
        description: 'Completed gratitude theme',
        category: 'Theme Completion',
        difficulty: 'Beginner',
        earnedDate: '2 days ago',
        icon: '🙏'
    },
    'gratitude-master': {
        title: 'Gratitude Master',
        description: 'All gratitude assignments complete',
        category: 'Theme Mastery',
        difficulty: 'Advanced',
        earnedDate: 'Today',
        icon: '🌟'
    },
    'respect-beginner': {
        title: 'Respect Beginner',
        description: 'Started respect theme',
        category: 'Theme Completion',
        difficulty: 'Beginner',
        earnedDate: '1 week ago',
        icon: '🤝'
    },
    'respect-achiever': {
        title: 'Respect Achiever',
        description: 'Completed respect theme',
        category: 'Theme Mastery',
        difficulty: 'Advanced',
        earnedDate: '1 week ago',
        icon: '💎'
    },
    'discipline-starter': {
        title: 'Discipline Starter',
        description: 'Started discipline theme',
        category: 'Theme Completion',
        difficulty: 'Beginner',
        earnedDate: '2 weeks ago',
        icon: '⚡'
    },
    'discipline-master': {
        title: 'Discipline Master',
        description: 'Completed discipline theme',
        category: 'Theme Mastery',
        difficulty: 'Advanced',
        earnedDate: '2 weeks ago',
        icon: '🏅'
    },
    'week-streak-1': {
        title: 'Week Warrior',
        description: '1 week streak',
        category: 'Consistency',
        difficulty: 'Beginner',
        earnedDate: '2 weeks ago',
        icon: '📅'
    },
    'week-streak-2': {
        title: 'Fortnight Fighter',
        description: '2 week streak',
        category: 'Consistency',
        difficulty: 'Intermediate',
        earnedDate: '1 week ago',
        icon: '📅📅'
    },
    'week-streak-3': {
        title: 'Triple Week Titan',
        description: '3 week streak',
        category: 'Consistency',
        difficulty: 'Advanced',
        earnedDate: 'Today',
        icon: '📅📅📅'
    },
    'first-perfect': {
        title: 'Perfect Score',
        description: '100% on first assignment',
        category: 'Achievement',
        difficulty: 'Intermediate',
        earnedDate: '3 weeks ago',
        icon: '💯'
    },
    'helpful-student': {
        title: 'Helpful Student',
        description: 'Helped classmates 5 times',
        category: 'Leadership',
        difficulty: 'Intermediate',
        earnedDate: '1 week ago',
        icon: '🤲'
    },
    'family-educator': {
        title: 'Family Educator',
        description: 'Shared themes with family',
        category: 'Communication',
        difficulty: 'Beginner',
        earnedDate: '2 days ago',
        icon: '👨‍👩‍👧‍👦'
    }
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    setupBadgeInteractions();
    setupEventListeners();
    animatePageLoad();
    loadBadgeProgress();
    updateStats();
});

// Setup badge click interactions
function setupBadgeInteractions() {
    const badgeItems = document.querySelectorAll('.badge-item');
    
    badgeItems.forEach(badge => {
        badge.addEventListener('click', function() {
            const badgeId = this.getAttribute('data-badge');
            showBadgeModal(badgeId);
        });
        
        // Add keyboard support
        badge.setAttribute('tabindex', '0');
        badge.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                const badgeId = this.getAttribute('data-badge');
                showBadgeModal(badgeId);
            }
        });
    });
}

// Show badge detail modal
function showBadgeModal(badgeId) {
    const badge = badgeData[badgeId];
    if (!badge) return;
    
    // Update modal content
    document.getElementById('modalBadgeIcon').textContent = badge.icon;
    document.getElementById('modalBadgeTitle').textContent = badge.title;
    document.getElementById('modalBadgeDescription').textContent = badge.description;
    document.getElementById('modalBadgeDate').textContent = badge.earnedDate;
    document.getElementById('modalBadgeCategory').textContent = badge.category;
    document.getElementById('modalBadgeDifficulty').textContent = badge.difficulty;
    
    // Show modal
    const modal = document.getElementById('badgeModal');
    modal.classList.add('show');
    
    // Add celebration effect for newly earned badges
    if (badge.earnedDate === 'Today') {
        addCelebrationEffect();
    }
}

// Close badge modal
function closeBadgeModal() {
    const modal = document.getElementById('badgeModal');
    modal.classList.remove('show');
}

// Add celebration effect for new badges
function addCelebrationEffect() {
    const modal = document.getElementById('badgeModal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Add sparkle effect
    const sparkles = document.createElement('div');
    sparkles.className = 'sparkles';
    sparkles.innerHTML = '✨✨✨';
    sparkles.style.cssText = `
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 2rem;
        animation: sparkle 1s ease-out;
        z-index: 1;
    `;
    
    modalContent.appendChild(sparkles);
    
    // Remove sparkles after animation
    setTimeout(() => {
        if (sparkles.parentNode) {
            sparkles.parentNode.removeChild(sparkles);
        }
    }, 1000);
}

// Setup event listeners
function setupEventListeners() {
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeBadgeModal();
        }
    });
    
    // Click outside modal to close
    const modal = document.getElementById('badgeModal');
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeBadgeModal();
        }
    });
}

// Animate page load
function animatePageLoad() {
    const elements = [
        '.streak-header',
        '.stats-overview',
        '.badges-section',
        '.next-badge-section',
        '.motivation-section'
    ];
    
    elements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 1s ease, transform 1s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
    
    // Animate badges individually
    const badgeItems = document.querySelectorAll('.badge-item');
    badgeItems.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            badge.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            badge.style.opacity = '1';
            badge.style.transform = 'scale(1)';
        }, 800 + (index * 100));
    });
}

// Load badge progress from localStorage
function loadBadgeProgress() {
    const savedProgress = localStorage.getItem('wcwma-badge-progress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        updateBadgeDisplay(progress);
    }
}

// Update badge display based on progress
function updateBadgeDisplay(progress) {
    // This would integrate with the assignment completion system
    // For now, we'll show all badges as earned
    console.log('Badge progress loaded:', progress);
}

// Update statistics
function updateStats() {
    const totalBadges = Object.keys(badgeData).length;
    const thisMonthBadges = calculateThisMonthBadges();
    const completionRate = calculateCompletionRate();
    
    // Update stats display
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers[0]) statNumbers[0].textContent = totalBadges;
    if (statNumbers[1]) statNumbers[1].textContent = thisMonthBadges;
    if (statNumbers[2]) statNumbers[2].textContent = completionRate + '%';
}

// Calculate badges earned this month
function calculateThisMonthBadges() {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    // Count badges earned this month
    let count = 0;
    Object.values(badgeData).forEach(badge => {
        if (badge.earnedDate === 'Today' || 
            badge.earnedDate.includes('days ago') || 
            badge.earnedDate.includes('week ago')) {
            count++;
        }
    });
    
    return count;
}

// Calculate completion rate
function calculateCompletionRate() {
    // This would integrate with the assignment system
    // For now, return a placeholder value
    return 85;
}

// Navigation function
function goBack() {
    // Navigate back to the main mastery screen
    window.location.href = 'index.html';
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            transform: translateX(-50%) scale(0);
            opacity: 0;
        }
        50% {
            transform: translateX(-50%) scale(1.2);
            opacity: 1;
        }
        100% {
            transform: translateX(-50%) scale(1);
            opacity: 0;
        }
    }
    
    .badge-item {
        animation: badgeFloat 3s ease-in-out infinite;
    }
    
    @keyframes badgeFloat {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-5px);
        }
    }
    
    .badge-item:hover {
        animation: none;
    }
`;
document.head.appendChild(style);

// Add haptic feedback for mobile
function addHapticFeedback() {
    if ('vibrate' in navigator) {
        const badgeItems = document.querySelectorAll('.badge-item');
        badgeItems.forEach(badge => {
            badge.addEventListener('click', () => {
                navigator.vibrate(50);
            });
        });
    }
}

// Initialize haptic feedback
addHapticFeedback();

// Add accessibility features
function setupAccessibility() {
    const badgeItems = document.querySelectorAll('.badge-item');
    
    badgeItems.forEach((badge, index) => {
        const badgeId = badge.getAttribute('data-badge');
        const badgeInfo = badgeData[badgeId];
        
        if (badgeInfo) {
            badge.setAttribute('role', 'button');
            badge.setAttribute('aria-label', `${badgeInfo.title} - ${badgeInfo.description}. Click to view details.`);
        }
    });
    
    // Add list role to badges grid
    const badgesGrid = document.querySelector('.badges-grid');
    if (badgesGrid) {
        badgesGrid.setAttribute('role', 'list');
        badgesGrid.setAttribute('aria-label', 'Earned badges collection');
    }
}

// Initialize accessibility
setupAccessibility();

// Add progress tracking integration
function integrateWithAssignments() {
    // This function would connect with the assignment completion system
    // to automatically award badges based on progress
    
    // Example: Check if gratitude assignments are complete
    const gratitudeAssignments = localStorage.getItem('wcwma-assignments');
    if (gratitudeAssignments) {
        const assignments = JSON.parse(gratitudeAssignments);
        const gratitudeComplete = assignments.filter(a => 
            a.title.toLowerCase().includes('gratitude') && a.completed
        ).length;
        
        if (gratitudeComplete >= 2) {
            // Award gratitude master badge
            console.log('Gratitude Master badge earned!');
        }
    }
}

// Initialize integration
integrateWithAssignments();

// Add streak calculation
function calculateCurrentStreak() {
    // This would integrate with the assignment completion system
    // to calculate the actual current streak
    
    // For now, return the displayed value
    return 3;
}

// Add badge rarity system
function getBadgeRarity(badgeId) {
    const badge = badgeData[badgeId];
    if (!badge) return 'common';
    
    if (badge.difficulty === 'Advanced') return 'rare';
    if (badge.difficulty === 'Intermediate') return 'uncommon';
    return 'common';
}

// Add achievement sound effects (optional)
function playAchievementSound() {
    // This could be implemented with actual audio files
    console.log('🎵 Playing achievement sound');
}

// Enhanced badge interaction
function enhancedBadgeClick(badgeId) {
    const badge = badgeData[badgeId];
    if (!badge) return;
    
    // Show modal
    showBadgeModal(badgeId);
    
    // Play sound
    playAchievementSound();
    
    // Add haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
    
    // Track badge view
    trackBadgeView(badgeId);
}

// Track badge interactions
function trackBadgeView(badgeId) {
    const views = JSON.parse(localStorage.getItem('wcwma-badge-views') || '{}');
    views[badgeId] = (views[badgeId] || 0) + 1;
    localStorage.setItem('wcwma-badge-views', JSON.stringify(views));
}

// Add error handling
function handleErrors() {
    window.addEventListener('error', function(event) {
        console.error('Badge screen error:', event.error);
    });
}

// Initialize error handling
handleErrors();
