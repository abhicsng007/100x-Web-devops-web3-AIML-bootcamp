function mergeTwoObjects(obj1,obj2){
    return {...obj1,...obj2};
}

console.log(mergeTwoObjects({ a: 10, b: 20 },
{ a: 5, c: 15 }));