// function lookupById(arr) {
//     const result = {};
//     for(const obj of arr){
//         result[obj.id] = obj;
//     }
//     return result;
// }

function lookupById(arr) {
    return arr.reduce((acc,obj) => {
        acc[obj.id] = obj;
        return acc;
    }, {});
}

console.log(lookupById([{ id: 1, name: "A" }, { id: 2, name: "B" }]));