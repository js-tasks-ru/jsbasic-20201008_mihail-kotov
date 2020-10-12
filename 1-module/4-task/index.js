/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {     
  return (~str.indexOf('1XbeT') || ~str.toUpperCase().indexOf('XXX')) ? true : false;  
}
