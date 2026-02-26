// function capitalizeString(obj) {
//     for (let [key,value] of Object.entries(obj)){
//         obj[key] = value.charAt(0).toUpperCase() + value.slice(1);
    
//     }
//     return obj;
// }

function capitalizeString(obj) {
    return Object.fromEntries(Object.entries(obj).map(([k,v]) => [k,
        typeof v === "string" && v ? v[0].toUpperCase() + v.slice(1) : v
    ]));
}

console.log(capitalizeString({ name: "alice", city: "delhi" }));