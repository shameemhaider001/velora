// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// CTA button ripple effect
document.querySelectorAll('.cta-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Page load animation
window.addEventListener('load', () => {
    // mark hero loaded for entrance animations
    document.body.style.opacity = '1';
    document.querySelectorAll('.product-card').forEach((c,i)=>{
        setTimeout(()=>{ c.classList.add('visible') }, 120 + i*120)
    })
    const hero = document.querySelector('.hero')
    if(hero) setTimeout(()=> hero.classList.add('loaded'), 120)
});

// Initial body opacity
document.body.style.opacity = '0.95';

// Collections filtering
function normalizeCategories(str){
    if(!str) return [];
    return String(str).split(/[,\s]+/).map(s=>s.trim().toLowerCase()).filter(Boolean);
}

function applyFilter(filter){
    const [gender, category] = (filter||'').split(':');
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card=>{
        const cats = normalizeCategories(card.dataset.categories);
        let show = false;
        if(category === 'all'){
            // show all that match gender
            show = cats.includes(gender);
        } else if(category){
            show = cats.includes(gender) && cats.includes(category);
        }
        // if no gender specified (fallback), match by category only
        if(!gender){ show = category ? cats.includes(category) : true }

        if(show){
            card.style.display = '';
            setTimeout(()=> card.classList.add('visible'), 20);
        } else {
            card.style.display = 'none';
            card.classList.remove('visible');
        }
    })
}

// attach listeners to collection links
document.querySelectorAll('.collections a[data-filter]').forEach(link=>{
    link.addEventListener('click', function(e){
        e.preventDefault();
        const filter = this.dataset.filter;
        // scroll to products
        const target = document.querySelector('#products');
        if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
        applyFilter(filter);
    })
});

// expose for debugging
window.applyFilter = applyFilter;

// clear filter button
const clearBtn = document.querySelector('#clear-filter');
if(clearBtn){
    clearBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        // show all products
        applyFilter('');
        const target = document.querySelector('#products');
        if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    })
}
