//anim navbar

const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if(window.scrollY > 30) {
        nav.classList.add('anim-nav');
    } else {
        nav.classList.remove('anim-nav');
    }
})


// menu
let burgerButton = document.querySelector('.burger');
let menu = document.querySelector('.menu');
let links = document.querySelectorAll('nav a')


burgerButton.addEventListener('click', () => {
    menu.classList.toggle('open')
    burgerButton.classList.toggle('burger-cross')
})

links.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('open')
        burgerButton.classList.remove('burger-cross')
    })
})


//anim element scroll appear
function scrollAppear(){
    const scrolledText = document.querySelectorAll('.scrolled');
    const screenPosition = window.innerHeight / 1.3;

    scrolledText.forEach(text => {
        let textPosition = text.getBoundingClientRect().top; 
        if(textPosition < screenPosition){
            text.classList.add('scroll-appear');
        } else {
            text.classList.remove('scroll-appear');
        }
    })   
}

window.addEventListener('scroll', scrollAppear);


//portfolio avec méthodes des classes
class Portfolio{

    constructor(selector){
        this.activeContent = null
        this.activeItem = null
        this.container = document.querySelector(selector);
        if (this.container === null) {
            throw new Error(`L'élément ${selector} n'existe pas`)
        }
        this.children = Array.prototype.slice.call(this.container.querySelectorAll('.js-item'));
        this.children.forEach((child) => {
            child.addEventListener('click', (e) => {
                e.preventDefault();
                this.show(child)
            } )
        })
        
    }
    //Affiche le contenu d'un projet au clic
    show(child) {
        let offset = 0
        if (this.activeContent !== null) {
            this.slideUp(this.activeContent)
            if(this.activeContent.offsetTop < child.offsetTop) {
                offset = this.activeContent.offsetHeight
            }
        }
        if (this.activeItem === child) {
            this.activeContent = null
            this.activeItem = null
        } else {
            let content = child.querySelector('.js-body').cloneNode(true)
            child.after(content)
            this.slideDown(content)
            this.scrollTo(child, offset)
            this.activeContent = content
            this.activeItem = child
            
        }
        
    }
    //Affiche l'élement avec un effet d'animation
    slideDown (element) {
        let height = element.offsetHeight
        element.style.height = '0px'
        element.style.transitionDuration = '.5s';
        element.offsetHeight // Force le repaint
        element.style.height = height + 'px';
        window.setTimeout( () => {
            element.style.height = null
        }, 500)
    }

    //Masquer un élément avec un effet d'animation
    slideUp (element) {
        let height = element.offsetHeight
        element.style.height = height + 'px';
        element.offsetHeight // Force le repaint
        element.style.height = '0px'
        window.setTimeout( () => {
            element.parentNode.removeChild(element)
        }, 500)
    }

    // Fait défiler la fenêtre jusqu'à l'élément
    scrollTo (element, offset = 0) {
        window.scrollTo({
            behavior : "smooth",
            left : 0,
            top : element.offsetTop - offset
            
        })
    }

}

new Portfolio('#js-portfolio');

//carroussel

const imgs = document.getElementById('imgs')
const slide = document.querySelectorAll('.slide')

let idx = 0

function run() {
    idx ++;

    if(idx > slide.length - 1) {
        idx = 0
    }
    imgs.style.transform = `translateX(${-idx * 300}px)`
}

// setInterval(run, 3000)