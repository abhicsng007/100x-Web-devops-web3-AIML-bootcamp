const fs = require("fs").promises;

async function readFile(){
    console.log("start");
    const data = await fs.readFile("file.txt","utf-8");
    console.log(`File content : ${data}`);
}

readFile();

for(let i =0 ;i <1e10;i++){};

console.log("end");