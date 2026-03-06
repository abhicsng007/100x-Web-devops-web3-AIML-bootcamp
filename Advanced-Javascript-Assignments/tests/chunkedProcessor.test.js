const chunkedProcessor = require("../cpu-io/medium/chunkedProcessor");

describe("chunkedProcessor", () => {
  test("should process all items in the array", (done) => {
    const items = [1, 2, 3, 4, 5];
    const processed = [];

    chunkedProcessor(items, (item) => processed.push(item), () => {
      try {
        expect(processed).toEqual([1, 2, 3, 4, 5]);
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  test("should not block the event loop (yields control)", async () => {
  const items = new Array(100).fill(0); // Lower count for faster debugging
  let heartbeatCount = 0;

  const interval = setInterval(() => {
    heartbeatCount++;
  }, 1);

  // 1. Wait for the processor to complete
  await new Promise((resolve) => {
    chunkedProcessor(items, (item) => {
      // Simulate work
      for(let i = 0; i < 100; i++) Math.sqrt(i);
    }, () => {
      clearInterval(interval); // MUST clear the interval here
      resolve();
    });
  });

  // 2. THE FIX: Explicitly wait for the very last scheduled setImmediate to fire
  // This "drains" any remaining handles from the event loop
  await new Promise((resolve) => setImmediate(resolve));

  expect(heartbeatCount).toBeGreaterThan(0);
}, 10000);

  test("should handle an empty array", (done) => {
    chunkedProcessor([], (item) => {}, () => {
      done();
    });
  });
});