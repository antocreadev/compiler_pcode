class Stack {
    static counter = 0;
  
    constructor() {
      this.value = [];
      this.SP = this.value.length;
      Stack.counter += 1;
    }
  
    binaryOperation = (operator) => {
      const b = this.value.pop();
      const a = this.value.pop();
      this.value.push(operator(a, b));
    }

    compareOperation = (comparator) => {
      const b = this.value.pop();
      const a = this.value.pop();
      const result = comparator(a, b) ? 1 : 0;
      this.value.push(result);
    }
  
    add = () => {
      this.binaryOperation((a, b) => a + b);
    }
  
    sub = () => {
      this.binaryOperation((a, b) => a - b);
    }
  
    mul = () => {
      this.binaryOperation((a, b) => a * b);
    }
  
    div = () => {
      this.binaryOperation((a, b) => a / b);
    }
  
    eql = () => {
      this.compareOperation((a, b) => a === b);
    }
  
    neq = () => {
      this.compareOperation((a, b) => a !== b);
    }
  
    gtr = () => {
      this.compareOperation((a, b) => a > b);
    }
  
    lss = () => {
      this.compareOperation((a, b) => a < b);
    }
  
    leq = () => {
      this.compareOperation((a, b) => a <= b);
    }
  
    geq = () => {
      this.compareOperation((a, b) => a >= b);
    }
  
    prn = () => {
      console.log(this.value.pop());
    }
  
    inn = () => {
      const input = parseInt(prompt("Enter a value"));
      const address = this.value.pop();
      this.value[address] = input;
    }
  
    int = (c) => {
      for (let index = 0; index < c; index++) {
        this.value.push(0);
      }
    }
  
    ldi = (v) => {
      this.value.push(v);
    }
  
    lda = (a) => {
      this.value.push(a);
      // this.value.push(this.value[a]);
    }
  
    ldv = () => {
      const address = this.value.pop();
      const value = this.value[address];
      this.value.push(value);
    }
  
    sto = () => {
      const value = this.value.pop();
      const address = this.value.pop();
      this.value[address] = value;
    }
  }
  
export default Stack;