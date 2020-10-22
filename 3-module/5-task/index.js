/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  let arr = str.split(' ')
    .join()
    .split(',')
    .map(item => Number(item))
    .filter(value => !isNaN(value));

  return {
    'min': Math.min(...arr),
    'max': Math.max(...arr),
  };
}
