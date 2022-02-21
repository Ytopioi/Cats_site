'use strict';
// common elements

const imgNeed = ['./img/logo.png', './img/close.png'];

const body = document.querySelector('body');
body.className = 'body';

//add modal popup

const popup = document.createElement('div');
const popupContainer = document.createElement('div');
const popupCont = document.createElement('div');
const popupClose = document.createElement('div');

popup.className = 'popup';
popupContainer.className = 'popup__container';
popupCont.className = 'popup__content';
popupClose.className = 'popup__close';
popupClose.style.backgroundImage = `url(${imgNeed[1]})`;

popupContainer.append(popupCont, popupClose);
popup.append(popupContainer)
body.append(popup);

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
const container = document.createElement('div');
container.className = 'main__container';
main.append(container)

// console.log(cats[0].img_link);

let mainContent = '';

cats.forEach(cat => {
    mainContent +=
        `<div class="container__card" id="${cat.id}">
        <div class="container__card-img" style="background-image: url(${cat.img_link})"></div>
        <h3 class="container__catName">${cat.name}</h3>
        <div class="container__catRate" data-rate='${cat.rate}'>
        </div>
    </div>`;

})

container.innerHTML += mainContent;

let rateCont = document.querySelectorAll('.container__catRate');

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
const cards = document.querySelectorAll('.container__card');
let result = '';

const showPopup = function (text) {
    popup.classList.add('popup__active');
    popupContainer.style.backgroundColor = 'white';
    popupCont.innerHTML = text;

    // body.style.backgroundColor = '#0006';
    // body.style.overflow = 'hidden';
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

//add closes functions
    //close button
const closePopup = function (e) {
    console.log(e);
    popup.classList.remove('popup__active');
    
    body.style.backgroundColor = '';
    body.style.overflow = '';
}

    // close Esc
const handlerEscClosePopup = function (e) {
    if (e.keyCode == 27) {
        popup.classList.remove('popup__active');
        body.style.backgroundColor = '';
        body.style.overflow = '';
    };
}
    // close outside of Popup container
const handlerOutsideClosePopup = function (e) {
    console.log(e.target.closest);
    if(!e.target.closest('.popup__container')) {
        closePopup();
    }
}

popupClose.addEventListener('click', closePopup);
popup.addEventListener('click', handlerOutsideClosePopup)
document.addEventListener('keydown', handlerEscClosePopup)

// https://sb-cats.herokuapp.com/