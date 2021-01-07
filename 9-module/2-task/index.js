import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });

    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);

    this.addEventListener();
  }

  async render() {
    let carouselHolder = document.querySelector('[data-carousel-holder]');
    let ribbonHolder = document.querySelector('[data-ribbon-holder]');
    let sliderHolder = document.querySelector('[data-slider-holder]');
    let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    let productsGridHolder = document.querySelector('[data-products-grid-holder]');

    let response = await fetch('products.json');
    this.products = await response.json();

    this.productsGrid = new ProductsGrid(this.products);

    carouselHolder.appendChild(this.carousel.elem);
    ribbonHolder.appendChild(this.ribbonMenu.elem);
    sliderHolder.appendChild(this.stepSlider._elem);
    cartIconHolder.appendChild(this.cartIcon.elem);


    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    productsGridHolder.appendChild(this.productsGrid.elem);


  }

  addEventListener() {
    document.body.addEventListener('product-add', (event) => {
      let currentProduct = event.detail;

      let result = this.products.find((item) =>
        (item.id === currentProduct)
      );

      if (!result) {
        return;
      }

      this.cart.addProduct(result);
    });


    document.addEventListener('slider-change', (event) => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail
      });
    });

    document.querySelector('[data-ribbon-holder]').addEventListener('ribbon-select', (event) => {
      this.productsGrid.updateFilter({
        category: event.detail
      });
    });

    document.addEventListener('change', (event) => {
      let checked = event.target.checked;
      if (event.target.id == "vegeterian-checkbox") {
        this.productsGrid.updateFilter({
          vegeterianOnly: checked
        });
      }
      if (event.target.id == "nuts-checkbox") {
        this.productsGrid.updateFilter({
          noNuts: checked
        });
      }
    });

  }
}
