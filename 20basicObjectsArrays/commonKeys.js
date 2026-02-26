// function commonKeys(obj1, obj2) {
//     const set2 = new Set(Object.entries(obj2).flat());
//     const result = [];
//     for(const k of Object.keys(obj1)){
//         if(set2.has(k)){
//             result.push(k);
//         }
//     }
//     return result;
// }

// function commonKeys(obj1, obj2) {
//     const result = [];
//     for(const k of Object.keys(obj1)){
//         if(k in obj2){
//             result.push(k);
//         }
//     }
//     return result;
// }

function commonKeys(obj1, obj2) {
    return Object.keys(obj1).filter( k => k in obj2);
}

console.log(commonKeys({ a: 1, b: 2, c: 3 }, { b: 4, c: 5, d: 6 }));