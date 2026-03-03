// Problem Description – Preemptive Priority Task Scheduler
//
// You are required to build a scheduler that executes async tasks
// based on priority.
//
// Higher-priority tasks should be executed before lower-priority ones.
// Long-running tasks must periodically yield control back to the scheduler
// so that newly arrived high-priority tasks can be processed.
//
// True preemption is not possible in JavaScript, so tasks must cooperate
// by yielding execution voluntarily.

class Scheduler {
  constructor() {
    this.queue = [];
    this.onAllFinished = null;
    this.isRunning = false;
  }

  schedule(task, priority = 0) {
    this.queue.push({task,priority});
    this._sort();
  }

  run(onAllFinished) {
    this.onAllFinished = onAllFinished;
    if(!this.isRunning){
      this.isRunning = true;
      this._next();
    }
  }

  _sort() {
    return this.queue.sort((a,b) => b.priority - a.priority);
  }

  _next(){
    if(this.queue.length === 0){
      this.isRunning = false;
      if(this.onAllFinished){
        this.onAllFinished(null);
      }
      return;
    }

    const {task,priority} = this.queue.shift();

    task((err,isDone = true) => {
      if(err){
        this.isRunning = false;
        return this.onAllFinished(err);
      }
      if(!isDone){
        this.queue.push({task,priority});
        this._sort();
      }
      setImmediate(() => this._next());
    });
  }
}

module.exports = Scheduler;
