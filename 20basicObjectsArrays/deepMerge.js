function deepMerge(obj1, obj2) {
    const result = {...obj1};
    for(const key in obj2){
        if(key in result && typeof result[key] === "object"
            && typeof obj2[key] === "object" && result[key] !== null
            && obj2[key] !== null && !Array.isArray(result[key]) && 
            !Array.isArray(obj2[key])
        ){
            result[key] = deepMerge(obj1[key] , obj2[key]);
        }
        else {
            result[key] = obj2[key];
        }
    }
    return result;
}

console.log(deepMerge({ a: { x: 1, y: 2 } },{ a: { y: 3, z: 4 } }));