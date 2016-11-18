'use strict';

const matrix = require('../lib');
const assert = require('assert');
let a, a1, a2, mat, mat1, mat2, m;

it('should exist', () => {
    assert.ok(matrix);
});

it('should throw not array', () => {
    assert.throws(matrix, 'Input should be of type array');
});

describe('Matrix operations', () => {
    before(() => {
        a = [[1, 2, 3], [4, 5, 6]];
        a1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        a2 = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
        m = matrix([[2, 2, 2], [2, 2, 2], [2, 2, 2]]);
        mat = matrix(a);
        mat1 = matrix(a1);
        mat2 = matrix(a2);       
    });
    it('should return size', () => {
        assert.deepEqual(mat.size(), [2, 3]);
    });

    it('should return back the matrix', () => {
        assert.deepEqual(mat(), a);
    });

    it('should return a single element', () => {
        assert.equal(mat(0, 0), 1);
    });

    it('should return a row', () => {
        assert.deepEqual(mat(0), [1, 2, 3]);
    });
    
    it('should return column', () => {
       assert.deepEqual(mat([],0), [[1],[4]]); 
    });
    
    it('should return in specified range', () => {
       assert.deepEqual(mat([1,0],[2,1]), [[6, 5], [3, 2]]);
       assert.deepEqual(mat(0,[2,1]), [3, 2]);
       assert.deepEqual(mat([1,0],1), [[5], [2]]);
    });
    
    it('should replace the specified index', () => {
       assert.deepEqual(mat.set(1).to(8), [[1,2,3], [8,8,8]]); 
       assert.deepEqual(mat.set(1,2).to(8), [[1,2,3], [4,5,8]]);
       assert.deepEqual(mat.set([],1).to(8), [[1,8,3], [4,8,6]]);
       assert.deepEqual(mat1.set([],[1,2]).to(8), [[1,8,8], [4,8,8], [7,8,8]]);
       assert.deepEqual(mat1.set([1,2],[1,2]).to(8), [[1,2,3], [4,8,8], [7,8,8]]);
    });
    
    it('should add two matrices', () => {
        assert.deepEqual(mat1.add(mat2), [[2, 3, 4], [5, 6, 7], [8, 9, 10]]);
    });
    
    it('should subtract two matrices', () => {
       assert.deepEqual(mat1.sub(mat2), [[0, 1, 2], [3, 4, 5], [6, 7, 8]]); 
    });
    
    it('should find scalar product two matrices', () => {
       assert.deepEqual(mat1.mul(m), [[2, 4, 6], [8, 10, 12], [14, 16, 18]]); 
    });
    
    it('should divide each element of two matrices', () => {
       assert.deepEqual(mat1.div(m), [[0.5, 1, 1.5], [2, 2.5, 3], [3.5, 4, 4.5]]); 
    });
    
    it('should find the product of two matrices', () => {
       assert.deepEqual(mat1.prod(mat2), [[6, 6, 6], [15, 15, 15], [24, 24, 24]]); 
    });
    
    it('should return the transpose of a matrix', () => {
       assert.deepEqual(mat.trans(), [[1, 4], [2, 5], [3, 6]]);
       assert.deepEqual(mat1.trans(), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]); 
    });

    it('should return the determinant', () => {
        assert.equal(mat1.det(), 0);
        assert.equal(matrix([[5, 4, 7], [4, 8, 2], [9, 0, 4]]).det(), -336);
    });
});
