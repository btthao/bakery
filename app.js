// hide navbar on scroll
const navbar = document.querySelector('.navbar');

const navbarHeight = navbar.getBoundingClientRect().height;

let scrolled = window.pageYOffset;


window.onscroll = function() {
    const currentScrolled = window.pageYOffset;

    if (currentScrolled >= scrolled && currentScrolled > navbarHeight) {
        navbar.style.top = `${-navbarHeight}px`;
    } else {
        navbar.style.top = 0;
    };

    scrolled = currentScrolled;

}

//sidebar

const navLinks = document.querySelector('.nav-links');
const navToggle = document.querySelector('.nav-toggle');
const xBtn = document.querySelector('.x-btn');

navToggle.addEventListener('click', function() {
    navLinks.style.right = 0;
});

xBtn.addEventListener('click', function() {
    navLinks.style.right = '-30rem';
});

// aboutus questions



let showinfo = document.querySelectorAll('.question');

showinfo.forEach(function(showtext) {
    const topic = showtext.querySelector('.topic');
    const info = showtext.querySelector('.info');


    topic.addEventListener('click', function() {


        showinfo.forEach(function(othertext) {
            if (showtext !== othertext) {
                othertext.classList.remove('show');
                const otherinfo = othertext.querySelector('.info');
                otherinfo.style.height = 0;
            };

        });

        showtext.classList.toggle('show');


        const containerHeight = info.getBoundingClientRect().height;
        const infoHeight = showtext.querySelector('.info-content').scrollHeight;

        if (!containerHeight) {
            info.style.height = `${infoHeight}px`;
        } else {
            info.style.height = 0;
        }

    });
});




//menu

const menuList = [{
        id: 1,
        img: './images/breakfast.jpg',
        title: 'breakfast',
        item1: 'croissant',
        item2: 'escargot raisin',
        item3: 'pain chocolat',
        item4: 'croissant amandes',
        item5: 'chocolate muffin',
        item6: 'lemon tart',
    },
    {
        id: 2,
        img: './images/cake.jpg',
        title: 'cakes',
        item1: 'chocolate',
        item2: 'red velvet',
        item3: 'strawberry cake',
        item4: 'coffee cake',
        item5: 'carrot cake',
        item6: 'green tea cake',
    },
    {
        id: 3,
        img: './images/bread.jpg',
        title: 'bread',
        item1: 'bagel',
        item2: 'banana bread',
        item3: 'brioche',
        item4: 'rye bread',
        item5: 'sourdough',
        item6: 'panettone',
    }
]

const menu = document.querySelector('#menu');



function showMenu(menuItems) {
    let displayMenu = menuItems.map(function(item) {
        return `<div class = "menu-column" style = 'background: linear-gradient(var(--black-transparent), var(--black-transparent2)), url(${item.img}); background-size: cover; background-position: bottom;' >
                            <h1> ${item.title } </h1>  
                            <ul class = "items">
                            <li > ${item.item1} </li>  
                            <li > ${item.item3} </li>  
                            <li > ${item.item2} </li>  
                            <li > ${item.item4} </li>  
                            <li > ${item.item5} </li>  
                            <li > ${item.item6} </li>  
                            </ul> 
                            <i class = "fas fa-search" ></i> 
                            </div>`
    });
    displayMenu = displayMenu.join('');
    menu.innerHTML = displayMenu;
};

showMenu(menuList);

//christmas message

const open = document.querySelector('.open-mess');
const modalBtn = document.querySelector('.modal-btn');
const modal = document.querySelector('.modal');


const messList = ['May this Christmas season bring you closer to all those that you treasure in your heart.', 'I hope Santa is good to you this year because you only deserve the best.', 'Wishing you and your family health, happiness, peace and prosperity this Christmas.', 'Christmas is a very spiritual time - In your case vodka, gin and whisky.', 'I hope your Christmas is as wonderful as you are.', 'I think you are fab-yule-lous!'];

const message = document.querySelector('.xmas-message');


function generateMessage(list) {
    let x = Math.floor((Math.random() * list.length));
    message.innerHTML = list[x];
};

open.addEventListener('click', function() {
    modal.style.display = 'block';
    generateMessage(messList);
});

modalBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});



//slideshow

const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.reviews-col');

let i = 1;

slider.style.transform = `translateX(-${i * (100 / slides.length)}%)`;
slider.style.transition = 'none';


next.addEventListener('click', function() {
    if (i >= slides.length - 1) return;
    i++;
    slider.style.transition = '0.4s';
    slider.style.transform = `translateX(-${i * (100 / slides.length)}%)`;

});

prev.addEventListener('click', function() {
    if (i <= 0) return;
    i--;
    slider.style.transition = '0.4s';
    slider.style.transform = `translateX(-${i * (100 / slides.length)}%)`;
});

slider.addEventListener('transitionend', function() {
    if (i == 0) {
        slider.style.transition = 'none';
        i = slides.length - 2;
        slider.style.transform = `translateX(-${i * (100 / slides.length)}%)`;
    };
    if (i == slides.length - 1) {
        slider.style.transition = 'none';
        i = 1;
        slider.style.transform = `translateX(-${i * (100 / slides.length)}%)`;
    };
})


//smooth scroll 



function smoothScroll(destination, duration) {
    var destination = document.querySelector(destination);
    let targetPosition = destination.offsetTop - navbarHeight;
    let currentPos = window.pageYOffset;
    let distance = targetPosition - currentPos;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) {
            startTime = currentTime;
        };
        let timeElapsed = currentTime - startTime;
        let scroll = ease(timeElapsed, currentPos, distance, duration);
        window.scrollTo(0, scroll);
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        };
    };

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        t--;
        return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
    };

    requestAnimationFrame(animation);
};

const allLinks = document.querySelectorAll('.scroll-link');

allLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const id = e.currentTarget.getAttribute('href');
        smoothScroll(id, 1000);
    })
})