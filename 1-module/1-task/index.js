/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */

function factorial(n) {
  if (n === 1 || n === 0) {
    return 1;
  }

  let sum = n;  

  for (let i = 1; i < n; i++) {
    sum = sum * i    
  }
  
  return sum;
}