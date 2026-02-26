// function largestValueKey(obj) { 
//     let largest = -Infinity;
//     let largestKey = "";
//     for(const [key,value] of Object.entries(obj)){
//         if(value > largest){
//             largest = value;
//             largestKey = key
//         }
//     }
//     console.log(largestKey);
// }

function largestValueKey(obj){
    return Object.entries(obj).reduce((best,[k,v]) => v > best[1] ? [k,v] : best,["",-Infinity])[0];
}
console.log(largestValueKey({ a: 10, b: 50, c: 90 }));