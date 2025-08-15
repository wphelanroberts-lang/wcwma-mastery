// Assignment / Practice Screen JavaScript

// Store assignments data
let assignments = [
    { id: 1, title: "Gratitude Bow", completed: false },
    { id: 2, title: "Front Kicks Practice", completed: false },
    { id: 3, title: "Help a Classmate", completed: false },
    { id: 4, title: "Share with Family", completed: false }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadAssignments();
    updateProgress();
    setupEventListeners();
    animatePageLoad();
});

// Load saved assignments from localStorage
function loadAssignments() {
    const saved = localStorage.getItem('wcwma-assignments');
    if (saved) {
        assignments = JSON.parse(saved);
        updateAssignmentDisplay();
    }
}

// Save assignments to localStorage
function saveAssignments() {
    localStorage.setItem('wcwma-assignments', JSON.stringify(assignments));
}

// Update the visual display of assignments
function updateAssignmentDisplay() {
    assignments.forEach(assignment => {
        const checkbox = document.getElementById(`assignment${assignment.id}`);
        const assignmentItem = document.querySelector(`[data-id="${assignment.id}"]`);
        const markCompleteBtn = assignmentItem.querySelector('.mark-complete-btn');
        
        if (assignment.completed) {
            checkbox.checked = true;
            assignmentItem.classList.add('completed');
            markCompleteBtn.textContent = 'Completed!';
            markCompleteBtn.classList.add('completed');
        } else {
            checkbox.checked = false;
            assignmentItem.classList.remove('completed');
            markCompleteBtn.textContent = 'Mark Complete';
            markCompleteBtn.classList.remove('completed');
        }
    });
}

// Mark an assignment as complete
function markComplete(assignmentId) {
    const assignment = assignments.find(a => a.id === assignmentId);
    if (!assignment || assignment.completed) return;
    
    // Mark as completed
    assignment.completed = true;
    
    // Update display
    updateAssignmentDisplay();
    
    // Update progress
    updateProgress();
    
    // Save to localStorage
    saveAssignments();
    
    // Show celebration modal
    showCelebration();
    
    // Add completion animation
    const assignmentItem = document.querySelector(`[data-id="${assignmentId}"]`);
    assignmentItem.style.animation = 'assignmentComplete 0.6s ease-out';
    
    setTimeout(() => {
        assignmentItem.style.animation = '';
    }, 600);
}

// Update progress bar and count
function updateProgress() {
    const completedCount = assignments.filter(a => a.completed).length;
    const totalCount = assignments.length;
    
    // Update progress count
    const progressCount = document.querySelector('.progress-count');
    progressCount.textContent = `${completedCount} of ${totalCount}`;
    
    // Update progress bar
    const progressFill = document.getElementById('progressFill');
    const percentage = (completedCount / totalCount) * 100;
    
    progressFill.style.width = `${percentage}%`;
    
    // Add completion celebration if all assignments are done
    if (completedCount === totalCount) {
        showAllCompleteCelebration();
    }
}

// Show celebration modal for individual assignment
function showCelebration() {
    const modal = document.getElementById('celebrationModal');
    modal.classList.add('show');
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        closeCelebration();
    }, 3000);
}

// Close celebration modal
function closeCelebration() {
    const modal = document.getElementById('celebrationModal');
    modal.classList.remove('show');
}

// Show special celebration when all assignments are complete
function showAllCompleteCelebration() {
    const modal = document.getElementById('celebrationModal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Update modal content for all complete
    modalContent.innerHTML = `
        <div class="celebration-icon">🏆</div>
        <h3>All Assignments Complete!</h3>
        <p>Congratulations! You've mastered all the gratitude assignments this week. You're a true WCWMA warrior!</p>
        <button class="modal-close-btn" onclick="closeCelebration()">Continue</button>
    `;
    
    modal.classList.add('show');
    
    // Don't auto-hide this one - let user close it
}

// Setup event listeners
function setupEventListeners() {
    // Checkbox change events
    assignments.forEach(assignment => {
        const checkbox = document.getElementById(`assignment${assignment.id}`);
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                markComplete(assignment.id);
            } else {
                // Unchecking is not allowed in this interface
                this.checked = true;
            }
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeCelebration();
        }
    });
    
    // Click outside modal to close
    const modal = document.getElementById('celebrationModal');
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeCelebration();
        }
    });
}

