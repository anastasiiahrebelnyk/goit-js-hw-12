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
    clearGallery();
    query = refs.inputEl.value.trim();
    // console.log(query);
    
    
    if (query === '') {
        iziToast.show({
            color: 'red',
            message: 'Sorry, there are no images matching your search query. Please try again!'
        });
        return
    }
    showLoader();
    

    try {
        const images = await getImagesByQuery(query, page);
        // console.log(images);

        if (images.length === 0) {
            iziToast.show({
                color: 'red',
                message: 'Sorry, there are no images matching your search query. Please try again!'
            });
            hideLoader();
            return
        }
        hideLoader();
        createGallery(images.hits);
        const totalPages = images.totalHits / perPage;
        if (page > totalPages) {
            hideLoadMoreButton();
        }
        showLoadMoreButton();    
        // .then(images => {
        //     if (images.length === 0) {
        //         iziToast.show({
        //     color: 'red',
        //     message: 'Sorry, there are no images matching your search query. Please try again!'
        //         });
        //         return
        //     }
        //     createGallery(response.data.hits);
        // })
        // .catch(error => {
        //     iziToast.show({ message: 'Error' });
        //     console.log(error);
        // })
        // .finally(() => {
        //     hideLoader();
            
        //     // refs.formEl.reset();
        // }); }    
    } catch (error) {
        console.log(error);
    
    };

   

};

async function onClick() {
    console.log('click');
    page += 1;
    // const query = refs.inputEl.value.trim();
    showLoader();
    try {
        const images = await getImagesByQuery(query, page);
        hideLoader();
        // console.log(images);
    
        createGallery(images.hits);
        const elem = document.querySelector('.gallery-item');
       console.log(elem.getBoundingClientRect());
        const height = elem.getBoundingClientRect().height;
         window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
        const totalPages = images.totalHits / perPage;

console.log(totalPages);

        if (page > totalPages) {
            hideLoadMoreButton();
             iziToast.show({
                color: 'red',
                message: "We're sorry, but you've reached the end of search results.",
            });
        };

    } catch (error) {
        console.log(error);
    
    };
    //    const query = refs.inputEl.value.trim();
    
//     console.log(query);
//     refs.fetchButton.disabled = false;
//     page += 1;
// //     if (page > totalPages) {
// //         refs.fetchButton.disabled = true;
            
// // }
// //     }

//     await getImagesByQuery(query, page)
//         .then(images => {
             
//             createGallery(images);
//         })
//         .catch(error => {
//             iziToast.show({ message: 'Error' });
//             console.log(error);
//         })
//         .finally(() => {
//             hideLoader();
//             //         if (page > 1) {
//             // refs.fetchButton.textContent = ""

//             refs.formEl.reset();
//         });

};