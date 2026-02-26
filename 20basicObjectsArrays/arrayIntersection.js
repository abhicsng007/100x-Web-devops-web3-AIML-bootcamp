// function arrayIntersection(obj) {
//    let array = Object.values(obj);
//    if(array.length === 0) return [];

//    const base = array[0];
//    let result = [];

//    for(let i = 0;i<base.length;i++){
//       let val = base[i];
//       let foundAll = true;
//       for(let j=1;j<array.length;j++){
//          if(!array[j].includes(val)){
//             foundAll = false;
//          }
//       }
//       if(foundAll){
//          result.push(val);
//       }
//    }
//    return result;
// }

// function arrayIntersection(obj) {
//    const arrays = Object.values(obj);
//    return arrays.reduce((common,arr) => common.filter(x => arr.includes(x)));
// }


function arrayIntersection(obj) {
   const arrays = Object.values(obj);
   const sets = arrays.map(a => new Set(a));
   return [...sets[0]].filter(v => sets.every(s => s.has(v)));
}


console.log(arrayIntersection({ a: [1,2,3], b: [2,3,4], c: [3,4,5] }));