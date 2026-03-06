// Problem Description – Retry with Exponential Backoff and Jitter

// You are required to implement a retry mechanism for an asynchronous task that fails. 
// On each retry, the delay before the next attempt should increase, and a small random “jitter”
// should be added to the delay to prevent synchronized retries that can overload a server. 
// The process should stop once the task succeeds or the maximum retry limit is reached.
async function retryWithJitter(fn, retries = 3, baseDelay = 1000) {
    let attempt = 0;
    
    while(attempt <= retries){
        try {
           return await fn();
            
        } catch (error) {
            if(attempt === retries){
                throw error;
            }

            const expoDelay = baseDelay + Math.pow(2,attempt);
            const jitter = Math.random() * baseDelay;
            const delay = expoDelay + jitter;

            await new Promise(resolve => setTimeout(resolve,delay));

            attempt++;
        }
    }
}

module.exports = retryWithJitter;
