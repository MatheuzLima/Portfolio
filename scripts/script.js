
class NavigationManager {
    constructor() {
        this.navLinks = document.querySelectorAll('.sidebar__nav-link');
        this.sections = document.querySelectorAll('main section[id]');
        this.activeClass = 'sidebar__nav-item--active';
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.navLinks.forEach((link) => {
            link.addEventListener('click', (event) => this.handleNavClick(event));
        });
        window.addEventListener('scroll', () => this.updateActiveLink());
    }

    handleNavClick(event) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);

        if (!target) return;

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.setActiveLink(event.currentTarget);
    }

    setActiveLink(link) {
        this.navLinks.forEach((item) => {
            item.parentElement.classList.remove(this.activeClass);
        });
        link.parentElement.classList.add(this.activeClass);
    }

    updateActiveLink() {
        const scrollY = window.pageYOffset;

        for (const section of this.sections) {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                const id = section.getAttribute('id');
                const activeLink = document.querySelector(`.sidebar__nav-link[href="#${id}"]`);
                if (activeLink) {
                    this.setActiveLink(activeLink);
                }
                break;
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
});