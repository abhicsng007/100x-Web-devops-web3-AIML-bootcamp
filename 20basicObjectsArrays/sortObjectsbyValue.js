function sortObjectsbyValue(obj) {
    return Object.entries(obj).sort(([,a],[,b]) => a-b);
}

console.log(sortObjectsbyValue({ a: 3, b: 1, c: 2 }));