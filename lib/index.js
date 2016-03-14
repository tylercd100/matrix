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
        if (Array.isArray(d) && (dim === dimensions(mat))) {
            return deepExtract(mat, args);
        }
        if (Number.isInteger(d)) {
            mat = mat[d];
        }
    }
    return mat;
}

function deepExtract(mat, args) {
    args.forEach(function(d) {
        if (Array.isArray(d)) {
            // some processing
        } else {
            mat = mat.map(function(elem) {
                return [elem[d]];
            });
        }
    });
    return mat;
}
