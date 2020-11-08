export default class StepSlider {
  constructor({steps, value = 0}) {
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');

    this.render({steps, value});

    this.elem.addEventListener('click', (evt) => this.onClick(evt, steps));
  }

  render(data) {
    const {steps, value} = data;

    let segments = steps - 1;
    let valuePercents = value / segments * 100;

    let sliderSteps = document.createElement('div');
    sliderSteps.classList.add('slider__steps');

    let stepStr = [];

    for (let i = 0; i < steps; i++) {
      let step = document.createElement('span');

      if (value === i) {
        step.classList.add('slider__step-active');
      }

      stepStr.push(step);
    }

    let setpsHtml = stepStr.map(item => {
      return item.outerHTML;
    }).join('');

    let sliderBody = `
        <div class="slider__thumb" style="left: ${valuePercents}%;">
          <span class="slider__value">${value}</span>
        </div>
         <div class="slider__progress" style="width: ${valuePercents}%;"></div>
    `;

    sliderSteps.insertAdjacentHTML('afterbegin', setpsHtml);
    this.elem.insertAdjacentElement('beforeend', sliderSteps);
    this.elem.insertAdjacentHTML('afterbegin', sliderBody);
  }

  onClick(evt, steps) {
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let sliderValue = this.elem.querySelector('.slider__value');

    let allSteps = [...this.elem.querySelector('.slider__steps').children];

    let left = evt.clientX - this.elem.getBoundingClientRect().left;

    let leftRelative = left / this.elem.offsetWidth;

    let segments = steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);

    allSteps.forEach((item, index) => {
      item.classList.remove('slider__step-active');

      if (index === value) {
        item.classList.add('slider__step-active');
      }
    });

    sliderValue.textContent = value;

    let valuePercents = value / segments * 100;

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: value,
        bubbles: true
      }));
  }
}
