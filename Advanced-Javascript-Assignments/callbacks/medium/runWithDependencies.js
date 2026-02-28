// Problem Description – Task Execution with Dependencies
//
// You are given a set of asynchronous tasks where some tasks depend
// on the completion of others.
// Your goal is to execute each task only after all of its dependencies
// have been successfully completed.
// The solution should ensure correct execution order and handle
// dependency relationships properly.
//
// Each task is asynchronous and must invoke a callback when finished.
// Invoke finalCallback after all tasks have completed, or with an error
// if any task fails.

function runWithDependencies(tasks, finalCallback) {
    const taskMap = new Map();
    const dependents = new Map();
    const inDegree = new Map();
    const results = {};
    let completed = 0;
    let finished = false;

    for(const task of tasks){
        taskMap.set(task.id,task);
        inDegree.set(task.id,task.deps.length);
        dependents.set(task.id,[]);
    }

    for(const task of tasks){
        for(const dep of task.deps){
            dependents.get(dep).push(task.id);
        }
    }

    function runTask(id){
        if(finished) return;
        const task = taskMap.get(id);

        task.run((err,result) => {
            if(finished) return;

            if(err){
                finished = true;
                return finalCallback(err);
            }

            results[id] = result;
            completed++;

            for(const dependentsId of dependents.get(id)){
                inDegree.set(dependentsId,inDegree.get(dependentsId)-1);

                if(inDegree.get(dependentsId) === 0){
                    runTask(dependentsId);
                }
            }

            if(completed === tasks.length){
                finished = true;
                return finalCallback(err,results);
            }
        });
    }

    for(const task of tasks){
        if(inDegree.get(task.id) === 0){
            runTask(task.id);
        }
    }
}

module.exports = runWithDependencies;
