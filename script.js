gsap.registerPlugin(ScrollTrigger);

    // ── Custom Cursor ──
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        cursor.style.left = mx - 5 + 'px';
        cursor.style.top  = my - 5 + 'px';
    });

    function animRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) *.12;
        ring.style.left = rx - 18 + 'px';
        ring.style.top  = ry - 18 + 'px';
        requestAnimationFrame(animRing);
    }
    animRing();

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(2)'; ring.style.width = ring.style.height = '60px'; });
        el.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)'; ring.style.width = ring.style.height = '36px'; });
    });

    // ── Mobile Menu ──
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        navLinks.classList.toggle('active');
    });
    document.querySelectorAll('#navLinks a').forEach(a => a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        navLinks.classList.remove('active');
    }));

    // ── Hero Entrance ──
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
        .fromTo('.hero-badge',        { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.3 })
        .fromTo('.hero-title .line',  { y: '100%', opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 }, '-=0.3')
        .fromTo('.hero-description',  { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
        .fromTo('.hero-actions',      { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
        .fromTo('.profile-card',      { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.5)' }, '-=0.9');

    // ── Scroll Reveals ──
    gsap.utils.toArray('.reveal').forEach(el => {
        if (el.closest('.hero')) return; // hero handled above
        gsap.fromTo(el,
            { y: 40, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // ── Skill card stagger ──
    gsap.utils.toArray('.skill-card').forEach((card, i) => {
        gsap.fromTo(card,
            { y: 40, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.7, delay: i * 0.07, ease: 'power2.out',
                scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' }
            }
        );
    });

    // ── Nav scroll effect ──
    window.addEventListener('scroll', () => {
        document.getElementById('nav').style.background =
            window.scrollY > 60 ? 'rgba(244,244,248,0.97)' : 'rgba(244,244,248,0.85)';
    });

    // ── Smooth scroll ──
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
