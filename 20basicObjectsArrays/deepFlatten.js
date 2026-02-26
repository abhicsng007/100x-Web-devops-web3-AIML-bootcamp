function deepFlatten(obj){
    if(Array.isArray(obj)){
        return obj.flat(Infinity);
    }
    if(obj && typeof obj === "object"){
        let result = {};
        for(const [key,value] of Object.entries(obj)){
            result[key] = deepFlatten(value);
        }
        return result;
    }
    
}

console.log(deepFlatten({ a: [1, [2, [3]]], b: [4, [5]] }));