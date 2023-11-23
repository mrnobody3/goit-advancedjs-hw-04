import axios from 'axios';

const KEY = '27155167-60085c6995a1a3a14bfd0e86b';
const BASE_URL = 'https://pixabay.com/api/';
export const PER_PAGE = 40;

export async function fetchImg(name, page) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: KEY,
        q: name,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: PER_PAGE,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}
