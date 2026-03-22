document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mainNav = document.querySelector('.main-nav');

    if (hamburgerMenu && mainNav) {
        hamburgerMenu.setAttribute('aria-expanded', 'false');
        hamburgerMenu.setAttribute('aria-controls', 'primary-navigation');
        mainNav.id = 'primary-navigation';

        hamburgerMenu.addEventListener('click', function () {
            const isOpen = mainNav.classList.toggle('mobile-active');
            hamburgerMenu.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }

    // Close menu when a link is clicked (mobile)
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav && mainNav.classList.contains('mobile-active')) {
                mainNav.classList.remove('mobile-active');
                if (hamburgerMenu) hamburgerMenu.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Active link highlight on scroll
    const sections = document.querySelectorAll('section[id]');
    const linksMap = new Map();
    document.querySelectorAll('.main-nav a[href^="#"]').forEach(a => {
        linksMap.set(a.getAttribute('href'), a);
    });
    const onScroll = () => {
        let current = null;
        const scrollPos = window.scrollY + 120;
        sections.forEach(sec => {
            const top = sec.offsetTop;
            const bottom = top + sec.offsetHeight;
            if (scrollPos >= top && scrollPos < bottom) current = `#${sec.id}`;
        });
        linksMap.forEach((el, href) => {
            if (!el) return;
            if (href === current) el.classList.add('active'); else el.classList.remove('active');
        });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Back to top button
    let backToTop = document.querySelector('.back-to-top');
    if (!backToTop) {
        backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.setAttribute('aria-label', 'Back to top');
        backToTop.innerHTML = '↑';
        document.body.appendChild(backToTop);
    }
    const toggleBackToTop = () => {
        if (window.scrollY > 600) backToTop.classList.add('show'); else backToTop.classList.remove('show');
    };
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // FAQ Accordion logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const toggleIcon = item.querySelector('.faq-toggle');
        const answer = item.querySelector('.faq-answer');

        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all other FAQs
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherBtn = otherItem.querySelector('.faq-question');
                    const otherToggle = otherItem.querySelector('.faq-toggle');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                    if (otherToggle) otherToggle.textContent = '+';
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                });

                // Toggle current FAQ
                if (!isActive) {
                    item.classList.add('active');
                    questionBtn.setAttribute('aria-expanded', 'true');
                    toggleIcon.textContent = '−';
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    item.classList.remove('active');
                    questionBtn.setAttribute('aria-expanded', 'false');
                    toggleIcon.textContent = '+';
                    answer.style.maxHeight = null;
                }
            });
        }
    });
});