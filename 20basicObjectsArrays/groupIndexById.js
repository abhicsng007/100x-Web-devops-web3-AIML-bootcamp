// function groupIndexById(arr) {
//     let result = {};
//     for(const {id,category} of arr){
//         (result[category] ??= []).push(id);
//     }
//     return result;
// }

function groupIndexById(arr) {
    let result = new Map();
    for(const {id,category} of arr){
        (result.get(category) ?? result.set(category,[]).get(category)).push(id);
    }
    return result;
}

console.log(groupIndexById([
  { id: 1, category: "fruit" },
  { id: 2, category: "veggie" },
  { id: 3, category: "fruit" }
]
));