import './styles.css';
import imagesListTempl from './templates/images-list.hbs';
import service from './js/service.js';
import { debounce } from 'lodash';

const inputRef = document.querySelector('.search-form');
const imagesListRef = document.querySelector('.gallery');
const btnloadMoreRef = document.querySelector('.btn-load-more');

function renderMarkup(data) {
    let markup = null;
    markup = imagesListTempl(data.hits);
    imagesListRef.insertAdjacentHTML('beforeend', markup);
}

const debounceInputCallback = debounce(event => {
    service.query = event.target.value;
    service.resetPage();
    if(service.query){
        service.fetchArticles().then(data => {
            imagesListRef.innerHTML = '';
            renderMarkup(data);
            heightScroll = document.documentElement.offsetHeight;
            if(data.total === 0 || service.remainingArticles <= 0){
                btnloadMoreRef.classList.add('is-hidden');
            }
            else{
                btnloadMoreRef.classList.remove('is-hidden');
            }
        });
    } 
    else { 
        imagesListRef.innerHTML = '';
        btnloadMoreRef.classList.add('is-hidden');
        // return;- оставил, потому что будет вопрос(чтоб не забыть!)
    };
}, 500);
let heightScroll = document.documentElement.offsetHeight;//
inputRef.addEventListener('input', debounceInputCallback);
btnloadMoreRef.addEventListener('click', () => {
    service.fetchArticles().then(data => {
        renderMarkup(data);
        window.scrollTo({
            top: heightScroll -70,   //Тоже вопрос!
            behavior: 'smooth'
        })
        heightScroll = document.documentElement.offsetHeight
        if(service.remainingArticles <= 0){
            btnloadMoreRef.classList.add('is-hidden');
        }
        else{
            btnloadMoreRef.classList.remove('is-hidden');
        }
    });
});