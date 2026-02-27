// Problem Description – Ordered Parallel Batcher
//
// You need to process many items in parallel, but with a fixed
// concurrency limit to avoid resource exhaustion.
//
// Tasks should start as soon as a slot is free, and the final
// results must preserve the original input order.
//
// Requirements:
// - Run at most `limit` workers in parallel.
// - Preserve the original order of results.
// - Start new work as soon as one finishes.
// - Stop and return an error if any task fails.

function batchProcess(items, limit, worker, onComplete) {
    if(items.length === 0) return onComplete(null, []);

    const results = new Array(items.length);
    let inflight = 0;
    let completed = 0;
    let stopped = false;
    let index = 0;

    function launchNext(){
        if(stopped) return;

        while(inflight < limit && index < items.length){
            
            const currentIndex  = index++;
            inflight++;

            worker(items[currentIndex] , (err,result) => {
                inflight--;

                if(stopped) return;

                if(err){
                    stopped = true;
                    return onComplete(err,null);
                }

                results[currentIndex] = result;
                completed++;

                if(completed === items.length){
                    return onComplete(null,results);
                }

                launchNext();
            });
        }
       
    }
     launchNext();


}

module.exports = batchProcess;
