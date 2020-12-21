import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) {
    let hasCartItem = this.cartItems.find(item => item.product.id === product.id);

    if (!hasCartItem) {
      this.cartItem = {
        product,
        count: 1
      };

      this.cartItems.push(this.cartItem);
      this.onProductUpdate(this.cartItem);
    }

    if (hasCartItem) {
      let cartItem = this.cartItems.find(item => item.product.id === product.id);
      cartItem.count = cartItem.count + 1;
      this.onProductUpdate(cartItem);
    }
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id === productId);
    cartItem.count += amount;

    if (cartItem.count === 0) {
      let cartIndex = this.cartItems.findIndex(item => item.product.id === productId);
      this.cartItems.splice(cartIndex, 1);
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0 ? true : false
  }

  getTotalCount() {
    return this.cartItems.reduce((acc, currentItem) => {
      return acc + currentItem.count;
    }, 0)
  }

  getTotalPrice() {
    return this.cartItems.reduce((acc, currentItem) => {
      return acc + currentItem.product.price * currentItem.count;
    }, 0)
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modalBody = document.createElement('div');

    this.cartItems.forEach(item => {
      modalBody.append(this.renderProduct(item.product, item.count));
    });

    modalBody.append(this.renderOrderForm());

    this.modal = new Modal();
    this.modal.setTitle('Your order');
    this.modal.setBody(modalBody);
    this.modal.open();

    this.modalBody = document.querySelector('.modal__body');
    this.modalBody.addEventListener('click', (evt) => this.countProduct(evt));

    this.formOrder = this.modalBody.querySelector('.cart-form');
    this.formOrder.addEventListener('submit', (evt) => this.onSubmit(evt));

  }

  onProductUpdate(cartItem) {
    if (document.body.className === 'is-modal-open') {
      let modalBody = document.querySelector('.modal__body');
      let productId = cartItem.product.id;
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      productCount.textContent = cartItem.count;
      productPrice.textContent = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

      if (cartItem.count === 0) {
        this.modalBody.querySelector(`[data-product-id='${cartItem.product.id}']`).remove();
      }

      if (this.isEmpty()) this.modal.close();
    }

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();

    let buttonSubmit = this.modal.elem.querySelector('[type="submit"]');
    buttonSubmit.classList.add('is-loading');

    (async () => {
      try {
        let response = await fetch('https://httpbin.org/post', {
          method: 'POST',
          body: new FormData(this.formOrder)
        });

        if (response.status === 200) {
          this.modal.setTitle('Success!');
          this.cartItems = [];
          this.cartIcon.update(this);

          this.modalBody.innerHTML = `
            <div class="modal__body-inner">
              <p>
                Order successful! Your order is being cooked :) <br>
                We’ll notify you about delivery time shortly.<br>
                <img src="/assets/images/delivery.gif">
              </p>
            </div>
          `;
        }
      } catch (e) {
        console.error('Ошибка отправки формы');
      }
    })();

  };

  countProduct = (evt) => {
    let button = evt.target.closest('.cart-counter__button');

    if (!button) {
      return
    }

    let cartProduct = button.closest('.cart-product');

    let productId = cartProduct.dataset.productId;
    let productAmount = button.classList.contains('cart-counter__button_minus') ? -1 : 1;

    this.updateProductCount(productId, productAmount);
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}


