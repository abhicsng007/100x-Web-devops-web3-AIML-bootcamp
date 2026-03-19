// Problem Description – Concurrent Cache with Deduplication and TTL
//
// You are required to implement a cache for async data fetching.
//
// The cache must:
// 1. Deduplicate concurrent requests for the same key
// 2. Cache resolved values with a time-to-live (TTL)
// 3. Return cached values if they are still valid
//
// If a cached value is close to expiry, return the current value
// but trigger a background refresh for future requests.
class Cache {
  constructor(ttl,refreshThreshold = ttl*0.2) {
    this.ttl = ttl;
    this.refreshThreshold = refreshThreshold;
    this.cache = new Map();
  }

  async get(key, fetcher) {
    const now = Date.now();
    const entry = this.cache.get(key);
    
    if(entry) {
      const isExpired = now > entry.expiry;
      const isNearExpiry = entry.expiry - now < this.refreshThreshold;

      if(!isExpired){
        if(isNearExpiry && !entry.promise){
          this._refresh(key,fetcher);
        }

        return entry.value;
      }

      if(entry.promise){
        return entry.promise;
      }

  }
    return this._fetchAndCache(key,fetcher);
 }

 _fetchAndCache(key,fetcher){
    const promise = (async () => {
      try {
        const value = await fetcher();
        this.cache.set(key,
          {
            value,
            expiry: Date.now() + this.ttl,
            promise: null,
          });
        return value;
        
      } catch (error) {
        this.cache.delete(key);
        throw error;
      }
    })();

    this.cache.set(key,{
      value:undefined,
      entry:0,
      promise,
    });

    return promise;
 }

 _refresh(key,fetcher){
   const entry = this.cache.get(key);
   if(!entry || entry.promise) return;

   const promise = (async () => {
    
    try {
        const value = await fetcher();
        this.cache.set(key,{
          value,
          expiry: Date.now() + this.ttl,
          promise: null,
        });
    } catch (error) {
      entry.promise = null;
    }
   })();

   entry.promise = promise;
 }

}

module.exports = Cache;
