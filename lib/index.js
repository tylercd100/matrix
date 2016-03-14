'use strict';

function matrix(mat) {
    if (!Array.isArray(mat)) {
        throw new Error('Input should be of type array');
    }
    return function () {
        let args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
        return {
            size: () => size(mat, args),
            read: () => read(mat, args)
        }
    };
}

module.exports = matrix;

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

function dimensions(mat) {
    return size(mat).length;
}

function read(mat, args) {
    if (args.length === 0) {
        return mat;
    } else {
        return extract(mat, args);
    }
}

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