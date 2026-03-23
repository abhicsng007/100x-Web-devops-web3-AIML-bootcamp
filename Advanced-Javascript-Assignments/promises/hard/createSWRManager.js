
// Problem Description – Stale-While-Revalidate Flight Tracker
//
// You are required to implement createSWRManager(fetcherFn, ttl).
//
// The manager should return cached data immediately for fast responses,
// but refresh stale data in the background.
//
// Requirements:
// 1. If cached value exists, return it immediately
// 2. If cache age exceeds ttl, trigger a background refresh
// 3. If refresh fails, keep stale cached data (do not crash)
// 4. If multiple calls happen during refresh, deduplicate and share one refresh promise
//
function createSWRManager(fetcherFn, ttl) { 
    const cacheMap = new Map();

    async function reValidate(key,entry){
        if(entry.inFlightPromise) return entry.inFlightPromise;

        const promise = (async() => {
            try {
                const data = await fetcherFn(key);
                entry.data = data;
                entry.lastFetchedAt = Date.now();
                return data;
            } catch (error) {
                return entry.data;
            }
            finally{
                entry.inFlightPromise = null;
            }
        })();

        entry.inFlightPromise = promise;
        return promise;
    }

    return {
        async get(key) {
            let entry = cacheMap.get(key);

            if(!entry){
                entry = {
                    data: null,
                    lastFetchedAt: 0,
                    inFlightPromise: null,
                };
                cacheMap.set(key,entry);
            }

            if(entry.data === null){
                return await reValidate(key,entry);
            }

            const isStale = Date.now() - entry.lastFetchedAt > ttl;

            if(isStale){
                reValidate(key,entry);
            }

            return entry.data;
        },
    };
}

module.exports = createSWRManager;
