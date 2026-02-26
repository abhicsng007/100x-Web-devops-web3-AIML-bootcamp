// function flattenObjectArrays (obj) {
//     let arr = []
//     for (const value of Object.values(obj)) {
//     //    arr = [...arr,...value];
//           arr.push(...value);
//     }
//     console.log(arr);
// }

function flattenObjectArrays (obj) {
    // return Object.values(obj).reduce((arr,val) => arr.concat(...val),[]);
    // return Object.values(obj).reduce((arr,val) => {
    //     arr.push(...val);
    //     return arr;
    // },[]);
    return Object.values(obj).flat();
}

console.log(flattenObjectArrays({ fruits: ["apple", "banana"], veggies: ["carrot", "pea"] }));