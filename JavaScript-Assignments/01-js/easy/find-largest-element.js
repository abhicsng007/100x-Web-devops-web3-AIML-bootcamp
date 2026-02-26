/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
   let largest = -Infinity;
   for(const v of numbers){
    if(v > largest){
      largest = v;
    }
   }
   return largest;
}

module.exports = findLargestElement;