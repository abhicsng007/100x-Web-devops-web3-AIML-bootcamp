// function swapKeyValues(obj){
//     let temp = "";
//     for(let [key,value] of Object.entries(obj)){
//         temp = key;
//         obj[key] = value;
//         obj[value] = temp
//         delete obj[temp];
//     }

//     console.log(obj);
// }

function swapKeyValues(obj){
    const swapped = Object.fromEntries(
                        Object.entries(obj).map(([k , v]) => [v,k] )
                        );
    console.log(swapped);
}

swapKeyValues({ a: "x", b: "y", c: "z" })