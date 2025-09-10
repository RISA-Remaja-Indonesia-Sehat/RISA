// GSAP akan dimuat dari CDN di HTML
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animations
function initHeroAnimations() {
  const tl = gsap.timeline();
  
  // Hero title - fade in from top
  tl.fromTo('.hero-title', 
    { opacity: 0, y: -50 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
  )
  // Hero text - fade in from top with delay
  .fromTo('.hero-text',
    { opacity: 0, y: -30 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
    '-=0.4'
  )
  // Hero button - fade in from top with delay
  .fromTo('.hero-button',
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
    '-=0.3'
  )
  // Hero image - fade in from bottom
  .fromTo('.hero-image',
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
    '-=0.6'
  );
}

// Staff Section Animations
function initStaffAnimations() {
  // Staff title animation
  gsap.fromTo('.staff-title',
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#staff-section',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Staff cards stagger animation
  gsap.fromTo('.staff-card',
    { opacity: 0, y: 50, scale: 0.9 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.staff-grid',
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );
}

// Features hover animations
function initFeatureAnimations() {
  const featureCards = document.querySelectorAll('.grid > div');
  
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -5,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

// Initialize all animations
export function initAnimations() {
  initHeroAnimations();
  initStaffAnimations();
  initFeatureAnimations();
}