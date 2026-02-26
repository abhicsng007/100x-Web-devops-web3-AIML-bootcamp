// function pickGivenKeys(obj,keys){
//     let newObj = {};
//     for(const[key,value] of Object.entries(obj)){
//         for(k of keys){
//             if(k === key){
//                 newObj[key] = value;
//             }
//         }
//     }
//     return newObj;
// }

function pickGivenKeys(obj,keys){
    let keysSet = new Set(keys);
    let result = {};
    for(const[key,value] of Object.entries(obj)){
        if(keysSet.has(key)){
            result[key] = value
        }
    }
    return result;
}


console.log(pickGivenKeys({ name: "Rahul", age: 23, city: "Noida" }, ["name","city"]));