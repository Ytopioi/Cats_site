'use strict';

//check cookie


if (!Cookies.get('user')) {
    window.location.replace('./authorize.html');
}

// common elements

const imgNeed = ['./img/logo.png', './img/close.png'];

const body = document.querySelector('body');
body.className = 'body';

function getCats() {
    if (localStorage.length == 0) {
    return fetch('https://sb-cats.herokuapp.com/api/show')
        .then((resp) => {
            if (resp.ok) {
                // console.log(response.json());
                return resp.json();
            }
            return Promise.reject(resp)
        })
        .then(({data}) => {

            localStorage.setItem('cats', JSON.stringify(data));
            return data;
        })
        .catch(err => {
            console.log(err);
        })
    }
}


let catS = JSON.parse(localStorage.getItem('cats'));

//add modal popup and form add and form edit

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

const popupAddCat = document.querySelector('.popup__add__cat');
const formAddCat = popupAddCat.querySelector('.form__addCat');
const buttonAdd = formAddCat.querySelector('button');

const popupEditCat = document.querySelector('.popup__edit__cat');
const formEditCat = popupEditCat.querySelector('.form__editCat');
const buttonEdit = formEditCat.querySelector('button');

//function for Edit form with existing data
function handleClickCatEdit(e) {
	const inputs = formEditCat.querySelectorAll('input');
    const descr = formEditCat.querySelector('textarea')

    let n = e.target.closest('.container__card');

    catS.forEach(cat => {
        inputs.forEach(input => {
            if(n.getAttribute('id') == cat.id){
                input.setAttribute('value', cat[input.name])
                descr.innerText = cat.description;
            }        
        })
    })
    showPopup(formEditCat.innerHTML);
}


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
const rightHeaderCont = document.createElement('div');
const headerReloadBut = document.createElement('button');
const headerAddBut = document.createElement('button');
const contact = document.createElement('div');

headerBox.className = "header__box"

logo.className = 'header__logo';
logo.style.backgroundImage = `url(${imgNeed[0]})`

rightHeaderCont.className = 'header__text__button';

headerReloadBut.className = 'header__button-reload';
headerAddBut.className = 'header__button-add';

headerReloadBut.innerText = 'Обновить список Котиков';
headerAddBut.innerText = 'Добавить Котика'

contact.className = 'header__contact';
contact.innerHTML = '<p>Бабулькины котики</p>';

rightHeaderCont.append(headerReloadBut, headerAddBut, contact)
headerBox.append(logo, rightHeaderCont);
header.append(headerBox);

//add event button AddCat
headerAddBut.addEventListener('click', (e) => {
    showPopup(formAddCat.outerHTML)
})

//add cards to main
const container = document.createElement('div');
container.className = 'main__container';
main.append(container)


let mainContent = '';

catS.forEach(cat => {
    mainContent +=
        `<div class="container__card" id="${cat.id}">
        <div class="container__card-img" style="background-image: url(${cat.img_link})"></div>
        <h3 class="container__catName">${cat.name}</h3>
        <div class="container__catRate" data-rate='${cat.rate}'>
        </div>
        <div class="container__catButton">
            <button type="button" class="catButton__delete1">Удалить</button>
            <button type="button" class="catButton_edit">Редактировать</button>
        </div>

    </div>`;

})

container.innerHTML += mainContent;

let rateCont = document.querySelectorAll('.container__catRate');


rateCont.forEach(el => {
    let n = '';
    let likeNone = 10 - +el.getAttribute('data-rate');

    for (let i = 0; i < +el.getAttribute('data-rate'); i++) {
        n += `<div class="like"></div>`
    }

    if (likeNone) {
        for (let i = 0; i < likeNone; i++) {
            n += `<div class="rate__likeNone"></div>`
        }
    }
    el.innerHTML += n;
})

//add event to cards to open popup + delete + edit
const cards = document.querySelectorAll('.container__card');
const popupDelete = document.querySelector('.popup__delete-cont');
const butYesDelete = document.querySelector('.btn__yes');
const butNoDelete = document.querySelector('.btn__no');


let result = '';

