// Front Page JavaScript
class FrontPage {
    constructor() {
        this.clickCount = 0;
        this.maxClicks = 20;
        this.isCompleted = false;
        this.confettiActive = false;
        
        // DOM elements
        this.clickButton = document.getElementById('clickButton');
        this.clickCountDisplay = document.getElementById('clickCount');
        this.mainContent = document.getElementById('mainContent');
        this.congratsSection = document.getElementById('congratsSection');
        this.confettiContainer = document.getElementById('confetti-container');
        
        this.init();
    }
    
    init() {
        // Add event listeners
        this.clickButton.addEventListener('click', () => this.handleButtonClick());
        
        // Initialize display
        this.updateClickDisplay();
        
        // Add some initial animations
        this.addFloatingElements();
    }
    
    handleButtonClick() {
        if (this.isCompleted) return;
        
        // Increment click count
        this.clickCount++;
        
        // Add click animation
        this.animateButtonClick();
        
        // Update display
        this.updateClickDisplay();
        
        // Check if target reached
        if (this.clickCount >= this.maxClicks) {
            this.showCongratulations();
        } else {
            // Add some fun feedback for clicks
            this.addClickFeedback();
        }
    }
    
    animateButtonClick() {
        this.clickButton.classList.add('button-clicked');
        setTimeout(() => {
            this.clickButton.classList.remove('button-clicked');
        }, 300);
    }
    
    updateClickDisplay() {
        this.clickCountDisplay.textContent = this.clickCount;
        
        // Change button text as we get closer
        const buttonText = this.clickButton.querySelector('.button-text');
        const remaining = this.maxClicks - this.clickCount;
        
        if (remaining <= 3 && remaining > 0) {
            buttonText.textContent = `${remaining} more!`;
            this.clickButton.style.background = 'rgba(255, 105, 180, 0.3)';
        } else if (remaining === 0) {
            buttonText.textContent = 'Amazing!';
        }
    }
    
