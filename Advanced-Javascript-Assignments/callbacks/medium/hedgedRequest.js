// Problem Description – Hedged Request
//
// You have a Primary async source and a Secondary backup.
// Start the Primary immediately. If it is slow, start the Secondary.
//
// Return the first successful result and ignore the rest.
// Only fail if both fail, and ensure the callback runs once.
//
// Requirements:
// - Start Primary immediately.
// - Start Secondary after timeoutMs if needed.
// - First success wins.
// - Callback must be called exactly once.
function hedgedRequest(primary, secondary, timeoutMs, onComplete) {
    let finished = false;
    let primaryError = null;
    let secondaryError = null;

    function complete(err,data){
        if(finished) return;
        finished = true;
        onComplete(err,data);
    }
    
    const timer = setTimeout(() => {
        secondary((err,data) => {
        if(!err){
            complete(null,data);
        } else {
            secondaryError = err;
            if(primaryError){
                complete(secondaryError);
            }
        }
        
    })
    },timeoutMs);

    primary((err,data) => {
        if(!err){
            clearTimeout(timer);
            complete(null,data);
        }
        else {
            primaryError = err;
            if(secondaryError){
                complete(secondaryError);
            }
        }
    });

}

module.exports = hedgedRequest;
