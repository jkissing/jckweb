// ============================
// Mobile Menu Toggle
// ============================
document.addEventListener('DOMContentLoaded', function() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // ============================
    // Smooth Scrolling
    // ============================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Only apply smooth scrolling to internal links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const headerOffset = 80;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================
    // Active Navigation Highlighting
    // ============================
    function setActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Run on scroll
    window.addEventListener('scroll', setActiveNav);

    // ============================
    // Scroll Animations
    // ============================
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

    // Observe cards and sections
    const animatedElements = document.querySelectorAll('.card, .news-card, .news-post, .member-card, .research-card, .research-stream-card, .publication-item, .db-card');
    animatedElements.forEach((element, index) => {
        const isMemberCard = element.classList.contains('member-card');
        const stagger = isMemberCard ? Math.min(index, 8) * 0.07 : 0;
        element.style.opacity = '0';
        element.style.transform = 'translateY(24px)';
        element.style.transition = `opacity 0.6s ease ${stagger}s, transform 0.6s ease ${stagger}s`;
        observer.observe(element);
    });

    // ============================
    // Reveal Headings on Scroll
    // ============================
    const revealTargets = document.querySelectorAll('.section-title, .members-section-title, .page-title, .year-heading, .showcase-title, .showcase-subtitle');
    revealTargets.forEach(target => {
        target.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    revealTargets.forEach(target => revealObserver.observe(target));

    // ============================
    // Header Scroll Effect
    // ============================
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }

        lastScroll = currentScroll;
    });

    // ============================
    // External Links
    // ============================
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // ============================
    // Parallax Effect for Hero Section
    // ============================
    const hero = document.querySelector('.hero');
    if (hero && !prefersReducedMotion) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = hero.querySelector('.hero-content');
            if (parallax && scrolled < window.innerHeight) {
                parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
                parallax.style.opacity = 1 - (scrolled / 600);
            }
        });
    }

    // ============================
    // Advanced Card Hover Effects
    // ============================
    const cards = document.querySelectorAll('.card, .member-card, .news-card, .research-card');
    cards.forEach(card => {
        if (prefersReducedMotion) {
            return;
        }
        card.addEventListener('mouseenter', function(e) {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ============================
    // Lazy Loading for Images
    // ============================
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';

                const loadImg = new Image();
                loadImg.onload = () => {
                    img.style.opacity = '1';
                };
                loadImg.src = img.src;

                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ============================
    // Progress Indicator on Scroll
    // ============================
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #8B1E3F, #3C6E71);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // ============================
    // Typing Effect for Hero Title (Homepage only)
    // ============================
    const heroTitle = document.querySelector('.hero-title');
    if (!prefersReducedMotion && heroTitle && (window.location.pathname.endsWith('index.html') || window.location.pathname === '/')) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';

        let charIndex = 0;
        function typeWriter() {
            if (charIndex < originalText.length) {
                heroTitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50);
            }
        }

        setTimeout(typeWriter, 500);
    }

    // ============================
    // Table of Contents Generator (for long pages)
    // ============================
    const contentBlock = document.querySelector('.content-block');
    if (contentBlock) {
        const headings = contentBlock.querySelectorAll('h2, h3');
        if (headings.length > 3) {
            const toc = document.createElement('div');
            toc.className = 'table-of-contents';
            toc.innerHTML = '<h3>On This Page</h3><ul class="toc-list"></ul>';

            const tocList = toc.querySelector('.toc-list');
            headings.forEach((heading, index) => {
                const id = `section-${index}`;
                heading.id = id;

                const li = document.createElement('li');
                li.className = heading.tagName.toLowerCase() === 'h3' ? 'toc-subsection' : '';
                const a = document.createElement('a');
                a.href = `#${id}`;
                a.textContent = heading.textContent;
                a.className = 'toc-link';
                li.appendChild(a);
                tocList.appendChild(li);
            });

            contentBlock.insertBefore(toc, contentBlock.firstChild);
        }
    }

    // ============================
    // Back to Top Button
    // ============================
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #8B1E3F;
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    backToTop.addEventListener('mouseenter', function() {
        this.style.background = '#6B1530';
        this.style.transform = 'scale(1.1)';
    });

    backToTop.addEventListener('mouseleave', function() {
        this.style.background = '#8B1E3F';
        this.style.transform = 'scale(1)';
    });

    // ============================
    // Search Highlight Feature
    // ============================
    function highlightSearchTerms() {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('search');

        if (searchTerm) {
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            const walker = document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );

            const nodesToReplace = [];
            while (walker.nextNode()) {
                if (walker.currentNode.parentNode.nodeName !== 'SCRIPT' &&
                    walker.currentNode.parentNode.nodeName !== 'STYLE') {
                    nodesToReplace.push(walker.currentNode);
                }
            }

            nodesToReplace.forEach(node => {
                const text = node.textContent;
                if (regex.test(text)) {
                    const span = document.createElement('span');
                    span.innerHTML = text.replace(regex, '<mark style="background: #D4A373; padding: 2px 4px; border-radius: 2px;">$1</mark>');
                    node.parentNode.replaceChild(span, node);
                }
            });
        }
    }

    highlightSearchTerms();

    // ============================
    // Tooltip Enhancement
    // ============================
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: #2c3e50;
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 14px;
                z-index: 10000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';

            setTimeout(() => tooltip.style.opacity = '1', 10);

            this._tooltip = tooltip;
        });

        element.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                this._tooltip = null;
            }
        });
    });

    // ============================
    // Alumni Renderer (Members page)
    // ============================
    const alumniContainer = document.getElementById('alumni-container');
    if (alumniContainer) {
        const getInitials = (name) => {
            const parts = name.replace(/\"/g, '').split(' ').filter(Boolean);
            return parts.slice(0, 2).map(part => part[0]).join('');
        };

        const renderAlumni = (data) => {
            const groupsHtml = data.groups.map((group, index) => {
                const membersHtml = group.members.map(member => {
                    const avatar = member.image
                        ? `<div class=\"alumni-avatar\"><img src=\"${encodeURI(member.image)}\" alt=\"${member.name}\" loading=\"lazy\"></div>`
                        : `<div class=\"alumni-avatar\">${getInitials(member.name)}</div>`;
                    const nameHtml = member.link
                        ? `<a href=\"${member.link}\" target=\"_blank\" rel=\"noopener noreferrer\">${member.name}</a>`
                        : member.name;
                    const roleHtml = member.role ? `<div class=\"alumni-role\">${member.role}</div>` : '';

                    return `<div class=\"alumni-card\">${avatar}<div><div class=\"alumni-name\">${nameHtml}</div>${roleHtml}</div></div>`;
                }).join('');

                const openAttr = index === 0 ? ' open' : '';
                return `<details class=\"alumni-group\"${openAttr}><summary><span>${group.title}</span></summary><div class=\"alumni-grid\">${membersHtml}</div></details>`;
            }).join('');

            alumniContainer.innerHTML = groupsHtml;
        };

        const inlineData = document.getElementById('alumni-data');
        if (inlineData && inlineData.textContent.trim()) {
            try {
                renderAlumni(JSON.parse(inlineData.textContent));
            } catch (e) {}
        }

        fetch('data/alumni.json')
            .then(response => response.json())
            .then(data => renderAlumni(data))
            .catch(() => {
                if (!alumniContainer.innerHTML.trim()) {
                    alumniContainer.innerHTML = '<p>Alumni list unavailable at the moment.</p>';
                }
            });
    }

    // ============================
    // Navbar Notification Counts
    // ============================
    const attachCountBadge = (href, count) => {
        if (!count || count < 1) {
            return;
        }
        const link = document.querySelector(`.nav-menu a[href="${href}"]`);
        if (!link || link.querySelector('.nav-count')) {
            return;
        }
        const badge = document.createElement('span');
        badge.className = 'nav-count';
        badge.textContent = count > 99 ? '99+' : count;
        link.appendChild(badge);
    };

    fetch('data/news.json')
        .then(response => response.json())
        .then(data => attachCountBadge('news.html', data.news.length))
        .catch(() => {});

    fetch('data/publications.json')
        .then(response => response.json())
        .then(data => attachCountBadge('publications.html', data.publications.length))
        .catch(() => {});
});
