function wordOccurances(arr) {
    let wordOccurances = {};
    for(let i=0;i<arr.length;i++){
        if(!(arr[i] in wordOccurances)){
            wordOccurances[arr[i]] = 1;
        }
        else {
            wordOccurances[arr[i]] += 1;
        }
    }

    console.log(wordOccurances);
    
}

wordOccurances(["apple", "banana", "apple", "orange", "banana", "apple"]);