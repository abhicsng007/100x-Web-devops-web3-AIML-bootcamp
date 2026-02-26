function sortByTwoValues(arr){
    arr.sort((a,b) => {
        return a.name.localeCompare(b.name) || a.age - b.age;
    })

    return arr;
}

console.log(sortByTwoValues([
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Alice", age: 22 }
]
));