import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = document.createElement('div');
    this.elem.classList.add('carousel');

    this.render(slides);

    this.elem.addEventListener("click", (event) => this.onClick(event));

    this.initSlider();
  }

  render(data) {
    const carousel = this.elem;

    const carouselInner = document.createElement('div');
    carouselInner.classList.add('carousel__inner');

    carousel.insertAdjacentElement('beforeend', carouselInner);

    const arrows = `
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
    `;

    carousel.insertAdjacentHTML('afterbegin', arrows)

    const slidesHtml = data.map(({name, price, image, id }) => {
      return `
        <div class="carousel__slide" data-id="${id}">
        <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${price.toFixed(2)}</span>
          <div class="carousel__title">${name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
        </div>    `;
    }).join('');

    carouselInner.insertAdjacentHTML('afterbegin', slidesHtml);
    carousel.append(carouselInner);

  }

  initSlider() {
    let btnLeft = this.elem.querySelector('.carousel__arrow_left');
    let btnRight = this.elem.querySelector('.carousel__arrow_right');
    let carouselSlides = this.elem.querySelectorAll('.carousel__slide');
    let carouselInner = this.elem.querySelector('.carousel__inner');

    btnLeft.style.display = 'none';

    let counter = 0;
    carouselInner.style.transform = `translateX(-${counter}px)`;

    let slidesWidth;

    btnRight.addEventListener('click', () => {
      let carouselInnerWidth = carouselInner.offsetWidth;
      counter += carouselInnerWidth;

      carouselInner.style.transform = `translateX(-${counter}px)`;

      slidesWidth = (carouselSlides.length - 1) * carouselInner.offsetWidth;

      if (counter === slidesWidth) {
        btnRight.style.display = 'none';
      }

      if(counter > 0) {
        btnLeft.style.display = '';
      }
    });

    btnLeft.addEventListener('click', () => {
      let carouselInnerWidth = carouselInner.offsetWidth;
      counter -= carouselInnerWidth;

      carouselInner.style.transform = `translateX(-${counter}px)`;

      slidesWidth = (carouselSlides.length - 1) * carouselInner.offsetWidth;

      if (counter === 0) {
        btnLeft.style.display = 'none';
      }

      if (counter < slidesWidth) {
        btnRight.style.display = '';
      }

    });
  }

  onClick(event) {
    if (event.target.closest('.carousel__button')) {
      this.elem.dispatchEvent(
        new CustomEvent("product-add", {
          detail: event.target.closest('.carousel__slide').dataset.id,
          bubbles: true
        }));
    }
  }

}
