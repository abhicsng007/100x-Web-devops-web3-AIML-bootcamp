// function countEvenOdd(arr){
//     let count = {even: 0, odd: 0};
//     for(const k of arr){
//         if(k%2 === 0){
//             count.even += 1;
//         }
//         else {
//             count.odd += 1;
//         }
//     }
//     return count;
// }

function countEvenOdd(arr){
    return arr.reduce((acc,n) => {
        n%2 === 0 ? acc.even++ : acc.odd++ ;
        return acc;
    } ,{even: 0, odd: 0});
}

console.log(countEvenOdd([1,2,3,4,5,6]));