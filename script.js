document.addEventListener('DOMContentLoaded', () => {
    const heartsContainer = document.querySelector('.hearts');
    
    // Create floating hearts
    for (let i = 0; i < 40; i++) {
        createHeart(heartsContainer);
    }
    
    // Create a new heart every second
    setInterval(() => {
        createHeart(heartsContainer);
        
        // Remove some hearts to prevent too many elements
        if (heartsContainer.children.length > 70) {
            heartsContainer.removeChild(heartsContainer.children[0]);
        }
    }, 800);
    
    // Ensure video plays on all platforms
    const video = document.querySelector('video');
    if (video) {
        video.play().catch(error => {
            console.log("Video autoplay failed:", error);
            // Add a play button if autoplay fails
            const playButton = document.createElement('button');
            playButton.innerHTML = "Play Video";
            playButton.className = "play-button";
            playButton.addEventListener('click', () => {
                video.play();
                playButton.style.display = 'none';
            });
            document.body.appendChild(playButton);
        });
    }
});

function createHeart(container) {
    const heart = document.createElement('div');
    
    // Heart SVG markup
    const heartColor = `rgba(255, 51, 153, ${Math.random() * 0.3 + 0.7})`;
    heart.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" fill="${heartColor}">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
    `;
    heart.className = 'heart';
    
    // Random properties for each heart
    const size = Math.random() * 30 + 15; // Increased size
    const left = Math.random() * 100;
    const animDuration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    
    // Apply styles
    heart.style.cssText = `
        position: absolute;
        bottom: -20px;
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        animation: float ${animDuration}s linear forwards;
        animation-delay: ${delay}s;
        z-index: -1;
        filter: drop-shadow(0 0 5px rgba(255, 51, 153, 0.7));
    `;
    
    container.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
        if (container.contains(heart)) {
            container.removeChild(heart);
        }
    }, (animDuration + delay) * 1000);
}

// Add the float animation and other styles to the stylesheet
const style = document.createElement('style');
style.innerHTML = `
@keyframes float {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-100vh) rotate(720deg);
        opacity: 0;
    }
}

.play-button {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    padding: 15px 30px;
    background-color: rgba(255, 51, 153, 0.8);
    color: white;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-size: 18px;
    box-shadow: 0 0 15px rgba(255, 51, 153, 0.5);
}

.play-button:hover {
    background-color: rgba(255, 51, 153, 1);
}

.heart svg {
    display: block;
    width: 100%;
    height: 100%;
}
`;
document.head.appendChild(style); 