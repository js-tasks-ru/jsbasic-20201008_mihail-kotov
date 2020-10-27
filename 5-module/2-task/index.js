function toggleText() {
  let btn = document.querySelector('.toggle-text-button');
  let text = document.querySelector('#text');

  btn.addEventListener('click', (evt) => {
    text.hasAttribute('hidden') ? text.hidden = false : text.hidden = true;
  });
}
