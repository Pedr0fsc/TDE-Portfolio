class MenuFilter {
    constructor() {
        this.menuItems = document.querySelectorAll('.menu-item');
        this.cards = document.querySelectorAll('.card');
        this.currentCategory = 'todos';

        this.init();
    }

    init() {
        this.menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const category = e.target.getAttribute('data-category');
                this.filterByCategory(category);
                this.updateActiveMenu(e.target);
            });
        });
    }

    filterByCategory(category) {
        this.currentCategory = category;

        this.cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            if (category === 'todos' || cardCategory === category) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    updateActiveMenu(activeItem) {
        this.menuItems.forEach(item => {
            item.classList.remove('active');
        });

        activeItem.classList.add('active');
    }

    addCard(category, title, content) {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-category', category);

        card.innerHTML = `
                    <div class="card-category">${this.getCategoryDisplayName(category)}</div>
                    <div class="card-title">${title}</div>
                    <div class="card-content">${content}</div>
                `;

        document.getElementById('contentContainer').appendChild(card);

        this.cards = document.querySelectorAll('.card');

        this.filterByCategory(this.currentCategory);
    }

    getCategoryDisplayName(category) {
        const categoryNames = {
            'raciocinio-algoritmico': 'Raciocínio Algorítmico',
            'sistemas-ciberfisicos': 'Sistemas Ciberfísicos',
            'experiencia-criativa': 'Experiência Criativa',
            'filosofia': 'Filosofia'
        };

        return categoryNames[category] || category;
    }

    clearCards() {
        const container = document.getElementById('contentContainer');
        container.innerHTML = '';
        this.cards = document.querySelectorAll('.card');
    }

    getCurrentCategory() {
        return this.currentCategory;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    window.menuFilter = new MenuFilter();
});

// Smooth transition

function smoothScroll(target, duration) {
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = easing(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easing(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

var home = document.querySelector('#inicio');
var about = document.querySelector('#sobre');
var services = document.querySelector('#projetos');
var contact = document.querySelector('#contato');

var inicioLink = document.querySelector('nav a[href="#inicio"]');
var sobreLink = document.querySelector('nav a[href="#sobre"]');
var projetosLink = document.querySelector('nav a[href="#projetos"]');
var contatoLink = document.querySelector('nav a[href="#contato"]');

inicioLink.addEventListener('click', function () {
    smoothScroll('#inicio', 1000);
});

sobreLink.addEventListener('click', function () {
    smoothScroll('#sobre', 1000);
});

projetosLink.addEventListener('click', function () {
    smoothScroll('#projetos', 1000);
});

contatoLink.addEventListener('click', function () {
    smoothScroll('#contato', 1000);
});