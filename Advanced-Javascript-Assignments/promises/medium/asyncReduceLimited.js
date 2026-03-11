// Problem Description – Parallel Chunked Async Reducer

// You are required to process an array using a reducer function where the reduction happens in sequence, but the data fetching or processing for items is performed in parallel chunks. 
// Each chunk should be processed concurrently, then reduced before moving to the next chunk. 
// The final reduced result must be correct and deterministic.
async function asyncReduceLimited(array, limit, asyncProcessFn, reducer, initialValue) {
    let accumulator = initialValue;

    for(let i =0; i < array.length ; i += limit){
        const chunks = array.slice(i,i+limit);

        const processedChunk = await Promise.all(
            chunks.map((item,index) => asyncProcessFn(item,i+index))
        );

        for(const value of processedChunk){
            accumulator = reducer(accumulator,value);
        }
    }
    return accumulator;
}



module.exports = asyncReduceLimited;
