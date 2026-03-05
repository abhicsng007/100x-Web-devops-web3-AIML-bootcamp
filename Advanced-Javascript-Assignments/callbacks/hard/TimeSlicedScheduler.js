// Problem Description – Time-Sliced Task Scheduler
//
// You are required to build a scheduler that prevents long-running tasks
// from blocking the event loop.
//
// Tasks must periodically yield control back to the scheduler so that
// higher-priority or newly arrived tasks can execute.
//
// This simulates cooperative multitasking used in UI frameworks.

class TimeSlicedScheduler {
  constructor() {
    this.queue = [];
    this.running = false;
  }

  schedule(task) {
    this.queue.push(task);
  }

  async run() {
    if(this.running) return;
      
    this.running = true;

    while(this.queue.length > 0){
      const task = this.queue.shift();

      await task();

      if(this.queue.length > 0){
        await new Promise(resolve => setTimeout(resolve,0));
      }
    }
    this.running = false;
  }
}

module.exports = TimeSlicedScheduler;
