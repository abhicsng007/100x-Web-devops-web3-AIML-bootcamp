// function mostRepeatWord(obj) {
//     let result = {};
//     for(const value of Object.values(obj)){
//         for(v of value){
//             result[v] = (result[v] ?? 0) + 1;
//         }
        
//     }
//     const maxEntry = Object.entries(result).reduce((max,entry) => entry[1] > max[1] ? entry :max)
//     return maxEntry[0];
// }

function mostRepeatWord(obj) {
    let result = {};
    let bestWord = "";
    let bestCount = 0;
    for(const value of Object.values(obj)){
        for(v of value){
            result[v] = (result[v] ?? 0) + 1;
            if(result[v] > bestCount){
            bestCount = result[v];
            bestWord = v;
        }
        }
        
        
    }
    return bestWord;
}

console.log(mostRepeatWord({ fruits: ["apple","apple","banana"], drinks: ["apple","tea"] }));