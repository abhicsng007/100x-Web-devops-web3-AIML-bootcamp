// function idToName(arr) {
//     let result = {};
//     for( const {id,name} of arr){
//         result[id] = name;
//     }
//     return result;
// }

function idToName(arr) {
    return arr.reduce((acc,{id,name}) => {
        acc[id] = name;
        return acc;
    } , {});
}

console.log(idToName([
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
]));