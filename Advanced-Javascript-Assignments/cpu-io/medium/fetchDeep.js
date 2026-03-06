
// Problem Description – Recursive Fetch with Redirect Handling

// You are required to fetch data for a given set of IDs. 
// Each response may contain a redirectId, indicating that the data should be fetched again using the new ID. 
// The process must continue until the final data is reached. 
// Your implementation should also detect and prevent infinite redirect loops.

async function fetchDeep(ids, fetcher, maxDepth = 5) {
    async function resolve(id,depth=0) {
        if(depth >= maxDepth){
            throw new Error("Max redirect depth exceeded");
        }
        const data = await fetcher(id);

        if(data.redirectId){
           return resolve(data.redirectId,depth+1);
        }

        return data;
    }

    const entries = Object.entries(ids);

    const results = await Promise.all(
        entries.map(async ([key,id]) => {
            const data = await resolve(id);
            return [key,data];
        } )
    );

    return Object.fromEntries(results);

}

module.exports = fetchDeep;
