// function groupPeople(arr) {
//     const group = {};
//     for(const person of arr){
//      const {city,name} = person;
//      if(!group[city]){
//       group[city] = []
//      }
//      group[city].push(name);
//     }
//     console.log(group);
// }

// function groupPeople(arr) {
//   const group = {};
//   for(const {city,name} of arr){
//     (group[city] ??=[]).push(name);
//   }
//   console.log(group);
// }

function groupPeople(arr) {
  return arr.reduce((acc,{city,name}) => {
    (acc[city] ??= []).push(name);
    return acc;
  }
  ,{})
}

console.log(groupPeople([
  { name: "A", city: "Delhi" },
  { name: "B", city: "Mumbai" },
  { name: "C", city: "Delhi" }
]
));