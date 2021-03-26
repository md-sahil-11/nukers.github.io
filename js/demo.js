/**
 * demo.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2019, Codrops
 * http://www.codrops.com
 */
{
    const frame = document.querySelector('.frame');
    const contentTitle = document.querySelector('.content__title');
    const enterCtrl = document.querySelector('.content__button');
    contentTitle.style.opacity = 0;

    let animation = new explosion.default(
        'container', // id of DOM el
        {
            surface: '11161b',
            inside: 'e95499',
            background: '11161b',
            onLoad: ()=>{
                document.body.classList.remove('loading');
            }
        },

    );

    let targetMouseX = 0, mouseX = 0, targetMouseY = 0, mouseY = 0, ta = 0, taY = 0;
    const sign = n => n === 0 ? 1 : n/Math.abs(n);    
    document.addEventListener('mousemove',(e) => {
        targetMouseX = 2*(e.clientX - animation.width/2)/animation.width;
        targetMouseY = 2*(e.clientY - animation.height/2)/animation.height
    });
    document.addEventListener('touchmove',(e) => {
        targetMouseX = ( e.touches[0].clientX / animation.width ) * 2 - 1;
        targetMouseY = ( e.touches[0].clientY / animation.height ) * 2 - 1;
    });

    const draw = () => {
        if ( animation ) {
            mouseX += (targetMouseX - mouseX)*0.05;
            mouseY += (targetMouseY - mouseY)*0.05;
            ta = Math.abs(mouseX);
            taY = Math.abs(mouseY);
            animation.scene.rotation.x = Math.PI/2 - taY*(2 - taY)*Math.PI * sign(mouseY);
            animation.scene.rotation.y = Math.PI/2 - ta*(2 - ta)*Math.PI * sign(mouseX);
            animation.scene.rotation.z = Math.PI/2 - ta*(2 - ta)*Math.PI * sign(mouseX);
        }
        window.requestAnimationFrame(draw);
    }
    draw();


    let isOpen = false;
    enterCtrl.addEventListener('click', () => {
        isOpen = true;
        
        gsap.to('.content__title', {
            rotationY: 0,
            duration: 1.2,
            ease: 'bounce',
            delay: .4
        })

        new TimelineMax()
        .to(enterCtrl, 0.3, {
            opacity: 0,
            ease: Expo.easeOut,
            complete: () => TweenMax.set(enterCtrl, {'pointer-events' : 'none'})
        })
        .to(animation.camera.position, 0.5, {
            z: 10,
            ease: Expo.easeIn
        }, 0)
        .to(animation.settings, 4, {
            progress: 2,
            ease: Expo.easeOut
        }, 0.4)
        .to(frame, 1, {
            opacity: 1,
            startAt: {scale: 0.9},
            scale: 1,
            ease: Expo.easeOut
        }, 0.4)
        .to(contentTitle, 1, {
            opacity: 1,
            startAt: {scale: 0},
            scale: 1,
            ease: Expo.easeOut
        }, 0.4)
        .to(animation.camera.position, 1, {
            z: 7,
            ease: Quart.easeInOut
        }, 2)
        
    });
    
    enterCtrl.addEventListener('mouseenter', () => {
        if ( isOpen ) return;
        new TimelineMax()
        .to(animation.camera.position, 1, {
            z: 5.5,
            ease: Expo.easeOut
        }, 0);
    });
    enterCtrl.addEventListener('mouseleave', () => {
        if ( isOpen ) return;
        new TimelineMax()
        .to(animation.camera.position, 1, {
            z: 7,
            ease: Expo.easeOut
        }, 0);
    });
}
