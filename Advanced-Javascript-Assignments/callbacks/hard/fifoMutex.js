// Problem Description – Fair FIFO Mutex
//
// Implement a Mutex to control access to an async resource.
//
// Only one task may run at a time. Extra tasks must wait in a queue
// and be executed in FIFO order.
//
// When a task finishes, the lock should be released automatically
// and the next queued task should start.
//
// Requirements:
// - Run immediately if free.
// - Queue when locked (FIFO).
// - Auto-release on task completion.
class Mutex {
  constructor() {
    this.islocked = false;
    this.queue = [];
  }

  lock(task, onComplete) {
    const execute = () => {
      task((err,data) => {
        if(onComplete){
          onComplete(err,data);
        }

        this._release();
      });
    };
    
    if(!this.islocked){
      this.islocked = true;
      execute();
    }
    else {
      this.queue.push(execute);
    }
  }

  _release() {
    if(this.queue.length > 0){
      const nextTask = this.queue.shift();
      nextTask();
    }
    else {
      this.islocked = false;
    }
  }
}

module.exports = Mutex;
