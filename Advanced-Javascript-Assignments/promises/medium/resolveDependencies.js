
// Problem Description – Dependency Resolver (Simple DAG)
//
// You are given an object of tasks where each task may depend on other tasks.
// Your task is to implement resolveDependencies(tasks).
//
// Tasks without dependencies should start immediately in parallel.
// Tasks with dependencies must wait until all required parent tasks finish.
//
// Input example:
// { A: { fn }, B: { fn }, C: { fn, deps: ['A','B'] } }
async function resolveDependencies(tasks) { 
    const results = {};
    const promises = {};

    for(const [name,task] of Object.entries(tasks)){

        const deps = task.deps || [];

        promises[name] = Promise.all(
            deps.map(dep => promises[dep])
        )
        .then(() => task.fn())
        .then(result => {
            results[name] = result;
            return result;
        })
    }

    await Promise.all(Object.values(promises));
    return results;
}

module.exports = resolveDependencies;
``
