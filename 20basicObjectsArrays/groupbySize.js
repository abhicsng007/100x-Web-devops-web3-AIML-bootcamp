function groupbySize(obj,size) {
    const entries = Object.entries(obj);
    let arr = [];
    for(let i =0 ;i < entries.length ;i +=size){
        arr.push(entries.slice(i,i+size));
    }
    return arr;
}

console.log(groupbySize({ a: 1, b: 2, c: 3, d: 4 }, size=2));