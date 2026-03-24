import axios from "axios";

export function getImagesByQuery(query) {
    axios.defaults.baseURL = 'https://pixabay.com';
    const searchParams = new URLSearchParams({
        key: '55116148-63b4b48da282efb6025f7a072',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    });

    return axios.get(`/api/?${searchParams}`).then(response => response.data.hits);
}
 

