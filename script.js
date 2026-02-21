document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initEmailCopy();
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

// YEAR
<script>
  document.getElementById("year").textContent = new Date().getFullYear();
</script>