const showPopup = function (text) {
    popup.classList.add('popup__active');
    popupContainer.style.backgroundColor = 'white';
    popupCont.innerHTML = text;
}

// add card's popup
cards.forEach(el => {
    catS.forEach(cat => {
        
        let n = '';
        if (cat.age % 10) {
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
            if (el.getAttribute('id') == cat.id) {
                showPopup(n);
            }
        })

    });
})

// add event for Delete Button + Edit Button
cards.forEach(card => {
    const butDelete = card.querySelector('.catButton__delete1');
    butDelete.addEventListener('click', e => {
        e.stopPropagation();
        let n = e.target.closest('.container__card');
                
        if (n.getAttribute('id') == card.id) {
            if(confirm('Вы удаляете котика')) {
                console.log("да");
                fetch(`https://sb-cats.herokuapp.com/api/delete/${card.id}`, {
                    method: "DELETE"
                })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                
                    return Promise.reject(response)
                })
                .then((data) => {
                        
                    if(data.message === 'ok'){
                        console.log("еще да");
                        card.remove();
                        const oldData = getLocalStorageData('cats');
                        const newData = oldData.filter(item => item.id !== card.id);
                        setLocalStorageData('cats', newData)
                    }
                
                })
            }
        }
    })
    
    //add event for Edit Button
    const butEdit = card.querySelector('.catButton_edit');
    
    butEdit.addEventListener('click', e => {
        e.stopPropagation();
        let n = e.target.closest('.container__card');

        if (n.getAttribute('id') == card.id) {
            handleClickCatEdit(e);
        
            const butEditSend = formEditCat.querySelector('button')

            formEditCat.addEventListener('submit', (e) => {
                console.log(e);
                fetch(`https://sb-cats.herokuapp.com/api/update/${card.id}`, {
                    method: "PUT",
                    headers: {
                        'Content-type': "application/json"
                    },
                    //todo body: --?
                })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    return Promise.reject(response)
                })
                .then((data) => {
                        
                if(data.message === 'ok'){
                    console.log("еще да");
                    const oldData = getLocalStorageData('cats');
                    //todo const newData = oldData.filter(item => item.id !== card.id);
                    //todo setLocalStorageData('cats', newData)
                }
                })
            })
        }
    })
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


//add functions for LocalStorage + API POST + popup for AddCat

function formSerialize(form) {
	const res = {}
	const inputs = form.querySelectorAll('input');
    const descr = form.querySelector('textarea');
	console.log(inputs);

	inputs.forEach(input => {
		res[input.name] = input.value;
	})
    res[descr.name] = descr.value
	console.log(res);

	return res;
}


function getLocalStorageData(key) {
	return JSON.parse(localStorage.getItem(key));
}

function setLocalStorageData(key, data) {
	return localStorage.setItem(key, JSON.stringify(data));
}

const autoClosePopup = function (e) {
	const popupActive = document.querySelector('.popup__active');
		if (popupActive) {
			popupActive.classList.remove('.popup__active')
		}
}

const reloadData = function() {
    localStorage.clear();
    container.innerHTML = '';
	getCats();
    }


formAddCat.addEventListener('submit', (event) => {
    console.log(event);
	event.preventDefault();
	const bodyJSON = formSerialize(formAddCat);
	
	fetch('https://sb-cats.herokuapp.com/api/add', {
		method: "POST",
		body: JSON.stringify(bodyJSON),
		headers: {
			'Content-type': "application/json"
		}
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			}

			return Promise.reject(response)
		})
		.then((data) => {
			if(data.message === 'ok'){
				reloadData();
				autoClosePopup();
			}
		})
		.catch(err => {
			console.log(err);
		})
})



//add closes functions
//close button
const closePopup = function (e) {
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
    // console.log(e.target.closest);
    if (!e.target.closest('.popup__container')) {
        closePopup();
    }
}

popupClose.addEventListener('click', closePopup);
popup.addEventListener('click', handlerOutsideClosePopup)
document.addEventListener('keydown', handlerEscClosePopup)

headerReloadBut.addEventListener('click', reloadData);

getCats();


// https://sb-cats.herokuapp.com/
