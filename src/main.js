import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImg, PER_PAGE } from './js/api';
import { refs } from './js/refs';
import { markupCard } from './js/markup';

refs.formRef.addEventListener('submit', onSearchForm);
refs.btnLoadMore.addEventListener('click', onLoadMoreImg);

let numOfPage = 1;
let searchValue = '';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

async function onSearchForm(e) {
  e.preventDefault();
  resetPages();
  resetRender();

  searchValue = e.target.elements.searchQuery.value.trim();

  if (!searchValue) {
    onHideBtn();
    refs.formRef.reset();
    return;
  }

  try {
    const newImg = await fetchImg(searchValue, numOfPage);
    const { data } = newImg;

    const markup = markupCard(data.hits);

    if (markup.length === 0) {
      onHideBtn();
      iziToast.show({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again.',
        color: 'red',
        position: 'topRight',
      });
      return;
    }

    if (data.hits.length === data.totalHits) {
      iziToast.show({
        title: 'warning',
        message: "We're sorry, but you've reached the end of search results.",
        color: 'yellow',
        position: 'topRight',
      });
    }

    iziToast.show({
      title: 'success',
      message: `Hooray! We found ${data.totalHits} images. `,
      color: 'blue',
      position: 'topRight',
    });
    onShowBtn();

    renderMarkup(markup);

    lightbox.refresh();

    if (numOfPage * PER_PAGE >= data.totalHits) {
      onHideBtn();
      return;
    }
  } catch (error) {
    iziToast.show({
      title: 'error',
      message: 'Whoops! Somethings wrong!',
      color: 'red',
      position: 'topRight',
    });
  }

  refs.formRef.reset();
}

function renderMarkup(str = '') {
  refs.galleryRef.insertAdjacentHTML('beforeend', str);
}

async function onLoadMoreImg(e) {
  try {
    numOfPage += 1;
    const newImg = await fetchImg(searchValue, numOfPage);
    const { data } = newImg;
    if (numOfPage * PER_PAGE >= data.totalHits) {
      onHideBtn();
      iziToast.show({
        title: 'warning',
        message: "We're sorry, but you've reached the end of search results.",
        color: 'yellow',
        position: 'topRight',
      });
    }
    const markup = markupCard(data.hits);

    renderMarkup(markup);

    lightbox.refresh();
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.show({
      title: 'error',
      message: 'Whoops! Somethings wrong!',
      color: 'red',
      position: 'topRight',
    });
  }
}

function resetPages() {
  numOfPage = 1;
}

function resetRender() {
  refs.galleryRef.innerHTML = '';
}

function onShowBtn() {
  refs.btnLoadMore.classList.remove('visually-hidden');
}

function onHideBtn() {
  refs.btnLoadMore.classList.add('visually-hidden');
}