// Animate page load
function animatePageLoad() {
    const elements = [
        '.theme-header',
        '.progress-overview',
        '.assignments-container',
        '.motivation-section'
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

// Navigation function
function goBack() {
    // Navigate back to the main mastery screen
    window.location.href = 'index.html';
}

// Add CSS animation for assignment completion
const style = document.createElement('style');
style.textContent = `
    @keyframes assignmentComplete {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
    
    .assignment-item.completed {
        animation: assignmentComplete 0.6s ease-out;
    }
`;
document.head.appendChild(style);

// Progress bar animation on load
function animateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    const completedCount = assignments.filter(a => a.completed).length;
    const totalCount = assignments.length;
    const percentage = (completedCount / totalCount) * 100;
    
    // Start from 0 and animate to current percentage
    progressFill.style.width = '0%';
    
    setTimeout(() => {
        progressFill.style.transition = 'width 1.2s ease-out';
        progressFill.style.width = `${percentage}%`;
    }, 500);
}

// Call progress bar animation after page load
setTimeout(animateProgressBar, 800);

// Add accessibility features
function setupAccessibility() {
    // Add ARIA labels and roles
    const assignmentItems = document.querySelectorAll('.assignment-item');
    
    assignmentItems.forEach((item, index) => {
        const checkbox = item.querySelector('.assignment-checkbox');
        const button = item.querySelector('.mark-complete-btn');
        
        // Add ARIA labels
        checkbox.setAttribute('aria-label', `Mark ${assignments[index].title} as complete`);
        button.setAttribute('aria-label', `Mark ${assignments[index].title} as complete`);
        
        // Add roles
        item.setAttribute('role', 'listitem');
        button.setAttribute('role', 'button');
    });
    
    // Add list role to container
    const assignmentsContainer = document.querySelector('.assignments-container');
    assignmentsContainer.setAttribute('role', 'list');
}

// Initialize accessibility
setupAccessibility();

// Add sound effects (optional)
function playCompletionSound() {
    // This could be implemented with actual audio files
    // For now, we'll just log that a sound would play
    console.log('🎵 Playing completion sound');
}

// Enhanced completion feedback
function enhancedMarkComplete(assignmentId) {
    const assignment = assignments.find(a => a.id === assignmentId);
    if (!assignment || assignment.completed) return;
    
    // Mark as completed
    assignment.completed = true;
    
    // Update display
    updateAssignmentDisplay();
    
    // Update progress
    updateProgress();
    
    // Save to localStorage
    saveAssignments();
    
    // Play sound (if implemented)
    playCompletionSound();
    
    // Show celebration
    showCelebration();
    
    // Add haptic feedback (if supported)
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
}

// Add haptic feedback for mobile devices
function addHapticFeedback() {
    if ('vibrate' in navigator) {
        // Add haptic feedback to buttons
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                navigator.vibrate(50);
            });
        });
    }
}

// Initialize haptic feedback
addHapticFeedback();

// Add progress persistence across sessions
function persistProgress() {
    // Save progress every time it changes
    const originalUpdateProgress = updateProgress;
    updateProgress = function() {
        originalUpdateProgress.call(this);
        saveAssignments();
    };
}

// Initialize progress persistence
persistProgress();

// Add error handling
function handleErrors() {
    window.addEventListener('error', function(event) {
        console.error('Assignment screen error:', event.error);
        // Could show user-friendly error message
    });
}

// Initialize error handling
handleErrors();

// Video Tutorial Functionality
let kickCount = 0;
let isSlowMotion = false;
let isLooping = false;

// Toggle video play/pause
function toggleVideo() {
    const video = document.getElementById('frontKickVideo');
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    
    if (video.paused) {
        video.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline';
    } else {
        video.pause();
        playIcon.style.display = 'inline';
        pauseIcon.style.display = 'none';
    }
}

