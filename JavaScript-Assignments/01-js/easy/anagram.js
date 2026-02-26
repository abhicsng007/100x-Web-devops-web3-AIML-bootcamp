/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.

  Once you've implemented the logic, test your code by running
  - `npm run test-anagram`
*/
function isAnagram(str1, str2) {
  if(str1.length !== str2.length){
    return false;
  }
  const freq = {};
  for(const char of str1.toLowerCase()){
    freq[char] = (freq[char] ?? 0) + 1;
  }
  for(const char of str2.toLowerCase()){
    if(!freq[char]) return false;
    freq[char]--;
  }
 return true;
}

module.exports = isAnagram;