/**
 * @param {number[]} arr
 * @param {number} a
 * @param {number} b
 * @returns {number[]}
 */
function filterRange(arr, a, b) {
  let newArr = [...arr];

  return newArr.filter(item => (a >= item || item <= b));
}
