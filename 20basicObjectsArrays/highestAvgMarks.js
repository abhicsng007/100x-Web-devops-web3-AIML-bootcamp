function highestAvgMarks(obj){
    let highest = -Infinity;
    let highestkey = "";
    for(const [key, value] of Object.entries(obj)){
        const avgValue = avg(value);
        if( avgValue > highest){
            highest = avgValue;
            highestkey = key;
        }
    }
    return highestkey;
}

function avg(arr){
   return arr.reduce((acc,sum) => acc+sum,0)/arr.length ;
}

console.log(highestAvgMarks({ A: [80, 90], B: [70, 75, 85] }));
