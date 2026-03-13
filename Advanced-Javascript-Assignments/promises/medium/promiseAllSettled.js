// Problem Description – Polyfill for Promise.allSettled

// You are required to implement a polyfill for Promise.allSettled. 
// The function should accept an array of Promises and wait for all of them to either resolve or reject.
// It must return a Promise that resolves with an array of result objects describing the status and value or reason of each Promise.
function promiseAllSettled(promises) {
    return new Promise((resolve) => {
        const results = new Array(promises.length);
        let completed = 0;

        if(promises.length === 0){
            resolve([]);
            return;
        }

        promises.forEach((p,index) => {
            Promise.resolve(p)
                   .then((value) => {
                    results[index] = {status: "fulfilled" , value};
                   })
                   .catch((reason) => {
                    results[index] = {status: "rejected" , reason};
                   })
                   .finally(() => {
                    completed++;
                    if(completed === results.length){
                        resolve(results);
                    }
                   })
        });
    })
}

module.exports = promiseAllSettled;

