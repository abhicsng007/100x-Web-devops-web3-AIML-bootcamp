// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```
const fs = require("fs");

function cleanFile(filepath){
    fs.readFile(filepath,"utf-8",(err,data) => {
        if(err){
            console.log("error while reading file",err);
            return;
        }
        const cleaned = data.replace(/\s+/g," ").trim();

        fs.writeFile(filepath,cleaned,"utf-8",(err) =>{
            if(err){
                console.log("error writing to file",err);
                return;
            }

            console.log("file written successfully");

        })

    });
}

cleanFile("test.txt");