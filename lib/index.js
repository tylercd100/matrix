const { addition } = require("./gpu");

class Matrix extends Array {
  constructor(mat) {
    if (Array.isArray(mat)) {
      super(...mat);
    } else if (Number.isInteger(mat)) {
      super(mat);
    } else {
      throw new Error("Input should be of type array or integer");
    }
  }

  size() {
    let s = [];
    let m = this;
    while (Array.isArray(m)) {
      s.push(m.length);
      m = m[0];
    }
    return s;
  }

  read(...args) {
    if (args.length === 0) {
      return this;
    } else {
      return this.extract(...args);
    }
  }

  add(operand) {
    console.log(this.size());
    return addition(this.size(), this, operand);
    return this.operate(operand, this.addition);
  }
  sub(operand) {
    return this.operate(operand, this.subtraction);
  }
  mul(operand) {
    return this.operate(operand, this.multiplication);
  }
  div(operand) {
    return this.operate(operand, this.division);
  }

  /**
   * Operates on two matrices of the same size
   *
   * @param mat input matrix that initialized the function
   * @param operand second matrix with which operation is performed
   * @param operation function performing the desired operation
   * @returns result of the operation
   */
  operate(operand, operation) {
    let result = [];
    let op = operand;

    for (let i = 0; i < this.length; i++) {
      let op1 = this[i];
      let op2 = op[i];
      result.push(
        op1.map(function (elem, ind) {
          return operation(elem, op2[ind]);
        })
      );
    }

    return result;
  }

  /**
   * Performs addition
   *
   * @param op1 first operand
   * @param op2 second operand
   * @returns result
   */
  addition(op1, op2) {
    return op1 + op2;
  }

  /**
   * Performs subtraction
   *
   * @param op1 first operand
   * @param op2 second operand
   * @returns result
   */
  subtraction(op1, op2) {
    return op1 - op2;
  }

  /**
   * Performs multiplication
   *
   * @param op1 first operand
   * @param op2 second operand
   * @returns result
   */
  multiplication(op1, op2) {
    return op1 * op2;
  }

  /**
   * Performs division
   *
   * @param op1 first operand
   * @param op2 second operand
   * @returns result
   */
  division(op1, op2) {
    return op1 / op2;
  }

  set(...args) {
    args = args.length === 1 ? [args[0]] : Array.apply(null, args);
    return {
      to: (val) => this.replace(val, ...args),
    };
  }

  /**
   * Private method to clone the matrix
   *
   * @param mat input matrix that initialized the function
   * @returns cloned matrix
   */
  clone() {
    let result = [];
    for (let i = 0; i < this.length; i++) {
      result.push(this[i].slice(0));
    }
    return new Matrix(result);
  }

  /**
   * Replaces the specified index in the matrix with the specified value
   *
   * @param value specified value that replace current value at index or indices
   * @param args index or indices passed in arguments to initialized function
   * @returns replaced matrix
   */
  replace(value, ...args) {
    //TODO: Clean this function up
    let result = this.clone();
    let prev = args[0];
    let start = prev[0] || 0;
    let end = (prev[1] && prev[1] + 1) || this.length;
    if (!Array.isArray(prev) && args.length === 1) {
      result[prev].fill(value);
    } else if (args.length === 1) {
      for (let ind = start; ind < end; ind++) {
        result[ind].fill(value);
      }
    }
    for (let i = 1; i < args.length; i++) {
      let first = Array.isArray(args[i]) ? args[i][0] || 0 : args[i];
      let last = Array.isArray(args[i])
        ? (args[i][1] && args[i][1] + 1) || this[0].length
        : args[i] + 1;
      if (!Array.isArray(prev)) {
        result[prev].fill(value, first, last);
      } else {
        for (let ind = start; ind < end; ind++) {
          result[ind].fill(value, first, last);
        }
      }
    }
    return result;
  }

  /**
   * Private function to calculate the dimensions of the matrix
   *
   * @returns integer indicating the number of dimensions
   */
  dimensions() {
    return this.size().length;
  }

  /**
   * Private function to extract a single element or a matrix that is part of the original
   *
   * @param args indices to access one or more array elements
   * @returns array or single element
   */
  extract(...args) {
    let dim = this.dimensions();
    let mat = new Matrix([...this]);
    for (let i = 0; i < dim; i++) {
      let d = args[i];
      if (d === undefined) {
        break;
      }
      if (Array.isArray(d)) {
        // if an element of args is an array, more extraction is needed
        mat = mat.extractRange(d, i);
      } else if (Number.isInteger(d)) {
        if (mat.dimensions() > 1 && i > 0) {
          mat = mat.map(function (elem) {
            return [elem[d]];
          });
        } else {
          if (Array.isArray(mat[d])) {
            mat = new Matrix([...mat[d]]);
          } else {
            return mat[d];
          }
        }
      }
    }
    return new Matrix([...mat]);
  }

  /**
   * Private function to extract a portion of the array based on the specified range
   *
   * @param arg single argument containing the range specified as an array
   * @param ind the current index of the arguments while extracting the matrix
   * @returns array from the specified range
   */
  extractRange(arg, ind) {
    if (!arg.length) {
      return this;
    } else if (arg.length === 2) {
      let reverse = arg[0] > arg[1];
      let first = !reverse ? arg[0] : arg[1];
      let last = !reverse ? arg[1] : arg[0];
      if (this.dimensions() > 1 && ind > 0) {
        return this.map(function (elem) {
          if (reverse) {
            return elem.slice(first, last + 1).reverse();
          }
          return elem.slice(first, last + 1);
        });
      } else {
        let mat = this.slice(first, last + 1);
        return (reverse && mat.reverse()) || mat;
      }
    }
  }

  /**
   * Finds the product of two matrices
   *
   * @param mat input matrix that initialized the function
   * @param operand second matrix with which operation is performed
   * @returns the product of the two matrices
   */
  prod(mat, operand) {
    let op1 = mat;
    let op2 = operand();
    let size1 = size(op1);
    let size2 = size(op2);
    let result = [];
    if (size1[1] === size2[0]) {
      for (let i = 0; i < size1[0]; i++) {
        result[i] = [];
        for (let j = 0; j < size2[1]; j++) {
          for (let k = 0; k < size1[1]; k++) {
            if (result[i][j] === undefined) {
              result[i][j] = 0;
            }
            result[i][j] += multiplication(op1[i][k], op2[k][j]);
          }
        }
      }
    }
    return matrix(result);
  }
}

exports.Matrix = Matrix;
exports.matrix = (...args) => {
  return new Matrix(...args);
};
