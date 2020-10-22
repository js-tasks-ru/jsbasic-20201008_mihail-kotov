/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(users, age) {
  return users.filter(user => (user.age <= age))
    .map(user => `${user.name}, ${user.balance}\n`)
    .join('').slice(0, -1);
}
