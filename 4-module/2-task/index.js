/**
 * @param {HTMLTableElement} table
 * @return {void}
 */
function makeDiagonalRed(table) {

  let rows = table.rows;
  let counter = 0;

  for (let i = 0; i < rows.length; i++) {
    let cells = rows[i].cells;

    for (let j = 0; j < cells.length; j++) {
      console.log(cells[j]);
      cells[counter].style.backgroundColor = 'red';
    }

    counter++;

  }
}
