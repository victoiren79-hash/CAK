// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Image gallery slider with dots
    const galleryTrack = document.getElementById('gallery-track');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    const seeAllPhotosButton = document.getElementById('see-all-photos');
    const galleryDotsContainer = document.getElementById('gallery-dots');
    const slides = document.querySelectorAll('.gallery-slide');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Create dots for gallery
    function createDots() {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'gallery-dot';
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('data-slide', i);
            dot.addEventListener('click', () => goToSlide(i));
            galleryDotsContainer.appendChild(dot);
        }
    }
    
    function updateGalleryPosition() {
        galleryTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active dot
        document.querySelectorAll('.gallery-dot').forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateGalleryPosition();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide < totalSlides - 1) ? currentSlide + 1 : 0;
        updateGalleryPosition();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide > 0) ? currentSlide - 1 : totalSlides - 1;
        updateGalleryPosition();
    }
    
    // Initialize gallery with dots
    createDots();
    updateGalleryPosition();
    
    // Event listeners for gallery navigation
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
    
    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-advance on hover
    galleryTrack.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    galleryTrack.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // "See all photos" button
    seeAllPhotosButton.addEventListener('click', () => {
        alert('This would open a full-screen photo gallery in a real implementation.');
    });
    
    // Expand/collapse reviews functionality
    const seeMoreReviewsButton = document.getElementById('see-more-reviews');
    let reviewsExpanded = false;
    const allReviews = [
        {
            name: "Sarah K.",
            rating: 5,
            text: "The Akabenzi and Potatoes is absolutely fantastic! The pork is so tender and flavorful. I come here every week!",
            date: "3 days ago"
        },
        {
            name: "Thomas R.",
            rating: 4,
            text: "Great place for a family dinner. The Fried Plantains with Pork Dumplings were a hit with everyone. Service was excellent.",
            date: "1 week ago"
        },
        {
            name: "Grace M.",
            rating: 5,
            text: "Best Akabenz with Matoke in Kigali! The portions are generous and the flavors are authentic. Highly recommended!",
            date: "2 weeks ago"
        }
    ];
    
    seeMoreReviewsButton.addEventListener('click', () => {
        if (!reviewsExpanded) {
            // In a real implementation, this would load more reviews from a server
            const reviewHighlights = document.querySelector('.review-highlights');
            
            allReviews.forEach(review => {
                const reviewCard = document.createElement('div');
                reviewCard.className = 'review-card';
                
                const starsHTML = Array(5).fill().map((_, i) => {
                    if (i < review.rating) {
                        return '<span class="star filled"><i class="fas fa-star"></i></span>';
                    } else {
                        return '<span class="star"><i class="far fa-star"></i></span>';
                    }
                }).join('');
                
                reviewCard.innerHTML = `
                    <div class="reviewer-info">
                        <div class="reviewer-avatar">${review.name.charAt(0)}</div>
                        <div>
                            <h5 class="reviewer-name">${review.name}</h5>
                            <div class="stars small">
                                ${starsHTML}
                            </div>
                        </div>
                    </div>
                    <p class="review-text">${review.text}</p>
                    <span class="review-date">${review.date}</span>
                `;
                
                reviewHighlights.appendChild(reviewCard);
            });
            
            seeMoreReviewsButton.innerHTML = '<i class="fas fa-chevron-up"></i> Show fewer reviews';
            reviewsExpanded = true;
        } else {
            // In a real implementation, this would hide the additional reviews
            const reviewCards = document.querySelectorAll('.review-card');
            for (let i = 3; i < reviewCards.length; i++) {
                reviewCards[i].remove();
            }
            
            seeMoreReviewsButton.innerHTML = '<i class="fas fa-comment-alt"></i> See more reviews';
            reviewsExpanded = false;
        }
    });
    
    // Contact modal functionality
    const contactButton = document.querySelector('.btn-contact');
    const contactModal = document.getElementById('contact-modal');
    const closeModalButton = document.getElementById('close-modal');
    const contactLink = document.querySelector('.contact-link');
    const contactForm = document.querySelector('.contact-form');
    const viewMenuButton = document.querySelector('.btn-hero:first-child');
    
    function openContactModal() {
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeContactModal() {
        contactModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    contactButton.addEventListener('click', openContactModal);
    contactLink.addEventListener('click', (e) => {
        e.preventDefault();
        openContactModal();
    });
    
    closeModalButton.addEventListener('click', closeContactModal);
    
    // Close modal when clicking outside the modal content
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            closeContactModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModal.classList.contains('active')) {
            closeContactModal();
        }
    });
    
    // Handle contact form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // In a real application, this would send the data to a server
        alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
        contactForm.reset();
        closeContactModal();
    });
    
    // View full menu button
    const viewFullMenuButton = document.querySelector('.view-full-menu');
    viewFullMenuButton.addEventListener('click', () => {
        alert('This would open a PDF menu or a dedicated menu page in a real implementation.');
    });
    
    // View menu button in hero section
    viewMenuButton.addEventListener('click', () => {
        // Scroll to menu section and activate menu tab
        document.querySelector('.tabs-section').scrollIntoView({ behavior: 'smooth' });
        
        // Activate menu tab
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        document.querySelector('[data-tab="menu"]').classList.add('active');
        document.getElementById('menu-tab').classList.add('active');
    });
    
    // Get directions button
    const getDirectionsButton = document.querySelector('.btn-hero.secondary');
    getDirectionsButton.addEventListener('click', () => {
        alert('This would open Google Maps with directions to the restaurant.');
    });
});