function deepEquality(a, b) {
   if(a === b) return true;

   if(a === null || b === null || typeof a !== "object" || typeof b !== "object"){
    return false;
   }

   if(Array.isArray(a) !== Array.isArray(b)) return false;

   let keysA = Object.keys(a);
   let keysB = Object.keys(b);

   if(keysA.length !== keysB.length) return false;

   for(const key of keysA){

       if(!keysB.includes(key)) return false;
       
       if(!deepEquality(a[key],b[key])) return false;
   }

   return true;
}

console.log(deepEquality({ a: { x: 1, y: 2 } }, { a: { x: 1, y: 2 } }));