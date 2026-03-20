
// Problem Description – Ordered Event Emitter Bridge (Sequenced Resolver)
//
// You are required to implement createSequencedResolver() to handle out-of-order events.
//
// The resolver must support:
// 1. push(id, data): provides data for a given id
// 2. waitFor(id): returns a Promise that resolves when data for id is available
//
// Even if data arrives out of order, promises must resolve in strict order.
// Example: waitFor(2) must not resolve until id 1 has been pushed and resolved.
function createSequencedResolver() {
  const dataMap = new Map();
  const waiters = new Map();


  function tryResolve() {
    

    while (waiters.size > 0) {
      const nextId = Math.min(...waiters.keys());

      if(!dataMap.has(nextId)) break;

      const data = dataMap.get(nextId);
      const resolve = waiters.get(nextId);

      resolve(data);

      dataMap.delete(nextId);
      waiters.delete(nextId);
    }
  }

  return {
    push(id, data) {
      dataMap.set(id, data);
      tryResolve();
    },

    waitFor(id) {
      return new Promise((resolve) => {
        waiters.set(id, resolve);
        tryResolve();
      });
    },
  };
}



module.exports = createSequencedResolver;
