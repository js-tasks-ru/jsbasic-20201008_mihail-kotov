/**
 * ucFirst
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {
  if(str === '') {
    return '';
  } 

  if(str.length === 1) {
    return str.toUpperCase()
  }

  let firstSymbol = str.slice(0, 1).toUpperCase();
  let otherChar = str.slice(1);

  return firstSymbol + otherChar 
}

