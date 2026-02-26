// Problem Description – retryOnce(fn)
//
// You are given a function `fn` that returns a Promise.
// Your task is to return a new function that calls `fn` and retries it once
// if the first attempt rejects.
// If the second attempt also rejects, the error should be propagated.

function retryOnce(fn) {
 return function(callback){
  fn((err,result) => {
    if(!err){
      return callback(null,result);
    }
    fn((err2,result2) => {
      if(err2){
        return callback(err2,null);
      }
      return callback(null,result2);
    })
  })
 }
}

module.exports = retryOnce;
