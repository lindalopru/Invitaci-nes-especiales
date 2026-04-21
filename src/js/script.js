// ===========================
// INVITATION - ENHANCED WITH ANIMATIONS
// ===========================

class InvitationManager {
    constructor() {
        this.init();
        this.setupAOS();
        this.setupAnimations();
        this.setupInteractivity();
        this.setupScrollEffects();
    }

    init() {
        console.log('🎉 Bodas de Plata - Invitation Loaded with Enhanced Animations');
        this.card = document.querySelector('.invitation-card');
        this.addInitialAnimation();
    }

    // ===========================
    // AOS INITIALIZATION
    // ===========================

    setupAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                easing: 'ease-out',
                once: true,
                offset: 50,
            });
        }
    }

    // ===========================
    // ANIMATION EFFECTS
    // ===========================

    addInitialAnimation() {
        if (!this.card) return;

        this.card.style.animation = 'slideInCard 1s cubic-bezier(0.34, 1.56, 0.64, 1)';

        // Add staggered animation to detail items
        const details = document.querySelectorAll('.detail-item');
        details.forEach((detail, index) => {
            detail.style.animation = `fadeInUp 0.8s ease-out ${0.85 + index * 0.1}s backwards`;
            detail.style.animationFillMode = 'both';
        });
    }

    setupAnimations() {
        // Anniversary badge enhancement
        this.setupAnniversaryBadge();

        // Photo frame interactive animation
        this.setupPhotoFrame();

        // Detail items hover effects
        this.setupDetailItems();

        // Flower SVG animations
        this.setupFlowerAnimations();
        
        // Add scroll triggered animations
        this.setupScrollAnimations();
    }

    setupAnniversaryBadge() {
        const badge = document.querySelector('.anniversary-badge');
        if (!badge) return;

        badge.addEventListener('mouseenter', () => {
            badge.style.animation = 'spinSlow 10s linear infinite';
        });

        badge.addEventListener('mouseleave', () => {
            badge.style.animation = 'spinSlow 30s linear infinite';
        });
    }

    setupPhotoFrame() {
        const photoFrame = document.querySelector('.photo-frame');
        if (!photoFrame) return;

        photoFrame.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-20px) scale(1.05)';
        });

        photoFrame.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }

    setupDetailItems() {
        const details = document.querySelectorAll('.detail-item');
        
        details.forEach((detail, index) => {
            detail.style.setProperty('--detail-delay', `${0.1 * index}s`);
            
            detail.addEventListener('mouseenter', function() {
                detail.style.animation = 'none';
                detail.offsetHeight;
                detail.style.transform = 'translateX(12px) translateY(-6px)';
            });

            detail.addEventListener('mouseleave', function() {
                detail.style.transform = 'translateX(0) translateY(0)';
            });
        });
    }

    setupFlowerAnimations() {
        const flowers = document.querySelectorAll('.flower-svg');
        
        flowers.forEach((flower, index) => {
            flower.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2) rotate(20deg)';
                this.style.opacity = '0.8';
            });

            flower.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.opacity = '0.5';
            });
        });
    }

    setupScrollAnimations() {
        // Add animation to elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.detail-item, .couple-section, .message-section').forEach(el => {
            observer.observe(el);
        });
    }

    // ===========================
    // INTERACTIVITY
    // ===========================

    setupInteractivity() {
        this.setupCoupleNameInteraction();
        this.setupDetailIconInteraction();
        this.setupRSVPButton();
        this.setupLocationButton();
    }

    setupCoupleNameInteraction() {
        const coupleNames = document.querySelectorAll('.couple-names');
        
        coupleNames.forEach(name => {
            name.addEventListener('mouseenter', function() {
                this.style.color = '#D4AF37';
                this.style.transform = 'translateY(-5px)';
            });

            name.addEventListener('mouseleave', function() {
                this.style.color = '#4A0E0E';
                this.style.transform = 'translateY(0)';
            });
        });
    }

    setupDetailIconInteraction() {
        const iconWrappers = document.querySelectorAll('.icon-wrapper');
        
        iconWrappers.forEach(wrapper => {
            wrapper.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2) rotate(-15deg)';
            });

            wrapper.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }

    setupRSVPButton() {
        const rsvpButton = document.querySelector('.rsvp-button');
        if (!rsvpButton) return;

        rsvpButton.addEventListener('click', () => {
            alert('¡Gracias por confirmar tu asistencia!');
        });
    }

    setupLocationButton() {
        const locationButton = document.querySelector('.location-button');
        if (!locationButton) return;

        locationButton.addEventListener('click', () => {
            window.open('https://www.google.com/maps', '_blank');
        });
    }

    // ===========================
    // SCROLL EFFECTS
    // ===========================

    setupScrollEffects() {
        let scrollTimeout;

        window.addEventListener('scroll', () => {
            const card = document.querySelector('.invitation-card');
            if (!card) return;

            const rect = card.getBoundingClientRect();
            const centerY = window.innerHeight / 2;
            const distanceFromCenter = Math.abs(rect.top + rect.height / 2 - centerY);
            const parallaxFactor = (distanceFromCenter / window.innerHeight) * 0.5;

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                card.style.opacity = Math.max(0.7, 1 - parallaxFactor * 0.3);
            }

            // Subtle scale effect
            const scale = 1 - (Math.abs(rect.top - centerY) / window.innerHeight) * 0.05;
            card.style.transform = `scale(${scale})`;

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 300);
        });
    }
}

// ===========================
// INITIALIZE ON DOM READY
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    new InvitationManager();
});

