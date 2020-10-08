import './styles.css';
import imagesListTempl from './templates/images-list.hbs';
import servise from './js/servise.js';
const debounce = require('lodash.debounce');





const inputRef = document.querySelector('.search-form');
const imagesListRef = document.querySelector('.gallery');
const BtnloadMoreRef = document.querySelector('.btn-load-more');

function renderMarkup(data) {
    let markup = null;
    markup = imagesListTempl(data.hits);
    imagesListRef.insertAdjacentHTML('beforeend', markup);
}

const debounceInputCallback = debounce(event => {
    servise.querry = event.target.value;
    servise.resetPage();
    if(servise.querry){
        servise.fethcArticles().then(data=>{
            imagesListRef.innerHTML = '';
            renderMarkup(data);
            if(data.total===0 || servise.remainingArticles <= 12){
                BtnloadMoreRef.classList.add('is-hidden');
            }
            else{
                BtnloadMoreRef.classList.remove('is-hidden');
            }
        });
    } 
    else { 
        imagesListRef.innerHTML = '';
        BtnloadMoreRef.classList.add('is-hidden');
        // return;- оставил, потому что будет вопрос(чтоб не забыть!)
    };
}, 0);

inputRef.addEventListener('input', debounceInputCallback);
BtnloadMoreRef.addEventListener('click', ()=>{
    servise.fethcArticles().then(data=>{
        renderMarkup(data);
        console.dir(document.documentElement.offsetHeight);
        window.scrollTo({
            top: 500,   //Тоже вопрос!
            behavior: 'smooth'
        })
        if(servise.remainingArticles <= 12){
            BtnloadMoreRef.classList.add('is-hidden');
        }
        else{
            BtnloadMoreRef.classList.remove('is-hidden');
        }
    });
});