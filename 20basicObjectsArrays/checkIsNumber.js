// function checkIsNumber(obj) {
//     for(const value of Object.values(obj)){
//         if(typeof value !== "number"){
//             return false;
//         }
//     }
//     return true;
// }

function checkIsNumber(obj) {
    return Object.entries(obj).every(v => typeof v === "number");
}

console.log(checkIsNumber({ a: 1, b: "hello", c: 3 }));