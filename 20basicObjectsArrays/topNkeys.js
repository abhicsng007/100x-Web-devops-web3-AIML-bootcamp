// function topNkeys(obj,N) {
//     const arr = Object.entries(obj).sort(([,a],[,b]) => b-a);
//     const result = [];
//     for(let i = 0;i < N;i++){
//         result.push(arr[i][0]);
//     }

//     return result;
// }

function topNkeys(obj,N) {
    return Object.entries(obj).sort(([,a],[,b]) => b-a).slice(0,N).map(([key]) => key);
    
}


console.log(topNkeys({ a: 10, b: 50, c: 30, d: 40 }, N=2));