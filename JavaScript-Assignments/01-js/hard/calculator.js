/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
  - `npm run test-calculator`
*/

class Calculator {
  constructor(){
    this.result = 0;
  }
  add(num){
    this._validateNumber(num);
    this.result += num;
    return this;
    
  }
  subtract(num){
    this._validateNumber(num);
    this.result -= num;
    return this;
    
  }
  multiply(num){
    this._validateNumber(num);
    this.result *= num;
    return this;
  }
  divide(num){
    this._validateNumber(num);
    if(num === 0) {
      throw new Error("Divide by zero error");
    }
    else{
      this.result /= num;
    }
    
    return this;

  }
  clear(){
    this.result = 0;
    return this;
  }
  getResult(){
    return this.result;
  }

  _validateNumber(num){
    if (typeof num !== "number" || isNaN(num)){
      throw new Error("this is invalid number");
    }
  }

  _validateParentheses(exp) {
  let count = 0;

  for (let char of exp) {
    if (char === "(") count++;
    if (char === ")") count--;

    if (count < 0) {
      throw new Error("Invalid parentheses");
    }
  }

  if (count !== 0) {
    throw new Error("Invalid parentheses");
  }
}

  calculate(exp){
    if(typeof exp !== "string")
      throw new Error("Expression must be a valid string");
    if (!exp.length) {
      throw new Error("Empty expression");
    }
    

    exp = exp.replace(/\s+/g,"");

    if(!/^[0-9+\-*/().]+$/.test(exp)){
      throw new Error("Invalid characters in expression");
    }
    this._validateParentheses(exp);
    try {
      this.result = Function(`"use strict"; return (${exp})`)();
      if (!isFinite(this.result)) {
      throw new Error("Divide by zero error");
      }
    }
    catch{
      throw new Error("Invalid mathematical expression");
    }
    return this.result;
    
  }
 }

module.exports = Calculator;