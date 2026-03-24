import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from "./js/pixabay-api.js";
import { clearGallery, createGallery, hideLoader, showLoader } from "./js/render-functions.js";

export const refs = {
    formEl: document.querySelector('.form'),
    inputEl: document.querySelector('input[name="search-text"]'),
    searchButtonEl: document.querySelector('button'),
    galleryEl: document.querySelector('.gallery'),
    loader: document.querySelector('.js-loader'),
};

refs.formEl.addEventListener('submit', onSubmit);


function onSubmit(e) {
    e.preventDefault();
    clearGallery();
    const query = refs.inputEl.value.trim();
    console.log(query);
    
    if (query === '') {
        iziToast.show({
            color: 'red',
            message: 'Sorry, there are no images matching your search query. Please try again!'
        });
        return
    }
    showLoader();
    
    getImagesByQuery(query)
        .then(images => {
            if (images.length === 0) {
                iziToast.show({
            color: 'red',
            message: 'Sorry, there are no images matching your search query. Please try again!'
                });
                return
            }
            createGallery(images);
        })
        .catch(error => {
            iziToast.show({ message: 'Error' });
            console.log(error);
        })
        .finally(() => {
            hideLoader();
            refs.formEl.reset();
        });
    
          
}
