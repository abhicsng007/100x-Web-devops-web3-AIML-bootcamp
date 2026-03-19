
// Problem Description – Circuit Breaker Promise Wrapper
//
// You are given an async function fn that may fail.
// Your task is to implement circuitBreaker(fn, failureThreshold, resetTimeout).
//
// The circuit breaker must track consecutive failures and manage states:
//
// 1. CLOSED: calls execute normally
// 2. OPEN: after failureThreshold failures, reject immediately without calling fn
// 3. HALF-OPEN: after resetTimeout, allow one trial call to check recovery
//
// If the trial succeeds, reset to CLOSED.
// If it fails, return to OPEN.
function circuitBreaker(fn, failureThreshold, resetTimeout) {
    let state = "CLOSED";
    let failureCount = 0;
    let nextAttempTime = 0;
    let halfOpenInProgress = false;

    return async function(...args){
        const now = Date.now();
        
        if(state === "OPEN"){
            if(now >= nextAttempTime){
                state = "HALF-OPEN";
            }
            else {
                throw new Error("Circuit is OPEN");
            }
        }

        if(state === "HALF-OPEN"){
            if(halfOpenInProgress){
                throw new Error("Circuit is HALF-OPEN (trial in progress)");
            }
            halfOpenInProgress = true;
            try {
                const result = await fn(...args);

                state = "CLOSED";
                failureCount = 0;
                halfOpenInProgress = false;

                return result;
                
            } catch (error) {
                state = "OPEN";
                nextAttempTime = Date.now() + resetTimeout;
                halfOpenInProgress = false;
                throw error;
            }
        }

        try {

            const result = await fn(...args);
            failureCount = 0;
            return result;
            
        } catch (error) {
            failureCount++;
            
            if(failureCount >= failureThreshold){
                state= "OPEN";
                nextAttempTime = Date.now() + resetTimeout;
            }
            throw error;
        }
    };
 }

module.exports = circuitBreaker;
