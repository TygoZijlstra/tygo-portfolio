document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initEmailCopy();
    initScrollAnimations();
});

//SMOOTH SCROLLING
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

//EMAIL COPY FUNCTIONALITY
function initEmailCopy() {
    const emailCopyBtn = document.getElementById('email-copy');
    const emailNotification = document.getElementById('email-notification');
    
    if (emailCopyBtn && emailNotification) {
        emailCopyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.getAttribute('data-email');
            
            // Copy email to clipboard
            navigator.clipboard.writeText(email).then(function() {
                // Show notification
                showEmailNotification();
            }).catch(function() {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                textArea.setSelectionRange(0, 99999);
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showEmailNotification();
            });
        });
    }
    
    function showEmailNotification() {
        emailNotification.classList.add('show');
        
        // Hide notification after 3 seconds
        setTimeout(function() {
            emailNotification.classList.remove('show');
        }, 3000);
    }
}

// SCROLL ANIMATIONS (IntersectionObserver)
function initScrollAnimations() {
    // Convert header .anim elements (with delays) stay as CSS animations.
    // For elements below the fold, use IntersectionObserver for scroll-triggered animations.
    const scrollElements = document.querySelectorAll('section .anim');

    scrollElements.forEach(el => {
        // Remove the CSS animation (those are for header only)
        el.style.animation = 'none';
        el.classList.add('anim-scroll');
        el.classList.remove('anim');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    document.querySelectorAll('.anim-scroll').forEach(el => {
        observer.observe(el);
    });
}

// YEAR
document.getElementById("year").textContent = new Date().getFullYear();