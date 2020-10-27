function hideSelf() {
  let btn = document.querySelector('.hide-self-button');

  btn.addEventListener('click', (evt) => {
    evt.target.hidden = true;
  });
}
