const body = document.body
const spans = $('.head span')
const more = $('.more')
let mouseTrail = '#54d7e4'

more.on('mouseenter', (e) => {
    mouseTrail = '#e95499'
})
more.on('mouseleave', () => {
    mouseTrail = '#54d7e4'
})

function createCircles(e) {
    // if(Math.random() > .5) {
    const createElement = document.createElement('span')
    createElement.classList.add('circle')
    var size = Math.random() * 50;
    createElement.style.backgroundColor = mouseTrail
    gsap.to(createElement, {
        width: 2 * size + 'px',
        height: 2 * size + 'px',
        ease: 'ease',
        duration: '.2'
    })
    createElement.style.left = e.pageX + "px";
    createElement.style.top = e.pageY + "px";
    document.querySelector('body').appendChild(createElement);

    setTimeout(() => {
        gsap.to(createElement, {
            opacity: 0,
            ease: 'ease',
            duration: '.1'
        })
        createElement.remove()
    }, 200)
    // }
}

const MouseWheelHandler = function (e) {
    var e = window.event || e
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)))

    e.preventDefault()
    e.stopPropagation()

    if (delta === -1) { contentView().then(() => scrollAnim()) }

    return false
}

if (body.addEventListener) {
    body.addEventListener("mousewheel", MouseWheelHandler, { passive: false })
    body.addEventListener("DOMMouseScroll", MouseWheelHandler, { passive: false })
}

const scrollAnim = () => {
    //pass
}

const contentView = () => {
    return new Promise((resolve, reject) => {

        const tl = gsap.timeline({
            default: { duration: 1 }
        })

        tl.to('#landing', {
            zIndex: '-1',
            duration: .1
        })
            .to('#about', {
                display: 'block',
                // top: '0%',
                translateY: 0,
                ease: 'power4.out',
                duration: .2
            }, '-=0.05')
            .from('#about .page', {
                top: '90%',
                ease: 'ease.in',
                duration: .6
            })
            .to('.head', {
                top: '30%',
                ease: 'ease.inOut',
                // duration: 1
            }, '-=0.4')
            .to('#landing', {
                display: 'none',
                duration: .1
            }, '-=0.6')
            .to('#work', {
                display: 'flex'
            })
            .to('.more', {
                display: 'block'
            })
            .to('#team', {
                display: 'flex'
            })
            .to('#contact', {
                display: 'flex'
            })

        try {
            body.removeEventListener('mousewheel', MouseWheelHandler)
            body.removeEventListener('DOMMouseScroll', MouseWheelHandler)
        } catch { }


        $('body').on('mousemove', createCircles)
        const tilt = $('.js-tilt').tilt();
        resolve()
    })
}

spans[0].addEventListener('mousemove', (e) => {
    $('.love').css({ 'top': e.offsetY - 50 + 'px', 'left': e.clientX - 100 + 'px', 'opacity': '1' })
}, false)
spans[0].addEventListener('mouseout', (e) => {
    $('.love').css('opacity', '0')
}, false)

spans[1].addEventListener('mousemove', (e) => {
    $('.work').css({ 'top': e.offsetY - 50 + 'px', 'left': e.clientX - 200 + 'px', 'opacity': '1' })
}, false)
spans[1].addEventListener('mouseout', (e) => {
    $('.work').css('opacity', '0')
}, false)

spans[2].addEventListener('mousemove', (e) => {
    $('.unique').css({ 'top': e.offsetY - 50 + 'px', 'left': e.clientX - 200 + 'px', 'opacity': '1' })
}, false)
spans[2].addEventListener('mouseout', (e) => {
    $('.unique').css('opacity', '0')
}, false)

spans[3].addEventListener('mousemove', (e) => {
    $('.idea').css({ 'top': e.offsetY - 50 + 'px', 'left': e.clientX - 100 + 'px', 'opacity': '1' })
}, false)
spans[3].addEventListener('mouseout', (e) => {
    $('.idea').css('opacity', '0')
}, false)

//scroll

var scene1 = document.getElementById('scene1');
var parallaxInstance = new Parallax(scene1);

var scene2 = document.getElementById('scene2');
var parallaxInstance = new Parallax(scene2);

var scene4 = document.getElementById('scene4');
var parallaxInstance = new Parallax(scene4);

var scene5 = document.getElementById('scene5');
var parallaxInstance = new Parallax(scene5);
