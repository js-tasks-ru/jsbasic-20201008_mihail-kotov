/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {

  const rows = table.rows;


  for (let i = 0; i < rows.length; i++) {
    let cell = rows[i].cells;

    for (let j = 0; j < cell.length; j++) {


      if (cell[j].hasAttribute('data-available') === false && cell[j].parentElement.parentElement.tagName !== 'THEAD') {
        cell[j].parentElement.hidden = true;
      } else {
        cell[j].parentElement.hidden = false;
      }

      if (cell[j].dataset.available === 'true') {
        cell[j].parentElement.classList.add('available');
        cell[j].parentElement.classList.remove('unavailable');

      } else if (cell[j].dataset.available === 'false') {
        cell[j].parentElement.classList.remove('available');
        cell[j].parentElement.classList.add('unavailable');
      }

      if (cell[j].innerText === 'm') {
        cell[j].parentElement.classList.add('male');
        cell[j].parentElement.classList.remove('female');
      } else if (cell[j].innerText === 'f') {
        cell[j].parentElement.classList.add('female');
        cell[j].parentElement.classList.remove('male');
      }



      if (!isNaN(+cell[j].innerText) && (+cell[j].innerText < 18)) {

        cell[j].parentElement.style.textDecoration = 'line-through';

      }
    }
  }

}
