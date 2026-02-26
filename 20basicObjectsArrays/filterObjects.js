function filterObjects(obj) {
    // for( const [key,value] of Object.entries(obj)){
    //     if(value < 50)
    //         delete obj[key];
    // }
    // console.log(obj)

    return Object.fromEntries(Object.entries(obj).filter(([k,v]) => v > 50));
}

console.log(filterObjects({ a: 20, b: 60, c: 40, d: 90 }));