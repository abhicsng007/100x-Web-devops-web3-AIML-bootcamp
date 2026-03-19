
// Problem Description – Hedged Circuit Breaker
//
// You are required to implement circuitHedgedFetch(url, options).
//
// The function should perform a hedged request:
// start a primary fetch immediately, and if it does not respond within 200ms,
// start a backup fetch in parallel.
//
// Additionally, the function must include a circuit breaker mechanism.
// If the API fails repeatedly, the circuit breaker should open and future calls
// must fail fast without making network requests.
//
// While the circuit is OPEN, the function should immediately return a cached value
// instead of attempting the hedged network logic.
//
// This combines hedged requests with circuit breaker state management.
// State persisted outside the function call
function createCircuitHedgedFetch() {
  let cbState = "CLOSED";
  let failureCount = 0;
  let lastFailureTime = null;
  let lastKnownGoodValue = null;

  const FAILURE_THRESHOLD = 3;
  const COOLDOWN_TIME = 5000;
  const HEDGE_DELAY = 200;
  const REQUEST_TIMEOUT = 3000;

  async function fetchWithTimeout(url,options,timeout,externalSignal) {
    const controller = new AbortController();
    const onAbort = controller.abort();
    if(externalSignal){
      externalSignal.addEventListener("abort",() => onAbort);
    }

    const timer = setTimeout(() => onAbort,timeout);

    try {

      const res  = await fetch(url,{
        ...options,
        signal: controller.signal,
      });

      if(!res.ok) throw new Error("HTTP ERROR");

      return await res.json();
      
    } catch (err) {
      if(err.name === "AbortError"){
        throw new Error("Request timed out or aborted");
      }
      throw err;
    }
    finally{
      clearTimeout(timer);
      externalSignal.removeEventListener("abort", onAbort);
    }
  }

  return async function circuitHedgedFetch(url, options = {}) {
    const now = Date.now();

    if(cbState === "OPEN"){
      if(now - lastFailureTime < COOLDOWN_TIME){
        if(lastKnownGoodValue != null){
          return lastKnownGoodValue;
        }
        throw new Error("Circuit open - no cached value");
      }
    else {
      cbState = "HALF_OPEN";
    }
  }

    let primaryController = new AbortController();
    let secondaryController = new AbortController();

    let hedgeTimer;

    try {
      const primaryPromise = fetchWithTimeout(
        url,
        options,
        REQUEST_TIMEOUT,
        primaryController.signal
      );

      const backupPromise = new Promise((resolve,reject) => {
        hedgeTimer = setTimeout(() => {
          fetchWithTimeout(
            url,
            options,
            REQUEST_TIMEOUT,
            secondaryController.signal
          )
          .then(resolve)
          .catch(reject);
        },HEDGE_DELAY);
      })

      const result = await Promise.race([
        primaryPromise,
        backupPromise
      ]);

      clearTimeout(hedgeTimer);
      primaryController.abort();
      secondaryController.abort();

      cbState = "CLOSED";
      failureCount = 0;
      lastKnownGoodValue = result;

      return result;
      
    } catch (err) {
      clearTimeout(hedgeTimer);
      primaryController.abort();
      secondaryController.abort();

      failureCount++;
      lastFailureTime = Date.now();

      if(failureCount >= FAILURE_THRESHOLD){
        cbState = "OPEN";
      }

      if(cbState === "HALF_OPEN"){
        cbState = "OPEN";
      }

      if(lastKnownGoodValue != null){
        return lastKnownGoodValue;
      }

      throw err;
    }
  };
}


module.exports =  createCircuitHedgedFetch();