function initCarousel() {
  let btnLeft = document.querySelector('.carousel__arrow_left');
  let btnRight = document.querySelector('.carousel__arrow_right');
  let carouselInner = document.querySelector('.carousel__inner');
  let carouselSlides = document.querySelectorAll('.carousel__slide');

  let carouselInnerWidth = carouselInner.offsetWidth;
  let counter = 0;

  let maxWidth = (carouselSlides.length - 1) * -carouselInnerWidth;
  let minWidth = 0;

  if (counter === minWidth) {
    btnLeft.style.display = 'none';
  } else {
    btnLeft.style.display = '';
  }

  carouselInner.style.transform = `translateX(-${counter}px)`;

  btnRight.addEventListener('click', (evt) => {

    counter -= carouselInnerWidth;

    if (counter === maxWidth) {
      btnRight.style.display = 'none';
      btnLeft.style.display = '';
    } else {
      btnRight.style.display = '';
    }

    carouselInner.style.transform = `translateX(${counter}px)`;
  });

  btnLeft.addEventListener('click', (evt) => {
    counter += carouselInnerWidth;

    if (counter === minWidth) {
      btnLeft.style.display = 'none';
      btnRight.style.display = '';
    } else {
      btnLeft.style.display = '';
    }

    carouselInner.style.transform = `translateX(${counter}px)`;
  });
}
