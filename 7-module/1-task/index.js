import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.elem = document.createElement('div');
    this.elem.classList.add('ribbon');

    this.render(categories);
    this.initRibbon();
    this.elem.addEventListener("click", (event) => this.onClick(event));

  }

  render(data) {
    const ribbonInner = document.createElement('div');
    ribbonInner.classList.add('ribbon__inner');

    const ribbonArrowLeft = `
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `;

    const ribbonArrowRight = `
      <button class="ribbon__arrow ribbon__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `;

    const ribbonItems = data.map(({id, name}) => {
      return `<a href="#" class="ribbon__item" data-id="${id}">${name}</a>`;

    }).join('');

    ribbonInner.insertAdjacentHTML('afterbegin', ribbonItems);

    this.elem.insertAdjacentHTML('afterbegin', ribbonArrowLeft);
    this.elem.insertAdjacentElement('beforeend', ribbonInner);
    this.elem.insertAdjacentHTML('beforeend', ribbonArrowRight);

  }

  initRibbon() {
    const arrowBack = this.elem.querySelector('.ribbon__arrow_left');
    const arrowForward = this.elem.querySelector('.ribbon__arrow_right');
    const ribbonInner = this.elem.querySelector('.ribbon__inner');

    arrowBack.classList.remove('ribbon__arrow_visible');
    arrowForward.classList.add('ribbon__arrow_visible');

    arrowBack.addEventListener('click', (evt) => {
      ribbonInner.scrollBy(-350, 0);
    });

    arrowForward.addEventListener('click', (evt) => {
      ribbonInner.scrollBy(350, 0);
    });

    ribbonInner.addEventListener('scroll', (evt) => {
      let scrollLeft = ribbonInner.scrollLeft;
      let scrollWidth = ribbonInner.scrollWidth;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft > 0) {
        arrowBack.classList.add('ribbon__arrow_visible');
      }

      if (scrollLeft === 0) {
        arrowBack.classList.remove('ribbon__arrow_visible');
      }

      if(scrollRight === 0) {
        arrowForward.classList.remove('ribbon__arrow_visible');
      } else {
        arrowForward.classList.add('ribbon__arrow_visible');
      }
    });
  }

  onClick(evt) {

    const allRibbonItems = this.elem.querySelectorAll('.ribbon__item');


    if (evt.target.closest('.ribbon__item')) {
      evt.preventDefault();

      allRibbonItems.forEach(item => {
        item.classList.remove('ribbon__item_active')
      })

      if(!evt.target.classList.contains('ribbon__item_active')) {
        evt.target.classList.add('ribbon__item_active')
      }

      this.elem.dispatchEvent(
        new CustomEvent('ribbon-select', {
          detail: evt.target.dataset.id,
          bubbles: true
        }));
    }
  }
}
