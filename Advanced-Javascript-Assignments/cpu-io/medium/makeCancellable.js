
// Problem Description – Abortable Promise Wrapper

// You are required to wrap a Promise so that it can be cancelled using an AbortSignal.
// If the signal is aborted before the Promise settles, the wrapper should immediately reject with an appropriate error. 
// If not aborted, it should resolve or reject normally.

function makeCancellable(promise, signal) {
    if(signal.aborted){
        return Promise.reject(new Error("Aborted"));
    }

    const abortPromise = new Promise((_,reject) => {
        signal.addEventListener("abort",() => {
            reject(new Error("Aborted"))
            }
        )
    });

    return Promise.race([promise,abortPromise]);
}

module.exports = makeCancellable;
