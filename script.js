'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const nav = document.querySelector('.nav');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');


///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener
  ('click', openModal));

//for (let i = 0; i < btnsOpenModal.length; i++)
  //btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


////////////////////////////////////////////////
// Button Scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth,

  );

  // Scrolling
  //window.scrollTo(
    //s1coords.left + window.pageXOffset, 
    //s1coords.top + window.pageYOffset
    //);
  /*
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });*/

section1.scrollIntoView({behavior: 'smooth'});

});


//////////////////////////////////////
// Page navigation

/*
document.querySelectorAll('.nav__link').forEach
(function(el) {
  el.addEventListener('click', function(e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({

    })
  });
});
*/
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault()

  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href')

    document.querySelector(id).scrollIntoView({
      behavior: 'smooth'
    })
  }
})

//DOM Traversing
const H1 = document.querySelector('h1')

H1.firstElementChild.style.color = 'white'
H1.lastElementChild.style.color = 'orangered'
//H1.closest('.header').style.background = 'var(--gradient-secondary)';
//H1.closest('h1').style.background = 'var(--gradient-primary)';

console.log(H1.parentElement.children);
[...H1.parentElement.children].forEach(function(el){
  if(el !== H1) el.style.transform = 'scale(0.9)';
})



// Tabbed component


tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab');
  //console.log(clicked);

  // Guard clause
  if (!clicked) return;
  
  // Remove active classe
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active');

});

// Menu fade animation


/*
// Menu fade animation
const handleHover = function(e, opacity) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this;
      
    }); 
    logo.style.opacity = this;
  }

};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));
*/
// Sticky navigation
/*
const initialCoords = section1.getBoundingClientRect();

window.addEventListener('scroll', function() {
  console.log(window.scrollY);

  if(window.scrollY > initialCoords.top) nav.
  classList.add('sticky');
  else nav.classList.remove('sticky');
})
*/
//const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
//console.log(navHeight);

const stickyNav = function(entries) {
  const [entry] = entries;
  //console.log(entry);

  if(!entry.isIntersecting) nav.classList.add
  ('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver
(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section')

const revealSection = function(entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver
(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function(section) {
  sectionObserver.observe(section);
  //section.classList.add('section--hidden');
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);

  if(!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  }
  );
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg,
  {
    root: null,
    threshold: 0,
    rootMargin: '200px',
  });

  imgTargets.forEach(img => imgObserver.observe(img));

  // Slider
  const slider = function() {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots')

  let curSlide = 0;
  const maxSlide = slides.length;
 /*
  const slider = document.querySelector('.slider');
  slider.style.transform = 'scale(0.5) translateX(-800px)';
  slider.style.overflow = 'visible'; */
  /*
  slides.forEach((s, i) => (s.style.transform =
  `translateX(${100 * i}%)`));
    */
  
  // Functions
  const createDots = function () {
    slides.forEach(function(_, i){
      dotContainer.insertAdjacentHTML('beforeend',
      `<button class="dots__dot" data-slide="${i}"></
      button>`);
    });
  };
  createDots();

  const activateDot = function(slide) {
    document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove
    ('dots__dot--active'));
    
    document.querySelector(`.dots__dot[data-slide="${slide}"]
      `)
    .classList.add('dots__dot--active');
  };
  activateDot(0);

  const goToSlide = function(slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100
      * (i - slide)}%)`)
    );
  };
  goToSlide(0);
  //Next slide
  const nextSlide = function() {
    if(curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide)
  };

  const prevSlide = function() {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    }else {
      curSlide--;
    }
    
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function() {
    goToSlide(0);
    //createDots();

    activateDot(0);
  };

  init()

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function(e) {
    console.log(e);
    if(e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
dotContainer.addEventListener('click', function(e) {
  if(e.target.classList.contains('dots__dot')) {
    const {slide} = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
};
slider();
/*
const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways: sibling
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.7)';
});
*/
//////////////////////////////////////////////////
/*
const message = document.createElement('div'); //Create a dom element 
message.classList.add('cookie-message');
message.textContent = 'We use cookied for improved functionality and analytics.'
message.innerHTML = 'We use cookied for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!</button>';
*/


//header.prepend(message);
//header.append(message);
//header.before(message);

//Delete elements
document.querySelector('.btn--close-cookie').addEventListener('click', function(){
  message.remove();
  //message.parentElement.removeChild(message);
})

const h1 = document.querySelector('h1');
const alertH1 = function(e){
  alert('Great! You are reading the header');
}
h1.addEventListener('mouseenter', alertH1);

const randomInt = (min,max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${(randomInt(0, 255))})`
/*
// Styles
message.style.backgroundColor='#37383d';
message.style.width = '120%';

message.style.height =
  Number.parseFloat(getComputedStyle(message).height,
  10) + 20 + 'px';

document.documentElement.style.setProperty
('--color-primary', 'orangered');

//Attributes
const logo = document.querySelector('.nav__logo');

*/
