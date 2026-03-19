
// Problem Description – Non-Blocking Heavy Reducer (Chunked Async Reduce)
//
// You are given a very large array of numbers and a hash function.
// Your task is to implement chunkedAsyncReduce(data, hashFn, chunkSize).
//
// The function must process the array in chunks of size chunkSize to avoid blocking
// the event loop.
//
// Requirements:
// 1. Compute the final reduced/hash result across all elements
// 2. Break computation into chunks and yield between chunks
// 3. Return a single Promise that resolves with the final result
// 4. Use setImmediate or MessageChannel for yielding (not setTimeout)
//

function yieldToEventLoop(){
    return new Promise(resolve => setImmediate(resolve));
}
async function chunkedAsyncReduce(data, hashFn, chunkSize) { 
    let index = 0;
    let result = undefined;

    while(index < data.length){
        const end = Math.min(index+chunkSize,data.length);

        for(let i = index; i < end; i++ ){
            if(result === undefined){
                result = data[i];
            }
            else {
                result = hashFn(result,data[i]);
            }
        }
        index = end;
        if(index < data.length){
                await yieldToEventLoop();
            }
    }
    return result;

}

module.exports = chunkedAsyncReduce;
