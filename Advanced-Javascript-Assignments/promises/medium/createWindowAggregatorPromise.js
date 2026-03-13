
// Problem Description – Sliding Window Aggregator
//
// You are required to implement createWindowAggregator(batchProcessFn, size, windowMs).
//
// The aggregator collects items into a batch and processes them together.
//
// It must provide add(item):
// 1. Add item to the current batch
// 2. If batch size reaches size, immediately call batchProcessFn(batch)
// 3. If windowMs expires before reaching size, call batchProcessFn with the partial batch
// 4. After processing, reset the batch and start a new window

function createWindowAggregatorPromise(batchProcessFn, size, windowMs) {
    let buffer = [];
    let timer = null;

    async function flush(){
        if(buffer.length === 0) return;

        const batch = buffer;
        buffer = [];

        if(timer){
            clearTimeout(timer);
            timer = null;
        }
        await batchProcessFn(batch);
    }

    function add(item){
        buffer.push(item);

        if(buffer.length >= size){
            flush();
            return;
        }

        if(!timer){
            timer = setTimeout(() => {
                flush();
            },windowMs);
        }
    }
    return { add };
 }

module.exports = createWindowAggregatorPromise;
