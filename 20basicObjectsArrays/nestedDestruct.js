function nestedDestruct(obj, result =[]) {
    if(typeof obj !== "object" || obj === null){
        result.push(obj);
        return result;
    }
    
    for(const key in obj){
       nestedDestruct(obj[key],result);
    }

    return result;
}

console.log(...nestedDestruct({ user: { profile: { name: "Alice", age: 25 } } }));