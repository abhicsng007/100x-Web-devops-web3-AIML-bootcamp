
// Problem Description – Stale-While-Revalidate Cache
//
// You are required to implement swrCache(key, fetchFn).
//
// The cache should return data immediately if available, but also refresh
// the cache in the background.
//
// Requirements:
// 1. If key exists in cache, resolve immediately with cached value
// 2. Always trigger fetchFn() to refresh and update the cache
// 3. If cache is empty, wait for fetchFn() and return its result

const cache = new Map();

async function swrCache(key, fetchFn) { 

    if(cache.has(key)){
        const cachedValue = cache.get(key);

        fetchFn().then((newValue) => {
            cache.set(key,newValue);
        }).catch(() => {});

        return cachedValue;
    }

    const value = await fetchFn();
    cache.set(key,value);

    return value;
}

module.exports = swrCache;
