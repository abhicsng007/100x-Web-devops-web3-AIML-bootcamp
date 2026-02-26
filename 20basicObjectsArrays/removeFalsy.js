// function removefalsy(obj) {
//     for(const [key, value] of Object.entries(obj)){
//         if(!value){
//             delete obj[key];
//         }
//     }
//     return obj;   
// }

function removefalsy(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([_,v]) => Boolean(v)));
}


console.log(removefalsy({ a: 0, b: null, c: "hello", d: undefined, e: 5 }));