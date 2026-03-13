// Problem Description – Idempotent Async Execution
//
// You need to ensure that an asynchronous task identified by a key
// runs only once. If the same task is triggered again while it is
// still running, all callers should receive the same result.
//
// This problem tests deduplication and state synchronization.
//

function createIdempotentExecutor() {
    const inflight = new Map();

    return function execute(key,asyncTask){
        if(inflight.has(key)){
            return inflight.get(key);
        }

        const promise = Promise.resolve()
                                .then(() => asyncTask())
                                .finally(() => {
                                    inflight.delete(key);
                                })

        inflight.set(key,promise);

        return promise;
    }
}

module.exports = createIdempotentExecutor;
