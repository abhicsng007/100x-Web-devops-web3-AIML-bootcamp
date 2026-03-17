// Problem Description – Concurrency-Limited Task Executor

// You are given an array of asynchronous tasks and a number maxConcurrent. 
// Your task is to execute the tasks while ensuring that no more than maxConcurrent tasks run at the same time. 
// As soon as one task completes, the next pending task should start. 
// The final output must preserve the original task order.
async function taskScheduler(tasks, maxConcurrent) {
    const results = new Array(tasks.length);
    let nextIndex = 0;

    async function worker(){
        while( nextIndex < tasks.length){
            const currentIndex = nextIndex++;
            const result = await tasks[currentIndex]();
            results[currentIndex] = result;
        }
    }

    const workers = [];

    for(let i =0; i < maxConcurrent ;i++){
        workers.push(worker());
    }

    await Promise.all(workers);
    return results;
}

module.exports = taskScheduler;
