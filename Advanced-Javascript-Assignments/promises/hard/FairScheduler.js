// Problem Description – Fair Priority Task Scheduler (Starvation-Free)
//
// You are required to implement a task scheduler that supports priorities
// while ensuring fairness.
//
// Each task has a priority (higher number = higher priority).
// Normally, higher-priority tasks should run first.
//
// However, low-priority tasks must not starve forever.
// If a task waits too long, its effective priority should increase over time
// (priority aging).
//
// Requirements:
// 1. Higher-priority tasks should be preferred
// 2. Tasks must execute one at a time
// 3. Starvation must be prevented using priority aging
// 4. Tasks must execute asynchronously

class FairScheduler {
  constructor(agingFactor = 1) {
    this.agingFactor = agingFactor;
    this.queue = [];
    this.running = false;
  }

  schedule(task, priority = 0) {
    return new Promise((resolve,reject) => {
      const job = {
        task,
        basePriority: priority,
        enqueueTime: Date.now(),
        resolve,
        reject,
      }

      this.queue.push(job);

      if(!this.running){
        this.running = true;
        queueMicrotask(() => this.run());
      }
    });
  }

  _getEffectivePriority(job){
    const waitTime = (Date.now() - job.enqueueTime)/1000;
    return job.basePriority + waitTime * this.agingFactor;
  }

  _pickNextTask(){
    if(this.queue.length === null) return;

    let bestIndex = 0;
    let bestPriority = this._getEffectivePriority(this.queue[0]);

    for(let i = 1; i < this.queue.length ; i++){
      const p = this._getEffectivePriority(this.queue[i]);
      if(p > bestPriority){
        bestIndex = i;
        bestPriority = p;
      }
    }
    return this.queue.splice(bestIndex,1)[0];
  }

  async run() {
    while(this.queue.length > 0){
      const batch = this.queue
                    .map(job => ({
                      job,
                      priority: this._getEffectivePriority(job),
                    }))
                    .sort((a,b) => b.priority - a.priority)
                    .map(item => item.job);

      this.queue = [];

      for(const job of batch){
        try {
          const result = await job.task();
          job.resolve(result);
        } catch (error) {
          job.reject(error);
        }
      }
    }
    this.running = false;
  }
}

module.exports = FairScheduler;

