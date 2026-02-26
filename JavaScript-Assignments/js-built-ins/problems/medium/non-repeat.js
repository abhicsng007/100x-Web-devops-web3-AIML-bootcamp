/*
  Write a function `nonrepeat` which takes a string as input and returns the first non-repeating character in the string.

  What is a non-repeating character?
  - A character that appears only once in the entire string.

  Example:
  - Input: "abcab"
  - Output: "c"

  - Input: "aabbcc"
  - Output: null

  - Input: "abcdef"
  - Output: "a"

  - Input: ""
  - Output: null

  Once you've implemented the logic, test your code by running
  - `npm run test-nonrepeat`
*/
// function nonrepeat(str) {
//   if(str === "") return null;
//   const count = {};
//   for(const char of str){
//     count[char] = (count[char] ?? 0) + 1;
//   }
//   for(const char of str){
//     if(count[char] === 1){
//       return char;
//     }
//   }
//   return null;
// }

function nonrepeat(str) {
  if(str === "") return null;
  const count = new Map();
  for(const char of str){
    count.set(char,(count.get(char) ?? 0) + 1);
  }
  for(const char of str){
    if(count.get(char) === 1){
      return char;
    }
  }
  return null;
}
module.exports = nonrepeat;