    addClickFeedback() {
        // Create floating feedback
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 2rem;
            color: #ff69b4;
            pointer-events: none;
            z-index: 999;
            animation: floatUp 1s ease-out forwards;
        `;
        
        const messages = ['✨', '🌟', '⭐', '💫', '🎉', '🚀', '⚡', '🔥'];
        feedback.textContent = messages[Math.floor(Math.random() * messages.length)];
        
        document.body.appendChild(feedback);
        
        // Add floating animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatUp {
                0% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(0.5);
                }
                50% {
                    opacity: 1;
                    transform: translate(-50%, -150px) scale(1.2);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -200px) scale(0.8);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Remove after animation
        setTimeout(() => {
            feedback.remove();
            style.remove();
        }, 1000);
    }
    
    showCongratulations() {
        this.isCompleted = true;
        
        // Create confetti
        this.createConfetti();
        
        // Hide main content and show congratulations
        setTimeout(() => {
            this.mainContent.style.display = 'none';
            this.congratsSection.style.display = 'flex';
            
            // Redirect after showing congratulations
            setTimeout(() => {
                this.redirectToMainPage();
            }, 3000); // 3 seconds
        }, 500);
    }
    
    createConfetti() {
        if (this.confettiActive) return;
        this.confettiActive = true;
        
        const colors = ['#ff69b4', '#9b59b6', '#3498db', '#2ecc71', '#f39c12', '#e74c3c'];
        const shapes = ['square', 'circle', 'triangle'];
        
        // Create multiple waves of confetti
        for (let wave = 0; wave < 3; wave++) {
            setTimeout(() => {
                this.createConfettiWave();
            }, wave * 200);
        }
    }
    
    createConfettiWave() {
        const confettiCount = 50;
        const colors = ['#ff69b4', '#9b59b6', '#3498db', '#2ecc71', '#f39c12', '#e74c3c'];
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti-piece';
                
                // Random properties
                const color = colors[Math.floor(Math.random() * colors.length)];
                const size = Math.random() * 8 + 5; // 5-13px
                const left = Math.random() * 100; // 0-100%
                const animationDuration = Math.random() * 2 + 2; // 2-4 seconds
                const delay = Math.random() * 1000; // 0-1000ms delay
                
                confetti.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    left: ${left}%;
                    top: -10px;
                    border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                    animation: confettiFall ${animationDuration}s linear forwards;
                    animation-delay: ${delay}ms;
                    transform: rotate(${Math.random() * 360}deg);
                `;
                
                this.confettiContainer.appendChild(confetti);
                
                // Remove confetti after animation
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.remove();
                    }
                }, (animationDuration * 1000) + delay + 500);
            }, i * 20);
        }
    }
    
    addFloatingElements() {
        // Add some floating background elements for ambiance
        const floatingElements = ['☁️', '⭐', '✨', '🌟'];
        
        for (let i = 0; i < 6; i++) {
            const element = document.createElement('div');
            element.style.cssText = `
                position: fixed;
                font-size: ${Math.random() * 20 + 15}px;
                color: rgba(255, 255, 255, 0.1);
                pointer-events: none;
                z-index: -1;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatAround ${Math.random() * 10 + 15}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            element.textContent = floatingElements[Math.floor(Math.random() * floatingElements.length)];
            document.body.appendChild(element);
        }
        
        // Add floating animation
        if (!document.getElementById('floatingAnimation')) {
            const style = document.createElement('style');
            style.id = 'floatingAnimation';
            style.textContent = `
                @keyframes floatAround {
                    0%, 100% {
                        transform: translate(0, 0) rotate(0deg);
                    }
                    25% {
                        transform: translate(20px, -30px) rotate(90deg);
                    }
                    50% {
                        transform: translate(-15px, 20px) rotate(180deg);
                    }
                    75% {
                        transform: translate(30px, 10px) rotate(270deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    redirectToMainPage() {
        // Add a fade out effect
        document.body.style.transition = 'opacity 0.5s ease-out';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            // Redirect to main page
            // Replace 'main.html' with your actual main page filename
            window.location.href = 'index.html'; // or 'main.html' or whatever your main page is called
        }, 500);
    }
    
    // Add some extra interactivity
    addMouseTrail() {
        let mouseTrail = [];
        const maxTrailLength = 10;
        
        document.addEventListener('mousemove', (e) => {
            // Add current mouse position
            mouseTrail.push({
                x: e.clientX,
                y: e.clientY,
                time: Date.now()
            });
            
            // Remove old trail points
            mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 500);
            
            // Limit trail length
            if (mouseTrail.length > maxTrailLength) {
                mouseTrail.shift();
            }
            
            // Create trail effect
            if (mouseTrail.length > 1 && Math.random() < 0.1) {
                this.createTrailParticle(e.clientX, e.clientY);
            }
        });
    }
    
    createTrailParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(255, 105, 180, 0.6);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 999;
            animation: fadeParticle 0.8s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        // Add fade animation if not exists
        if (!document.getElementById('particleAnimation')) {
            const style = document.createElement('style');
            style.id = 'particleAnimation';
            style.textContent = `
                @keyframes fadeParticle {
                    0% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: scale(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 800);
    }
    
    // Add keyboard shortcuts for fun
    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Space bar or Enter to click button
            if ((e.code === 'Space' || e.code === 'Enter') && !this.isCompleted) {
                e.preventDefault();
                this.handleButtonClick();
            }
            
            // Easter egg: Konami code for instant completion
            // Up, Up, Down, Down, Left, Right, Left, Right, B, A
            if (!this.isCompleted && this.checkKonamiCode(e.code)) {
                this.clickCount = this.maxClicks - 1;
                this.handleButtonClick();
            }
        });
    }
    
    checkKonamiCode(keyCode) {
        if (!this.konamiSequence) {
            this.konamiSequence = [];
        }
        
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        
        this.konamiSequence.push(keyCode);
        
        if (this.konamiSequence.length > konamiCode.length) {
            this.konamiSequence.shift();
        }
        
        return this.konamiSequence.length === konamiCode.length && 
               this.konamiSequence.every((key, index) => key === konamiCode[index]);
    }
    
    // Add sound effects (optional - commented out as it requires audio files)
    /*
    playClickSound() {
        const audio = new Audio('click.mp3'); // Add your sound file
        audio.volume = 0.3;
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
    
    playSuccessSound() {
        const audio = new Audio('success.mp3'); // Add your sound file
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
    */
}

// Initialize the front page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const frontPage = new FrontPage();
    
    // Add mouse trail effect
    frontPage.addMouseTrail();
    
    // Add keyboard shortcuts
    frontPage.addKeyboardShortcuts();
    
    // Add some console messages for developers
    console.log('🌟 Welcome to Sky\'s Attitude! 🌟');
    console.log('Try pressing Space or Enter to click the button!');
    console.log('Easter egg: Try the Konami code! ↑↑↓↓←→←→BA');
});

// Add some global utility functions
window.createSparkle = function(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #fff 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: sparkleAnimation 0.6s ease-out forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    // Add sparkle animation
    if (!document.getElementById('sparkleAnimation')) {
        const style = document.createElement('style');
        style.id = 'sparkleAnimation';
        style.textContent = `
            @keyframes sparkleAnimation {
                0% {
                    opacity: 1;
                    transform: scale(0) rotate(0deg);
                }
                50% {
                    opacity: 1;
                    transform: scale(1) rotate(180deg);
                }
                100% {
                    opacity: 0;
                    transform: scale(0) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.remove();
        }
    }, 600);
};

// Add performance monitoring
window.addEventListener('load', () => {
    console.log(`⚡ Page loaded in ${performance.now().toFixed(2)}ms`);
});
                