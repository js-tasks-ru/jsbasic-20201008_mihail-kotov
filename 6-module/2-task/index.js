import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {

  get elem() {
    return this._elem;
  }

  constructor(product) {

    this._elem = document.createElement('div');
    this._elem.classList.add('card');

    this.renderCard(product);

    this._elem.addEventListener("click", (evt) => this.onClick(evt, product));
  }

  renderCard(data) {
    const { name, price, category, image, id } = data;

    const card = this._elem;

    const cardHtml = `
                <div class="card__top">
                  <img src="/assets/images/products/${image}" class="card__image" alt="product">
                  <span class="card__price">€${price.toFixed(2)}</span>
                </div>
                <div class="card__body">
                  <div class="card__title">${name}</div>
                  <button type="button" class="card__button">
                    <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                  </button>
                </div>
                `;

    card.insertAdjacentHTML('afterbegin', cardHtml);

  }

  onClick(evt, data) {
    const target = evt.target;

    if (target.closest('.card__button')) {
      this._elem.dispatchEvent(new CustomEvent('product-add', {
        detail: data.id,
        bubbles: true
      }));
    }
  }

}
