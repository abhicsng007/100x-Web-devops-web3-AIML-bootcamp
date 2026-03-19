// Problem Description – Request Batcher
//
// You are required to implement a batcher that groups multiple requests
// within a short time window into a single bulk request.
//
// Requirements:
// 1. Requests added within the batch window must be sent together
// 2. Each caller must receive only its own result
// 3. Only one network call should be made per batch window

function createBatcher(fetchBulk, delayMs = 50) {
    let queue = [];
    let timer = null;

    return function batcher(key){
        return new Promise((resolve,reject) => {
            queue.push({key,resolve,reject});

            if(!timer){
                timer = setTimeout(async ()=> {
                    const currentBatch = queue;
                    queue = [];
                    timer = null;

                    try {
                        const keys = currentBatch.map(item => item.key);
                        const results =  await fetchBulk(keys);

                        currentBatch.forEach((item) => {
                            item.resolve(results[item.key]);
                        })
                    } catch (error) {
                        currentBatch.forEach((item) => {
                            item.reject(error);
                        })
                    }
                },delayMs);
            }
        })
    }
}

module.exports = createBatcher;
