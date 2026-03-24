// Problem Description – Distributed Mutex with Expiry (TTL Lock)
//
// You are required to implement a DistributedLock that provides exclusive access
// to a resource identified by a lockKey.
//
// Only one client can hold a lock at a time.
// If the lock is already held, new acquire requests must wait in a FIFO queue.
//
// Requirements:
// 1. Exclusive Access: only one active lock holder per lockKey
// 2. FIFO Queue: waiting acquire() calls must be served in order
// 3. TTL Expiry (Deadlock Guard):
//    - each lock is granted with a ttl (ms)
//    - after ttl expires, lock must auto-expire and be granted to next waiter
// 4. Safe Unlock:
//    - unlock() should release the lock immediately
//    - if unlock() is called after ttl already expired, ignore it
// 5. Lock Extension:
//    - extend(additionalMs) should increase ttl only if caller still owns the lock
//    - if caller lost ownership, ignore / reject
//
class DistributedLock {
  constructor() {
    this.locks = new Map();
    this.idCounter = 0;
   }

   _getState(lockKey){
    if(!this.locks.has(lockKey)){
      this.locks.set(lockKey,{
        currentOwner: null,
        expiresAt: 0,
        queue:[],
        timer:null,
      });
    }
    return this.locks.get(lockKey);
   }

   _generateId(){
    return `lock-${++this.idCounter}`;
   }

   _scheduleExpiry(lockKey,state,ttlMs){
      if(state.timer) clearTimeout(state.timer);

      state.expiresAt = Date.now() + ttlMs;

      state.timer = setTimeout(()=> {
        this._expire(lockKey);
      },ttlMs);
   }

   _expire(lockKey){
    const state = this.locks.get(lockKey);
    if(!state) return;

    if(Date.now() < state.expiresAt){
      return;
    }

    state.currentOwner = null;
    state.timer = null;
    
    this._processQueue(lockKey);
   }

   _processQueue(lockKey){
    const state = this.locks.get(lockKey);

    if(!state || state.currentOwner !== null) return;

    const next = state.queue.shift();
    if(!next) return;

    state.currentOwner = next.ownerId;
    this._scheduleExpiry(lockKey,state,next.ttlMs);

    next.resolve(this._createHandle(lockKey, next.ownerId));
   }

   _createHandle(lockKey,ownerId){
      return {
        unlock: () => this._unlock(lockKey,ownerId),
        extend: (ms) => this._extend(lockKey,ownerId,ms),
      };
   }

  async acquire(lockKey, ttlMs) { 
    const state = this._getState(lockKey);
    const ownerId = this._generateId();

    return new Promise((resolve,reject) => {
      const request = {resolve,reject,ownerId,ttlMs};

      if(state.currentOwner === null){
        state.currentOwner = ownerId;
        this._scheduleExpiry(lockKey,state,ttlMs);
        resolve(this._createHandle(lockKey,ownerId));
      }
      else {
        state.queue.push(request);
      }
    });
  }

  _unlock(lockKey,ownerId){
    const state = this.locks.get(lockKey);

    if(!state) return;

    if(state.currentOwner !== ownerId) return;

    if(Date.now() >= state.expiresAt) return;

    clearTimeout(state.timer);
    state.timer = null;
    state.currentOwner = null;

    this._processQueue(lockKey);
  }

  _extend(lockKey,ownerId,additionalMs){
    const state = this.locks.get(lockKey);

    if(!state) return false;

    if(state.currentOwner !== ownerId) return false;

    if(Date.now() >= state.expiresAt) return false;

    const remaining = state.expiresAt - Date.now();
    
    const newTtl = remaining + additionalMs;

    this._scheduleExpiry(lockKey,state,newTtl);

    return true;
  }
}

module.exports = DistributedLock;
