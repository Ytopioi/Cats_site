'use strict';
// common elements

const imgNeed = ['/img/logo.png', '/img/like.svg', '/img/close.png'];

const body = document.querySelector('body');
body.className = 'body';

//add modal popup

const popupBack = document.createElement('div');
const popup = document.createElement('div');
const popupCont = document.createElement('div');
const popupClose = document.createElement('div');

popupBack.className = 'popup__back';
popup.className = 'popup';
popupCont.className = 'popup__content';
popupClose.className = 'popup__close';
popupClose.style.backgroundImage = `url(${imgNeed[2]})`;

popup.append(popupCont, popupClose);
popupBack.append(popup)
body.append(popupBack);

//add header, main, footer

const header = document.createElement('header');
const main = document.createElement('main');
const footer = document.createElement('footer');
header.className = 'header';
main.className = 'main';
footer.className = 'footer';

body.prepend(header, main, footer);

//add logo and contacts to header

const headerBox = document.createElement('div');
const logo = document.createElement('div');
const contact = document.createElement('div');
headerBox.className = "header__box"

logo.className = 'header__logo';
logo.style.backgroundImage = `url(${imgNeed[0]})`

contact.className = 'header__contact';
contact.innerHTML = '<p>Бабулькины котики</p>';

header.append(headerBox);
headerBox.append(logo, contact);


//add cards to main
const conteiner = document.createElement('div');
conteiner.className = 'main__conteiner';
main.append(conteiner)

// console.log(cats[0].img_link);

let mainContent = '';

cats.forEach(cat => {
    mainContent +=
        `<div class="conteiner__card" id="${cat.id}">
        <div class="conteiner__card-img" style="background-image: url(${cat.img_link})"></div>
        <h3 class="conteiner__catName">${cat.name}</h3>
        <div class="conteiner__catRate" data-rate='${cat.rate}'>
        </div>
    </div>`;

})

conteiner.innerHTML += mainContent;

let rateCont = document.querySelectorAll('.conteiner__catRate');

rateCont.forEach(el => {
    let n = '';
    let likeNone = 10 - +el.getAttribute('data-rate');

    // console.log(likeNone);
    // console.log(typeof + el.getAttribute('data-rate'));

    for (let i = 0; i < +el.getAttribute('data-rate'); i++) {
        // console.log(i);
        n += `<div class="like"></div>`
        // console.log(n);
    }

    if (likeNone) {
        // console.log(likeNone);
        for (let i = 0; i < likeNone; i++) {
            // console.log(i);
            n += `<div class="rate__likeNone"></div>`
        }

    }

    el.innerHTML += n;
})

//add event to cards to open popup
const cards = document.querySelectorAll('.conteiner__card');
let result = '';

const showPopup = function (text) {
    popupBack.classList.add('popup__active');
    popup.style.backgroundColor = 'white';
    popupCont.innerHTML = text;

    // cards.classList.add('disabled')
    body.style.backgroundColor = '#0006';
    body.style.overflow = 'hidden';
}

cards.forEach(el => {

    // console.log(el);

    cats.forEach(cat => {
        let n = '';
        if (cat.age === 1) {
            result = "год";
        } else if (cat.age >= 2 && cat.age < 5) {
            result = 'года';
        } else if (cat.age >= 5 && cat.age < 20) {
            result = "лет";
        }

        n = `<div class="popup__card" data-id="${cat.id}">
                <img class="popup__image" src="${cat.img_link}" alt="" width="300">
                <div class="popup__text">
                    <h2>${cat.name}</h2>
                    <p class="popup__text-age" data-age="${cat.age}">${cat.age} ${result}</p>
                    <p class="popup__text-descr">${cat.description}</p>
                </div>
            </div>`
        el.addEventListener('click', e => {
            console.log(e);
            // el.classList.add('disabled')
            e.path[2].classList.add('disabled')
            if (el.getAttribute('id') == cat.id) {
                
                showPopup(n)
            }
        })
    });

})


//add footer
const footerBox = document.createElement('div');
const copyright = document.createElement('div');
const tilda = document.createElement('a');

footerBox.className = 'footer__box';
copyright.className = 'footer__copyright';
tilda.className = 'footer__tilda';

copyright.innerHTML = '©2022 All rights reserved';
tilda.setAttribute('href', 'https://tilda.cc');
tilda.innerHTML = `Icons are provided by Tilda Publishing`;

footer.append(footerBox);
footerBox.append(copyright, tilda);

//add close functions

const closePopup = function (e) {
    popupBack.classList.remove('popup__active');
    conteiner.classList.remove('disabled');
    
    body.style.backgroundColor = '';
    body.style.overflow = '';
}
// добавила чтобы закрыть окно по клику на body
// const closePopup1 = function (e) {
//     e.target.firstElementChild.classList.remove('popup__active');
//     e.path[2].classList.remove('disabled');
//     console.log(e);
//     e.target.style.backgroundColor = '';
//     e.target.style.overflow = '';
// }
// добавила закрыть по esc
const closePopup2 = function (e) {
    if (e.keyCode == 27) {
        popupBack.classList.remove('popup__active');
        conteiner.classList.remove('disabled');
        body.style.backgroundColor = '';
        body.style.overflow = '';
    };
}

popupClose.addEventListener('click', closePopup);
// main.addEventListener('click', closePopup1)
document.addEventListener('keydown', closePopup2)

// https://sb-cats.herokuapp.com/