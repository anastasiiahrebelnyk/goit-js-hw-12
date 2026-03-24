import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { refs } from "../main";



export function createGallery(images) {
    const markup = images.map(img => `<div class="gallery-item">
        <a class="img-link" href="${img.webformatURL}"><img class="img" src="${img.largeImageURL}" alt="${img.tags}" width='360' height='156'>
        <ul class="img-descr">
    <li class="descr"><h2 class="title-descr">Likes</h2>  <p class="descr-text">${img.likes}</p></li>
      <li class="descr"><h2 class="title-descr">Views</h2>  <p class="descr-text">${img.views}</p></li>
      <li class="descr"><h2 class="title-descr">Comments</h2>  <p class="descr-text">${img.comments}</p></li>
      <li class="descr"><h2 class="title-descr">Downloads</h2> <p class="descr-text">${img.downloads}</p></li></ul>
    </ul></a>
        
    </div>`).join('');
    
    refs.galleryEl.insertAdjacentHTML('beforeend', markup);
    let gallery = new SimpleLightbox('.img-link');
    gallery.refresh();
};

export function clearGallery() {
    return refs.galleryEl.innerHTML = '';
};

export function showLoader() {
    return refs.loader.classList.add('loader');
};

export function hideLoader() {
    return refs.loader.classList.remove('loader');
};

const box = new SimpleLightbox('.img-link', { /* options */ });
