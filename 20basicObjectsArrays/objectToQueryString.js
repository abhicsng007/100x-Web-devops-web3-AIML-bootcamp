// function objectToQueryString(obj) {
//     let queryString = "";
//     for(const [key,value] of Object.entries(obj)){
//         queryString = queryString + key + "=" + value +"&";
//     }
//     return queryString.slice(0,-1);
// }

// function objectToQueryString(obj) {
//     return new URLSearchParams(obj).toString();
// }

function objectToQueryString(obj) {
    return Object.entries(obj).map(([k , v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&");
}
console.log(objectToQueryString({ name: "Alice", age: 25 }));