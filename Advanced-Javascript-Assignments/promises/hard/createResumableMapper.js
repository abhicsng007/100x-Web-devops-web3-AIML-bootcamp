
// Problem Description – Resumable Async Map
//
// You are given an array of async tasks and a concurrency limit.
// Your task is to implement createResumableMapper(tasks, limit).
//
// The function must return an object with:
// 1. start(): starts/resumes processing and resolves when all tasks complete
// 2. pause(): stops scheduling new tasks (running tasks may finish)
// 3. getStatus(): returns progress info (completed, pending, running)
//
// When resumed, processing must continue from where it paused
// without re-running already completed tasks.
function createResumableMapper(tasks, limit) { 
    let completed = 0;
    let running = 0;
    let isPaused = true;
    let currentIndex = 0;

    const results = new Array(tasks.length);

    let resolveFinal;
    const finalPromise = new Promise((res) => {
        resolveFinal = res;
    });

    function runNext(){
        if(isPaused) return;

        if(currentIndex >= tasks.length){
            if(running === 0){
                resolveFinal(results);
            }
            return;
        }

        while(running < limit &&  currentIndex < tasks.length && !isPaused){
            const index = currentIndex++;
            const task = tasks[index];

            running++;

            Promise.resolve()
                   .then(() => task())
                   .then((value) => {
                    results[index] = value;
                    
                   })
                   .catch(err => {
                    results[index] = err;
                    
                   })
                   .finally(() => {
                    running--;
                    completed++;
                    runNext();
                   });
        }

    }
    return {
            start(){
                isPaused = false;
                runNext();
                return finalPromise;
            },
            pause(){
                isPaused = true;
            },
            getStatus(){
                return {
                    completed,
                    running,
                    pending : tasks.length - completed - running, 
                }
            }
        };

}

module.exports = createResumableMapper;
