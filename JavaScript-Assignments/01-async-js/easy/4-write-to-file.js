// ## Write to a file

// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.
const fs = require("fs").promises;

async function writeFile(filename,data){
    try{
        await fs.writeFile(filename,data,"utf-8");
        console.log("file written");
    }
    catch(error) {
        console.log(error);
    }
}

writeFile("test.txt","Hello");