// Problem Description – Rate Limiter (Token Bucket / Sliding Window)
//
// You are required to implement a `RateLimiter` class that restricts the
// number of executions of a given task within a specific time window.
//
// The limiter should ensure that no more than `limit` tasks are executed
// in any given `windowMs` period.
//
// Requirements:
// 1. The constructor should accept `limit` (max tasks) and `windowMs` (time window).
// 2. The `throttle(task)` method should return a Promise that resolves when the task
//    can be executed.
// 3. If the limit is reached, subsequent tasks must wait until the window allows
//    another execution.
// 4. Tasks should be executed in the order they were submitted (FIFO).
//
// This is a common pattern for API rate limiting and resource management.

class RateLimiter {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.queue = [];
    this.timestamps = [];
    this.running = false;
  }

  async throttle(task) {
    return new Promise((resolve,reject) => {
      this.queue.push({task,resolve,reject});
      this._process();
    })
  }
  _clean(now){
    while(this.timestamps.length && (now - this.timestamps[0]) >= this.windowMs){
      this.timestamps.shift();
    }
  }

  _process(){
    if(this.running) return;
    this.running = true;

    const runNext = () => {
      if(this.queue.length === 0){
        this.running = false;
        return;
      }

      const now = Date.now();
      this._clean(now);

      if(this.timestamps.length < this.limit){
        const {task,resolve,reject} = this.queue.shift();

        Promise.resolve()
                .then(task)
                .then(resolve)
                .catch(reject)
                .finally(() => {
                  this.timestamps.push(Date.now());
                  runNext();
                });
      }
      else {
        const wait = this.windowMs - (now - this.timestamps[0])+2;
        setTimeout(runNext,wait);
      }
    };
    runNext();
  }
}

module.exports = RateLimiter;
