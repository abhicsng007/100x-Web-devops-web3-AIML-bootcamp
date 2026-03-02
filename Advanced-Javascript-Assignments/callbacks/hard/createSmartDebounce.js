// Problem Description – Debounced Search with Result Guard
//
// You are building a search bar that should not call the API
// on every keystroke, so the request must be debounced.
//
// If an older request finishes after a newer one, its result
// must be ignored to prevent stale UI updates.
//
// Requirements:
// - Delay execution by waitMs.
// - Reset the timer on repeated calls.
// - Only the latest request may trigger the callback.

function createSmartDebounce(worker, waitMs) {
    let timer = null;
    let latestRequestId = 0;

    return function(...args){
        clearTimeout(timer);
        latestRequestId++;
        const currentRequestId = latestRequestId;

        timer = setTimeout(async() => {
            try {
                const result = await worker(...args);

                if(currentRequestId === latestRequestId){
                    return result;
                }
                
            } catch (error) {
                if(currentRequestId === latestRequestId){
                    throw error;
                }
            }
        },waitMs);
    }
}

module.exports = createSmartDebounce;
