// Initialize all cards
document.addEventListener('DOMContentLoaded', function() {
    // support both legacy `.gcard` and new `.card` markup
    const cards = document.querySelectorAll('.gcard, .card');
    
    // Add click event to each card
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            // close other cards
            cards.forEach(c => { if (c !== this) c.classList.remove('open'); });
            const wasOpen = this.classList.contains('open');
            this.classList.toggle('open');
            // if we just opened it, ensure it's in view so text animations are visible
            if (!wasOpen && this.classList.contains('open')) {
                // add fallback class to force text visible when animations are blocked
                this.classList.add('show-text');
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 180);
                // remove the fallback after animations should have finished
                setTimeout(() => { this.classList.remove('show-text'); }, 2200);
            } else if (!this.classList.contains('open')) {
                // ensure fallback class removed when closing
                this.classList.remove('show-text');
            }
        });
        
        // Double click untuk reset
        card.addEventListener('dblclick', function(e) {
            e.stopPropagation();
            this.classList.remove('open');
        });
    });
});

// Intersection Observer untuk animasi saat scroll
// Intersection Observer untuk animasi saat scroll
try {
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.card-section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            observer.observe(section);
        });
    } else {
        // no IntersectionObserver — make sections visible
        document.querySelectorAll('.card-section').forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
    }
} catch (err) {
    // if anything goes wrong, ensure content is visible
    console.error('Scroll observer error:', err);
    document.querySelectorAll('.card-section').forEach(section => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    });
}
