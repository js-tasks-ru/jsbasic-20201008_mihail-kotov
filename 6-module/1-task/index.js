/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */

export default class UserTable {

  elem = document.createElement('table');

  constructor(rows) {
    this.rows = rows;

    this.render(rows)

    this.elem.addEventListener('click', (evt) => this.onClick(evt));
  }

  render(data) {

    const table = this.elem;
    const thead = document.createElement('thead');

    thead.innerHTML = `
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      `;

    const list = data.map(({ name, age, salary, city }) => {
      return `
        <tr>
          <td>${name}</td>
          <td>${age}</td>
          <td>${salary}</td>
          <td>${city}</td>
          <td><button>X</button></td>
        </tr>`}).join('')

    table.innerHTML = `<tbody>${list}</tbody>`;
    table.insertAdjacentElement('afterbegin', thead);
  }

  onClick(evt) {
    const target = evt.target;

    if (target.tagName === ('BUTTON')) {
      target.closest('tr').remove()
    }
  }

}
