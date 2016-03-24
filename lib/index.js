'use strict';


/**
 * Pass a 2-dimensional array that will return a function accepting indices to access the matrix
 * 
 * @param mat array that initializes the matrix
 * @returns function with the array initialized and access to method that perform operations on the matrix
 */
function matrix(mat) {
    if (!Array.isArray(mat)) {
        throw new Error('Input should be of type array');
    }
    return function () {
        let args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
        return {
            size: () => size(mat, args),
            read: () => read(mat, args),
            replace: (value) => replace(mat, args, value)
        }
    };
}

module.exports = matrix;


/**
 * Calculates the size of the array across each dimension
 * 
 * @param mat input matrix that initialized the function
 * @param args indices to access one or more array elements
 * @returns size of the matrix as an array
 */
function size(mat, args) {
    if (args !== undefined) {
        return size(read(mat, args));
    }
    let s = [];
    while (Array.isArray(mat)) {
        s.push(mat.length);
        mat = mat[0];
    }
    return s;
}


/**
 * Private function to calculate the dimensions of the matrix
 * 
 * @param mat input matrix that initializes the function
 * @returns integer indicating the number of dimensions
 */
function dimensions(mat) {
    return size(mat).length;
}


/**
 * Outputs the original matrix or a particular element or a matrix that is part of the original
 * 
 * @param mat input matrix that initializes the function
 * @param args indices to access one or more array elements
 * @returns array or single element
 */
function read(mat, args) {
    if (args.length === 0) {
        return mat;
    } else {
        return extract(mat, args);
    }
}


/**
 * Private function to extract a single element or a matrix that is part of the original
 * 
 * @param mat input matrix that initializes the function
 * @param args indices to access one or more array elements
 * @returns array or single element
 */
function extract(mat, args) {
    let dim = dimensions(mat);
    for (let i = 0; i < dim; i++) {
        let d = args[i];
        if (d === undefined) {
            break;
        }
        if (Array.isArray(d)) {
            // if an element of args is an array, more extraction is needed
            mat = extractRange(mat, d, i);
        } else if (Number.isInteger(d)) {
            if (dimensions(mat) > 1 && i > 0) {
                mat = mat.map(function(elem) {
                    return [elem[d]];
                });
            } else {
                mat = mat[d];
            }
        } 
    }
    return mat;
}


/**
 * Private function to extract a portion of the array based on the specified range
 * 
 * @param mat input matrix that initialized the function
 * @param arg single argument containing the range specified as an array
 * @param ind the current index of the arguments while extracting the matrix
 * @returns array from the specified range
 */
function extractRange(mat, arg, ind) {
    if (!arg.length) {
        return mat;
    } else if (arg.length === 2) {
        let reverse = arg[0] > arg[1];
        let first = (!reverse) ? arg[0] : arg[1];
        let last = (!reverse) ? arg[1]: arg[0];
        if (dimensions(mat) > 1 && ind > 0) {
            return mat.map(function(elem) {
                if (reverse) {
                    return elem.slice(first, last+1).reverse();
                }
                return elem.slice(first, last+1);
            })
        } else {
            mat = mat.slice(first, last+1);
            return (reverse && mat.reverse()) || mat;
        }
    }
}


/**
 * Replaces the specified index in the matrix with the specified value
 * 
 * @param mat input matrix that initialized the function
 * @param args index or indices passed in arguments to initialized function
 * @param value specified value that replace current value at index or indices
 * @returns (description)
 */
function replace(mat, args, value) {
    let result = clone(mat);
    let prev = args[0];
    if (args.length === 1) {
        result[prev].fill(value);
    }
    for (let i = 1; i < args.length; i++) {
        result[prev].fill(value, args[i], args[i] + 1);
    }
    return result;
}


/**
 * Private method to clone the matrix
 * 
 * @param mat input matrix that initialized the function
 * @returns cloned matrix
 */
function clone(mat) {
    let result = [];
    for (let i = 0; i < mat.length; i++) {
        result.push(mat[i].slice(0));
    }
    return result;
}
