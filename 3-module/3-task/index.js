/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {

  if (str === '') {
    return '';
  }

  let strToArr = str.split('');
  let newArr = [];

  for (let i = 0; i < strToArr.length; i++) {

    if (strToArr[i] === '-') {
      let upLetter = strToArr[i + 1].toUpperCase();
      newArr.push(upLetter);
      i++;
      continue;
    }
    newArr.push(strToArr[i]);
  }

  return newArr.join('')

}
