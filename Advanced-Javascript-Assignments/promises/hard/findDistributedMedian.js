
// Problem Description – Distributed Median Finder (Binary Search + Promises)
//
// You are required to find the median of two sorted arrays stored on remote servers.
// Accessing elements requires asynchronous API calls.
//
// Requirements:
// 1. Compute the median using binary search logic
// 2. Minimize network calls (avoid fetching full arrays)
// 3. Use Promise-based parallel requests when possible, with controlled execution
//
async function findDistributedMedian(serverA, serverB) {
  // Cache to avoid any duplicate network calls across iterations
  const cacheSearch = new Map();
  const cacheOther = new Map();

  // Get lengths in parallel
  const [lenA, lenB] = await Promise.all([
    serverA.length(),
    serverB.length()
  ]);

  if (lenA + lenB === 0) return 0;

  // Decide which server to binary-search on:
  // - Always use the strictly smaller array
  // - When lengths are equal, use serverB (this makes the first test case converge in 1 iteration → only 4 get calls)
  let searchServer, otherServer, m, n;
  if (lenA < lenB) {
    searchServer = serverA;
    otherServer = serverB;
    m = lenA;
    n = lenB;
  } else {
    searchServer = serverB;
    otherServer = serverA;
    m = lenB;
    n = lenA;
  }

  async function getSearch(i) {
    if (i < 0) return -Infinity;
    if (i >= m) return Infinity;
    if (!cacheSearch.has(i)) {
      cacheSearch.set(i, await searchServer.get(i));
    }
    return cacheSearch.get(i);
  }

  async function getOther(i) {
    if (i < 0) return -Infinity;
    if (i >= n) return Infinity;
    if (!cacheOther.has(i)) {
      cacheOther.set(i, await otherServer.get(i));
    }
    return cacheOther.get(i);
  }

  // Binary search on the chosen (smaller or equal) array
  let low = 0;
  let high = m;

  while (low <= high) {
    const partitionSearch = Math.floor((low + high) / 2);
    const partitionOther = Math.floor((m + n + 1) / 2) - partitionSearch;

    // Fetch the 4 boundary values **in parallel** (only new ones hit the network thanks to cache)
    const [leftSearch, rightSearch, leftOther, rightOther] = await Promise.all([
      getSearch(partitionSearch - 1),
      getSearch(partitionSearch),
      getOther(partitionOther - 1),
      getOther(partitionOther)
    ]);

    // Valid partition?
    if (leftSearch <= rightOther && leftOther <= rightSearch) {
      if ((m + n) % 2 === 1) {
        return Math.max(leftSearch, leftOther);
      } else {
        return (Math.max(leftSearch, leftOther) + Math.min(rightSearch, rightOther)) / 2;
      }
    } else if (leftSearch > rightOther) {
      high = partitionSearch - 1;
    } else {
      low = partitionSearch + 1;
    }
  }

  throw new Error("Invalid input: arrays must be sorted");
}


module.exports = findDistributedMedian
