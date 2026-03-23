
// Problem Description – Sliding Window Rate Limited Collector
//
// You are required to implement createThrottledCollector(batchFn, batchSize, msLimit).
//
// The collector receives high-frequency data and processes it in batches.
//
// Requirements:
// 1. Collect incoming items into batches of size batchSize
// 2. Process each batch using batchFn(batch)
// 3. Enforce rate limiting: no more than 2 batches per second (msLimit based)
// 4. add(item) must return a Promise that resolves with the result of the batch
//    that item was processed in
//

function createThrottledCollector(batchFn, batchSize, msLimit) { 
    let queue = [];
    let resolvers = [];
    
    let lastProcessedTime = 0;
    let isProcessing = false;

    async function processBatch(){
        if(isProcessing || queue.length === 0) return;

        const now = Date.now();
        const waitTime = Math.max(0,msLimit - (now - lastProcessedTime));

        if(waitTime > 0){
            setTimeout(processBatch,waitTime);
            return;
        }

        isProcessing = true;

        const batch = queue.splice(0,batchSize);
        const batchResolvers = resolvers.splice(0,batchSize);

        try {
            const result = await batchFn(batch);

            batchResolvers.forEach((resolve) => resolve(result));
        } catch (error) {
            batchResolvers.forEach((resolve) => resolve(Promise.reject(error)));
        }

        lastProcessedTime = Date.now();
        isProcessing = false;

        if(queue.length > 0){
            processBatch();
        }
    }

    return {
        add(item) {
            return new Promise((resolve) => {
                queue.push(item);
                resolvers.push(resolve);

                if(queue.length >= batchSize){
                    processBatch();
                }
            });
        },
    };
}

module.exports = createThrottledCollector;