// Toggle slow motion
function toggleSlowMotion() {
    const video = document.getElementById('frontKickVideo');
    const normalSpeed = document.querySelector('.normal-speed');
    const slowSpeed = document.querySelector('.slow-speed');
    
    if (isSlowMotion) {
        video.playbackRate = 1.0;
        isSlowMotion = false;
        normalSpeed.style.display = 'inline';
        slowSpeed.style.display = 'none';
    } else {
        video.playbackRate = 0.5;
        isSlowMotion = true;
        normalSpeed.style.display = 'none';
        slowSpeed.style.display = 'inline';
    }
}

// Toggle loop
function toggleLoop() {
    const video = document.getElementById('frontKickVideo');
    const loopOff = document.querySelector('.loop-off');
    const loopOn = document.querySelector('.loop-on');
    
    if (isLooping) {
        video.loop = false;
        isLooping = false;
        loopOff.style.display = 'inline';
        loopOn.style.display = 'none';
    } else {
        video.loop = true;
        isLooping = true;
        loopOff.style.display = 'none';
        loopOn.style.display = 'inline';
    }
}

// Increment kick counter
function incrementKick() {
    kickCount++;
    if (kickCount > 10) kickCount = 10;
    
    updateKickDisplay();
    
    // Add haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
    
    // Show celebration when reaching 10 kicks
    if (kickCount === 10) {
        showKickCompletionCelebration();
    }
}

// Reset kick counter
function resetKickCount() {
    kickCount = 0;
    updateKickDisplay();
    
    // Add haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
}

// Update kick counter display
function updateKickDisplay() {
    const kickCountElement = document.getElementById('kickCount');
    if (kickCountElement) {
        kickCountElement.textContent = kickCount;
        
        // Change color based on progress
        if (kickCount === 10) {
            kickCountElement.style.color = '#10B981';
        } else if (kickCount >= 7) {
            kickCountElement.style.color = '#F59E0B';
        } else {
            kickCountElement.style.color = '#DC2626';
        }
    }
}

// Show celebration when all kicks are completed
function showKickCompletionCelebration() {
    const celebration = document.createElement('div');
    celebration.className = 'kick-celebration';
    celebration.innerHTML = `
        <div class="celebration-content">
            <div class="celebration-icon">🥋</div>
            <h3>Front Kicks Complete!</h3>
            <p>Great job! You've completed all 10 front kicks with proper technique.</p>
            <button onclick="this.parentElement.parentElement.remove()">Continue</button>
        </div>
    `;
    
    document.body.appendChild(celebration);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (celebration.parentElement) {
            celebration.remove();
        }
    }, 5000);
}

// Load kick count from localStorage
function loadKickCount() {
    const saved = localStorage.getItem('wcwma-kick-count');
    if (saved) {
        kickCount = parseInt(saved);
        updateKickDisplay();
    }
}

// Save kick count to localStorage
function saveKickCount() {
    localStorage.setItem('wcwma-kick-count', kickCount.toString());
}

// Auto-save kick count whenever it changes
function autoSaveKickCount() {
    const originalIncrementKick = incrementKick;
    const originalResetKickCount = resetKickCount;
    
    incrementKick = function() {
        originalIncrementKick.call(this);
        saveKickCount();
    };
    
    resetKickCount = function() {
        originalResetKickCount.call(this);
        saveKickCount();
    };
}

// Initialize video functionality
function initializeVideoFeatures() {
    loadKickCount();
    autoSaveKickCount();
    
    // Add video event listeners
    const video = document.getElementById('frontKickVideo');
    if (video) {
        video.addEventListener('ended', function() {
            // Reset play button when video ends
            const playIcon = document.querySelector('.play-icon');
            const pauseIcon = document.querySelector('.pause-icon');
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
        });
        
        video.addEventListener('loadedmetadata', function() {
            // Video is ready to play
            console.log('Front kick tutorial video loaded');
        });
    }
}

// Initialize video features when page loads
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    initializeVideoFeatures();
});
