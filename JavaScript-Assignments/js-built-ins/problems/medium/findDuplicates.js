/*
  Write a function `findDuplicates` which takes an array as input and returns an array containing all the duplicate elements.

  What are duplicates?
  - Elements that appear more than once in the array are considered duplicates.

  Example:
  - Input: [10, 20, 30, 10, 40]
  - Output: [10]

  - Input: [1, 2, 3, 4, 5]
  - Output: []

  - Input: []
  - Output: []

  Once you've implemented the logic, test your code by running
  - `npm run test-duplicates`
*/


function findDuplicates(arr) {
 const seen = new Set();
 const duplicate = new Set();
 for(const val of arr){
  if(seen.has(val)){
    if(!duplicate.has(val)){
      duplicate.add(val);
    }
  }
  else {
      seen.add(val);
    }
 }
 return [...duplicate];
}

module.exports = findDuplicates;

