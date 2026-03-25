import axios from "axios";

export async function getImagesByQuery(query, page) {
    // let page = 1;
    let perPage = 15;
    axios.defaults.baseURL = 'https://pixabay.com';
    const searchParams = new URLSearchParams({
        key: '55116148-63b4b48da282efb6025f7a072',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
    });

    
    const response = await axios.get(`/api/?${searchParams}`);
    console.log(response);
    
    // .then(response => response.data.hits)
    return response.data
}
 

