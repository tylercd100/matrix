'use strict';

const matrix = require('../lib');
const assert = require('assert');
let a, mat;

it('should exist', () => {
    assert.ok(matrix);
});

it('should throw not array', () => {
    assert.throws(matrix, 'Input should be of type array');
});

describe('Matrix GET and SIZE method', () => {
    before(() => {
        a = [[1, 2, 3], [4, 5, 6]]
        mat = matrix(a);
    });
    it('should return size', () => {
        assert.deepEqual(mat().size(), [2, 3]);
        assert.deepEqual(mat(0).size(), [3]);
        assert.deepEqual(mat([], 0).size(), [2, 1]);
    });

    it('should return back the matrix', () => {
        assert.deepEqual(mat().read(), a);
    });

    it('should return a single element', () => {
        assert.equal(mat(0, 0).read(), 1);
    });

    it('should return a row', () => {
        assert.deepEqual(mat(0).read(), [1, 2, 3]);
    });
    
    it('should return column', () => {
       assert.deepEqual(mat([],0).read(), [[1],[4]]); 
    });
    
    it('should return in specified range', () => {
       assert.deepEqual(mat([1,0],[2,1]).read(), [[6, 5], [3, 2]]);
       assert.deepEqual(mat(0,[2,1]).read(), [3, 2]);
       assert.deepEqual(mat([1,0],1).read(), [[5], [2]]);
    });
    
    it('should replace the specified index', () => {
       assert.deepEqual(mat(1).replace(8), [[1,2,3], [8,8,8]]); 
       assert.deepEqual(mat(1,2).replace(8), [[1,2,3], [4,5,8]]);
    });
});

