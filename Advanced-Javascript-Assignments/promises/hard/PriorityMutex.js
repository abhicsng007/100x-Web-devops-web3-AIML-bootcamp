
// Problem Description – Preemptive Priority Mutex
//
// You are required to implement a PriorityMutex that allows only one async task
// to hold a lock at a time.
//
// Each lock request includes a priority (higher is better).
// High-priority tasks should jump ahead of lower-priority tasks.
//
// To prevent starvation, tasks waiting longer than 5 seconds must gain priority
// (priority aging) and eventually move ahead in the queue.
//
// Implement a class PriorityMutex with:
// lock(task, priority): runs the task when it acquires the lock and returns a Promise.
//
// Tasks must execute one at a time, in the correct order based on aged priority.
class PriorityMutex {
  constructor() { 
    this.queue = [];
    this.locked = false;
  }
  _getAgedPriority(waiter) { 
    const now = Date.now();
    const waitTime = now - waiter.enqueueTime;

    const agingBoost = Math.floor(waitTime/5000) ;

    return waiter.basePriority + agingBoost ;
  }
  async lock(task, basePriority = 0) { 
    return new Promise((resolve,reject) => {
      const waiter = {
        task,
        basePriority,
        enqueueTime: Date.now(),
        resolve,
        reject,
      };
      this.queue.push(waiter);
      this._next();
    })
  }
  async _execute(waiter) {
    try {
      const result = await waiter.task();
      waiter.resolve(result);
    } catch (error) {
      waiter.reject(error);
    }
    finally{
      this.locked = false;
      this._next();
    }
   }
  _next() { 
    if(this.locked || this.queue.length === 0) return;
    this.queue.sort((a,b) => {
      return this._getAgedPriority(b) - this._getAgedPriority(a);
    });

    const nextWaiter = this.queue.shift();
    this.locked = true;
    this._execute(nextWaiter);

  }
}

module.exports = PriorityMutex;
