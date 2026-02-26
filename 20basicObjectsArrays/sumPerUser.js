// function sumPerUser(arr) {
//     let result = {};
//     for(const obj of arr){
//         if(obj.user in result ){
//             result[obj.user] += obj.amount;
//         }
//         else {
//             result[obj.user] = obj.amount;
//         }
//     }
//     return result;
// }

// function sumPerUser(arr) {
//     let result = {};
//     for(const obj of arr){
//         result[obj.user] = ( result[obj.user] ?? 0) + obj.amount;
//     }

//      return result;
// }

function sumPerUser(arr) {
    return arr.reduce((acc,obj) => {
        acc[obj.user] = (acc[obj.user] ?? 0) + obj.amount ;
        return acc;
    },{})
}


console.log(sumPerUser([
  { user: "A", amount: 100 },
  { user: "B", amount: 200 },
  { user: "A", amount: 50 }
]));