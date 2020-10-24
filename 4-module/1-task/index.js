/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {

  let ul = document.createElement('ul');

  for (let item of friends) {
    let li = document.createElement('li');
    li.innerHTML = `${item.firstName} ${item.lastName}`;
    ul.insertAdjacentElement('afterbegin', li);
  }

  return ul;
}
