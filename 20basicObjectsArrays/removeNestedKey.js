function removeNestedKey(obj,removeKey) {
    if(Array.isArray(obj)){
        obj.forEach(item => removeNestedKey(item,removeKey));
    }
    else if(obj !== "null" || typeof obj !== "object"){
        if(removeKey in obj){
            delete obj[removeKey];
        }
        else{
            Object.values(obj).forEach(value => removeNestedKey(value,removeKey));
        }
    }
    return obj;
}

console.log(removeNestedKey({ a: { b: { c: 1, d: 2 } } }, "c"));