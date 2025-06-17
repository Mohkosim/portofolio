// Navbar Toggler for Mobile
        const navbarToggleBtn = document.getElementById('navbarToggleBtn');
        const navbarNav = document.querySelector('.navbar-nav');

        navbarToggleBtn.addEventListener('click', () => {
            navbarNav.classList.toggle('show');
        });

        // Education tabs logic
        const eduTabs = document.querySelectorAll('#educationTabs a');
        const eduPanels = document.querySelectorAll('.education-content > div');

        eduTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Deactivate all tabs
                eduTabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                    t.setAttribute('tabindex', '-1');
                });
                // Hide all panel content
                eduPanels.forEach(panel => panel.hidden = true);

                // Activate clicked tab & panel
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
                tab.setAttribute('tabindex', '0');
                const tabId = tab.getAttribute('data-tab');
                document.getElementById(tabId + 'Panel').hidden = false;
                document.getElementById(tabId + 'Panel').focus();
            });
        });

        // Portfolio filtering
        const portfolioButtons = document.querySelectorAll('#portfolio .portfolio-nav button');
        const galleryItems = document.querySelectorAll('#portfolio .gallery-item');

        portfolioButtons.forEach(button => {
            button.addEventListener('click', () => {
                portfolioButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-pressed', 'false');
                });
                button.classList.add('active');
                button.setAttribute('aria-pressed', 'true');

                const category = button.getAttribute('data-category');
                galleryItems.forEach(item => {
                    if (item.dataset.category === category) {
                        item.style.display = '';
                        item.setAttribute('tabindex', '0');
                    } else {
                        item.style.display = 'none';
                        item.setAttribute('tabindex', '-1');
                    }
                });
            });
        });

        // Animate skill bars when skills section is scrolled into view
        const skillBars = document.querySelectorAll('#skills .skill-bar');
        const skillsSection = document.getElementById('skills');

        function animateSkillBars() {
            skillBars.forEach(bar => {
                const percent = getComputedStyle(bar.parentElement).getPropertyValue('--skill-percent');
                bar.style.width = '0';
                setTimeout(() => (bar.style.width = percent), 100);
            });
        }

        let skillsAnimated = false;
        window.addEventListener('scroll', () => {
            const rect = skillsSection.getBoundingClientRect();
            if (!skillsAnimated && rect.top < window.innerHeight) {
                animateSkillBars();
                skillsAnimated = true;
            }
        });

        // Scroll to top button
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.style.display = 'flex';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Contact form submit - basic validation and alert (simulate send)
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', e => {
            e.preventDefault();

            // Simple validation
            if (
                !contactForm.firstName.value.trim() ||
                !contactForm.lastName.value.trim() ||
                !contactForm.email.value.trim() ||
                !contactForm.message.value.trim()
            ) {
                alert('Please fill in all required fields.');
                return;
            }

            alert('Thank you for contacting! Your message has been received.');
            contactForm.reset();
        });