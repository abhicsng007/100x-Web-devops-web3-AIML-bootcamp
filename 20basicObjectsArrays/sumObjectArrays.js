function sumObjectArrays(Obj) {

    for(const [key,value] of Object.entries(Obj)) {
        let sum = 0;
        for(let i=0;i< value.length;i++){
            sum += value[i];
        }
        Obj[key] = sum;

    }
    console.log(Obj);

}

sumObjectArrays({ food: [10, 20, 30], travel: [5, 15], bills: [40, 60] });