// Problem Description – Async Mutex with Timeout
//
// You need to acquire a lock before running an async task.
// If the lock cannot be acquired within a given time limit,
// the operation should fail.
//
// This problem tests concurrency control and timeout handling.
//

class TimedMutex {
  constructor() {
    this.locked = false;
    this.queue = [];
  }

  acquire(timeoutMs) {
   return new Promise((resolve,reject) => {

    const tryAquire = () => {
      if(!this.locked){
        this.locked = true;

        const release = () => {
          this.locked = false;
          if(this.queue.length > 0){
            const next = this.queue.shift();
            next();
          }
        };
        resolve(release);
        return true;
      }
      return false;
    }

    if(tryAquire()) return;

    const timer = setTimeout(() => {
      reject("Lock Timeout");
    },timeoutMs);

    const waiter = () => {
      clearTimeout(timer);
      const release = () => {
        this.locked = false;
        if(this.queue.length > 0){
          const next = this.queue.shift();
          next();
        }
        
      };
      this.locked = true;
      resolve(release);
    }
    this.queue.push(waiter);
   })


  }
}

module.exports = TimedMutex;
