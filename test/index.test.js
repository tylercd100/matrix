"use strict";

const { matrix, Matrix } = require("../lib");
const assert = require("assert");
let a, a1, a2, a3, a4, mat, mat1, mat2, mat3, mat4, m;

it("should exist", () => {
  assert.ok(matrix);
});

it("should throw not array", () => {
  assert.throws(matrix, Error, "Input should be of type array");
});

describe("Matrix operations", () => {
  beforeEach(() => {
    a = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    a1 = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    a2 = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];
    a3 = [
      [7, 8],
      [9, 10],
      [11, 12],
    ];
    m = matrix([
      [2, 2, 2],
      [2, 2, 2],
      [2, 2, 2],
    ]);
    mat = matrix(a);
    mat1 = matrix(a1);
    mat2 = matrix(a2);
    mat3 = matrix(a3);
  });

  it("should return size", () => {
    assert.deepEqual(mat.size(), [2, 3]);
  });

  it("should return back the matrix", () => {
    assert.deepEqual(mat, a);
    expect(mat).toBeInstanceOf(Matrix);
  });

  it("should return a single element", () => {
    const result = mat.read(0, 0);
    assert.equal(result, 1);
  });

  it("should return a row", () => {
    const result = mat.read(0);
    assert.deepEqual(result, [1, 2, 3]);
    expect(result).toBeInstanceOf(Matrix);
  });

  it("should return column", () => {
    const result = mat.read([], 0);
    assert.deepEqual(result, [[1], [4]]);
    expect(result).toBeInstanceOf(Matrix);
  });

  it("should return in specified range", () => {
    let result = mat.read([1, 0], [2, 1]);
    assert.deepEqual(result, [
      [6, 5],
      [3, 2],
    ]);
    expect(result).toBeInstanceOf(Matrix);
    result = mat.read(0, [2, 1]);
    assert.deepEqual(result, [3, 2]);
    expect(result).toBeInstanceOf(Matrix);
    result = mat.read([1, 0], 1);
    assert.deepEqual(result, [[5], [2]]);
    expect(result).toBeInstanceOf(Matrix);
  });

  it("should replace the specified index", () => {
    let result = mat.set(1).to(8);
    expect(result).toBeInstanceOf(Matrix);
    assert.deepEqual(result, [
      [1, 2, 3],
      [8, 8, 8],
    ]);
    result = mat.set(1, 2).to(8);
    expect(result).toBeInstanceOf(Matrix);
    assert.deepEqual(result, [
      [1, 2, 3],
      [4, 5, 8],
    ]);
    result = mat.set([], 1).to(8);
    expect(result).toBeInstanceOf(Matrix);
    assert.deepEqual(result, [
      [1, 8, 3],
      [4, 8, 6],
    ]);
    result = mat1.set([], [1, 2]).to(8);
    expect(result).toBeInstanceOf(Matrix);
    assert.deepEqual(result, [
      [1, 8, 8],
      [4, 8, 8],
      [7, 8, 8],
    ]);
    result = mat1.set([1, 2], [1, 2]).to(8);
    expect(result).toBeInstanceOf(Matrix);
    assert.deepEqual(result, [
      [1, 2, 3],
      [4, 8, 8],
      [7, 8, 8],
    ]);
  });

  it("should add two matrices", () => {
    assert.deepEqual(mat1.add(mat2), [
      [2, 3, 4],
      [5, 6, 7],
      [8, 9, 10],
    ]);
  });

  it("should subtract two matrices", () => {
    assert.deepEqual(mat1.sub(mat2), [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ]);
  });
});
