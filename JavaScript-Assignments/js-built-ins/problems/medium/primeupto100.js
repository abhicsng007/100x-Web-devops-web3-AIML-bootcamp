/*
  Write a function `getPrimesUpTo100` which returns an array of all prime numbers up to 100.

  What is a prime number?
  - A prime number is a number greater than 1 that has no divisors other than 1 and itself.

  Example:
  - Output: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]

  - Input: There is no input, the function returns an array of primes.

  - Input: N/A

  Once you've implemented the logic, test your code by running
  - `npm run test-prime`
*/

// function getPrimesUpTo100() {
//   const Output = [];
//   for(let i = 2;i<=100;i++){
//     if(isPrime(i)){
//       Output.push(i);
//     }
//   }
//   return Output;
// }

// function isPrime(n){
//   if(n<2) return false;
//   if(n === 2) return true;
//   for(let i=2; i*i<=n ;i++){
//     if(n%i === 0)
//     {
//       return false;
//     }
//   }
//   return true;
// }
function getPrimesUpTo100(){
  const isPrime = new Array(101).fill(true);
  isPrime[0] = isPrime[1] = false;
  const prime = [];
  for(let i=2;i*i <= 100;i++){
    if(isPrime[i]){
      for(let j=i*i; j <= 100 ; j += i){
        isPrime[j] = false;
      }
    }
  }
  for(let i = 2;i<=100;i++){
    if(isPrime[i]){
      prime.push(i);
    }
  }
  return prime;

}



module.exports = { getPrimesUpTo100 };
