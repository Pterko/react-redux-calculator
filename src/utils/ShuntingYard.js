function Operator(name, precedence, associativity, numParams, method) {
  const newAssociativity = associativity || "left";
  return {
    name,
    precedence,
    params: numParams,
    method,
    greaterThen(op) {
      return precedence > op.precedence;
    },
    greaterThenEqual(op) {
      return precedence >= op.precedence;
    },
    equalThen(op) {
      return precedence === op.precedence;
    },
    lessThen(op) {
      return precedence < op.precedence;
    },
    lessThenEqual(op) {
      return precedence <= op.precedence;
    },
    leftAssoc() {
      return newAssociativity === "left";
    },
    rightAssoc() {
      return newAssociativity === "right";
    }
  };
}

// function MathFunction(name, numParams, method) {
//   return {
//     name,
//     params: numParams,
//     method
//   };
// }

export default class ShuntingYard {
  constructor() {
    this.operators = {
      "+": new Operator("+", 2, "left", 2, function(a, b) {
        return a + b;
      }),
      "-": new Operator("-", 2, "left", 2, function(a, b) {
        return a - b;
      }),
      "*": new Operator("*", 3, "left", 2, function(a, b) {
        return a * b;
      }),
      "/": new Operator("/", 3, "left", 2, function(a, b) {
        return a / b;
      }),
      "^": new Operator("^", 4, "right", 2, function(a, b) {
        return Math.pow(a, b);
      })
    };
    this.functions = {};
  }

  addFunction(key, func) {
    if (this.functions[key]) {
      throw new Error(`Function ${key} does already exist.`);
    }
    this.functions[key] = func;
  }

  addOperator(key, operator) {
    if (this.operators[key]) {
      throw new Error(`Operator ${key} does already exist.`);
    }
    this.operators[key] = operator;
  }

  parse(str) {
    let output = [];
    let stack = [];
    let sign;
    let lastToken;
    let token;

    for (let i = 0, l = str.length; i < l; ++i) {
      token = str[i];
      if (token === " ") {
        continue; // do nothing with spaces
      }
      if (sign) {
        token = sign += token;
        sign = null;
      }
      if (this.isVariable(token)) {
        stack.push(token);
      } else if (this.isLeftPara(token)) {
        stack.push(token);
      } else if (this.isFunction(token)) {
        stack.push(token);
      } else if (this.isRightPara(token)) {
        let operator;
        while ((operator = stack.pop()) && !this.isLeftPara(operator)) {
          if (!this.isFunction(operator)) {
            output.push(operator);
          }
        }
        if (typeof operator === "undefined") {
          return null; // to many closing paranthesis
        }
      } else if (this.isOperator(token)) {
        if (!lastToken || lastToken === "(") {
          sign = token;
          continue;
        }
        while (stack.length) {
          const thisOperator = this.operators[token];
          const operator = this.operators[stack[stack.length - 1]];
          if (!operator || !thisOperator) {
            break;
          }
          if (
            (thisOperator.leftAssoc() &&
              thisOperator.lessThenEqual(operator)) ||
            thisOperator.lessThen(operator)
          ) {
            output.push(stack.pop());
          } else {
            break;
          }
        }
        stack.push(token);
      } else {
        if (
          !lastToken ||
          this.isLeftPara(lastToken) ||
          this.isOperator(lastToken)
        ) {
          output.push(token);
        } else {
          output[output.length - 1] += token;
        }
      }
      lastToken = token;
    }

    while (stack.length) {
      token = stack.pop();
      if (this.isLeftPara(token)) {
        return null; // to many opening paranthesis
      }
      output.push(token);
    }

    return output;
  }

  resolveRpn(arr) {
    let stack = [];
    let operators = [];

    for (let i = 0, l = arr.length; i < l; ++i) {
      const op = this.operators[arr[i]] || this.functions[arr[i]];
      if (op) {
        stack.push(op.method.apply(this, stack.splice(-op.params)));
      } else {
        stack.push(parseFloat(arr[i]));
      }
    }

    return stack[0];
  }

  resolve(str) {
    return this.resolveRpn(this.parse(str));
  }

  isLeftPara(token) {
    return token === "(";
  }

  isRightPara(token) {
    return token === ")";
  }

  isOperator(token) {
    return Object.keys(this.operators).indexOf(token) !== -1;
  }

  isFunction(token) {
    return Object.keys(this.functions).indexOf(token) !== -1;
  }

  isVariable(token) {
    return token === "x";
  }
}
