'use strict';

//add header, main, footer
let catLikes = ['/img/logo.png', '/img/like.svg'];

let body = document.querySelector('body');
body.className = 'body';

let header = document.createElement('header');
let main = document.createElement('main');
let footer = document.createElement('footer');
header.className = 'header';
main.className = 'main';
footer.className = 'footer';

body.prepend(header, main, footer);

//add logo and contacts to header

let headerBox = document.createElement('div');
let logo = document.createElement('div');
let contact = document.createElement('div');
headerBox.className = "header_box"

logo.className = 'header_logo';
logo.style.backgroundImage = `url(${catLikes[0]})`

contact.className = 'header_contact';
contact.innerHTML = '<p>Бабулькины котики</p>';

header.append(headerBox);
headerBox.append(logo, contact);


//add cards to main
let conteiner = document.createElement('div');
conteiner.className = 'main_conteiner';
main.append(conteiner)

// console.log(cats[0].img_link);

let mainContent = '';

cats.forEach(cat => {
    mainContent += `<div class="conteiner_card">
        <div class="conteiner_card-img" style="background-image: url(${cat.img_link})"></div>
        <h3 class="conteiner_catName">${cat.name}</h3>
        <div class="conteiner_catRate" data-rate='${cat.rate}'>
        </div>
    </div>`
})

conteiner.innerHTML += mainContent;

let rateCont = document.querySelectorAll('.conteiner_catRate');

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

    if(likeNone) {
        // console.log(likeNone);
        for (let i =0; i < likeNone; i++) {
            // console.log(i);
            n += `<div class="rate_likeNone"></div>`
        }
        
    }

    el.innerHTML += n;
})


//add footer
let footerBox = document.createElement('div');
let copyright = document.createElement('div');
let tilda = document.createElement('a');

footerBox.className = 'footer_box';
copyright.className = 'footer_copyright';
tilda.className = 'footer_tilda';

copyright.innerHTML = '©2022 All rights reserved';
tilda.setAttribute('href', 'https://tilda.cc');
tilda.innerHTML = `Icons are provided by Tilda Publishing`;

footer.append(footerBox);
footerBox.append(copyright, tilda);



// https://sb-cats.herokuapp.com/