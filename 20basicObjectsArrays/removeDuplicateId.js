// function removeDuplicateId(arr) {
//     let result = [];
//     let isSet = new Set();
//     for(const obj of arr){
//         if(!isSet.has(obj.id)) {
//             result.push(obj);
//             isSet.add(obj.id);
    
//         }
//     }
//     return result;
// }

function removeDuplicateId(arr) {
    return [...new Map(arr.map(item => [item.id , item])).values()];
}

console.log(removeDuplicateId([
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 1, name: "A" }
]
));