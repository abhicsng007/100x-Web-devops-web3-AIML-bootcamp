// function uniqueObjectArrays(obj){
//     let uniqueVal = new Set();
//     for(const value of Object.values(obj)){
//         for(const v of value)
//             uniqueVal.add(v);
//     }
//     console.log([...uniqueVal]);
    
// }

function uniqueObjectArrays(obj){
    return [...new Set(Object.values(obj).flat())];
}

console.log(uniqueObjectArrays({ x: [1,2,3], y: [2,3,4], z: [4,5] }));