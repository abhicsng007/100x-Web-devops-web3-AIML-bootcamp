// ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

// (Hint: setTimeout)

let counter = 0;
let stopCount = 5;
let timeoutId;


const updateCounter = () => {
  console.log(counter);
  if(counter < stopCount){
    
    counter++;
    timeoutId = setTimeout(updateCounter, 1000);
  }
  else {
    console.log("count finished");
  }
  
};

updateCounter();