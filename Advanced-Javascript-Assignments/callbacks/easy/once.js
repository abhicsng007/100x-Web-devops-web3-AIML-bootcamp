// Problem Description – once(fn)
//
// You are required to implement a wrapper function named once that accepts a
// callback-based asynchronous function `fn`.
// The wrapper should ensure that `fn` is executed only on the first call.
// Any subsequent calls should not re-execute `fn` and should instead invoke
// the callback with the same result (or error) from the first invocation.

function once(fn) {
  let called = false;
  let finished = false;
  let cachedError;
  let cachedResult;
  let waiting = [];

  return function (...args) {
    const callback = args.pop();

    if (finished) {
      return callback(cachedError, cachedResult);
    }

    waiting.push(callback);

    if (called) return;

    called = true;

    fn(...args , (err, data) => {
      finished = true;
      cachedError = err;
      cachedResult = data;

      waiting.forEach(cb => cb(err, data));
      waiting = [];
    });
  };
}

module.exports = once;
