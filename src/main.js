import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from "./js/pixabay-api.js";
import { clearGallery, createGallery, hideLoader, hideLoadMoreButton, showLoader, showLoadMoreButton } from "./js/render-functions.js";

export const refs = {
    formEl: document.querySelector('.form'),
    inputEl: document.querySelector('input[name="search-text"]'),
    searchButtonEl: document.querySelector('button'),
    galleryEl: document.querySelector('.gallery'),
    loader: document.querySelector('.js-loader'),
    fetchButton: document.querySelector('.fetch-button'),
};

let perPage = 15;
let page = 1;
let query;



refs.formEl.addEventListener('submit', onSubmit);

refs.fetchButton.addEventListener('click', onClick);



async function onSubmit(e) {
    e.preventDefault();
    hideLoadMoreButton();
    clearGallery();
    page = 1;
    query = refs.inputEl.value.trim();
    
    if (query === '') {
        hideLoader()
        iziToast.show({
            color: 'red',
            message: 'Sorry, there are no images matching your search query. Please try again!'
        });
        return
    }
    showLoader();
    

    try {
        const images = await getImagesByQuery(query, page);
      

        if (images.hits.length === 0) {
            hideLoadMoreButton();
            iziToast.show({
                color: 'red',
                message: 'Sorry, there are no images matching your search query. Please try again!'
            });
            hideLoader();
            return
        }
        hideLoader();
        createGallery(images.hits);
        showLoadMoreButton(); 
        const totalPages = Math.ceil(images.totalHits / perPage);
        if (page > totalPages) {
            hideLoader();
            hideLoadMoreButton();
            iziToast.show({
                color: 'red',
                message: "We're sorry, but you've reached the end of search results.",
            });
        };
           
    } catch (error) {
         iziToast.show({
                color: 'red',
                message: "ERROR!",
            });
    
    };

   

};

async function onClick() {
    hideLoadMoreButton()
    page += 1;
    showLoader();
    try {
        const images = await getImagesByQuery(query, page);
        hideLoader();
    
        createGallery(images.hits);
        const elem = document.querySelector('.gallery-item');
       console.log(elem.getBoundingClientRect());
        const height = elem.getBoundingClientRect().height;
         window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
        const totalPages = Math.ceil(images.totalHits / perPage);


        if (page > totalPages) {
            hideLoader()
            hideLoadMoreButton();
             iziToast.show({
                color: 'red',
                message: "We're sorry, but you've reached the end of search results.",
            });
        };

    } catch (error) {
        iziToast.show({
                color: 'red',
                message: "ERROR!",
            });
    
    };
    showLoadMoreButton();
};