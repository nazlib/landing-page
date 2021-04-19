/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/


const sections = document.querySelectorAll('section');
const navbarList = document.getElementById('navbar__list');
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function createNavItemAnchorElement(id, name) {
    let anchor = document.createElement('a');
    anchor.classList.add("menu__link");
    anchor.innerHTML = name;
    anchor.setAttribute('section-id', id)
    return anchor;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

function buildNav() {
    for (section of sections) {
        let sectionName = section.getAttribute('data-nav');
        let sectionId = section.getAttribute('id');
        let navItem = document.createElement('li');
        navItem.append(createNavItemAnchorElement(sectionId, sectionName));
        navbarList.appendChild(navItem);
    }

}


// Add class 'active' to section when near top of viewport
function setActive() {
    const t0 = performance.now();
    for (section of sections) {
        if (isElementInViewport(section)) {
            if (!section.classList.contains('your-active-class'))
                section.classList.add('your-active-class');
        }
        else {
            section.classList.remove('your-active-class');
        }
    }
    const t1 = performance.now();
    console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
}
// Scroll to anchor ID using scrollTO event
function scrollEvent(sectionId) {
    let section = document.getElementById(sectionId);
    section.scrollIntoView({ behaviour: 'smooth', block: "end", inline: "nearest" });
}
/**
 * End Main Functions
 * Begin Events
 * 
*/
function isElementInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }
 
    return (
        top >= window.pageYOffset &&
        left >= window.pageXOffset &&
        (top + height) <= (window.pageYOffset + window.innerHeight) &&
        (left + width) <= (window.pageXOffset + window.innerWidth)
    );
}


// Build menu
buildNav();

navbarList.addEventListener('click', function (event) {
    if (event.target.nodeName == "A") {
        scrollEvent(event.target.getAttribute('section-id'));
    }
});


// Set sections as active
document.addEventListener('scroll', function (event) {
    setActive();
});
