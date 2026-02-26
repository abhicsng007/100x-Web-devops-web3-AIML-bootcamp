// function reconcileList(arr1, arr2){
//     const set1 = new Set(arr1);
//     const set2 = new Set(arr2);
//     const result = {missing:[],extra:[]};
//     for(const value of set1){
//         if(!set2.has(value)){
//             result.missing.push(value);
//         }
//     }

//     for(const value of set2){
//         if(!set1.has(value)){
//             result.extra.push(value);
//         }
//     }

//     return result;

// }

function reconcileList(arr1, arr2){
    const count = {};
    const result = {missing:[],extra:[]};
    for(const key of arr1){
        count[key] = (count[key] ?? 0) + 1;
    }
    console.log(count);
    for(const key of arr2){
        if(count[key]){
            count[key]--;
        }
        else {
            result.extra.push(key);
        }
        
    }
       console.log(count);
    for(const key of arr1){
       while(count[key] > 0){
        result.missing.push(key);
        count[key]--;
       }
    }
    return result;
}
console.log(reconcileList(["a","b","c","c","a"]
,["b","c","d","d"]));