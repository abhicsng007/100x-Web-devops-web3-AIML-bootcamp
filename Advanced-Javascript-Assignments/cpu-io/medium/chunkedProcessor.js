// Problem Description – Smart Progress Bar (CPU Yielding)
//
// You need to process a large list of items without blocking
// the event loop.
//
// Process the items in small chunks and yield control back
// to the event loop after each chunk so the system stays responsive.
//
// Requirements:
// - Implement chunkedProcessor(items, processFn, onComplete).
// - Process items in fixed-size chunks.
// - Yield using setImmediate after each chunk.
// - Call onComplete after all items are processed.
function chunkedProcessor(items, processFn, onComplete) {
    const CHUNK_SIZE = 10;
    let index = 0;

    function runNextChunk(){
        const end = Math.min(index+CHUNK_SIZE,items.length);

        for(;index<end; index++ ){
            processFn(items[index]);
        }

        if(index < items.length){
            setImmediate(runNextChunk);
        }
        else if(onComplete){
            onComplete();
        }
    }
    runNextChunk();
}

module.exports = chunkedProcessor;
