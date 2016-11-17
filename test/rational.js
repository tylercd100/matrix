'use strict';

const rational = require('../lib/rational');
const assert = require('assert');

describe('rational operations', () => {
    it('should divide two equal rational numbers to return 1', () => {
        let result = rational(4, 5).div(rational(4, 5));
        assert.equal(result.num, 1);
        assert.equal(result.den, 1);
    });

    it('should divide two rational numbers with same numerator', () => {
        let result = rational(4, 5).div(rational(4, 7));
        assert.equal(result.num, 7);
        assert.equal(result.den, 5);
    });

    it('should multiply two inverse rational numbers to return 1', () => {
        let result = rational(4, 5).mul(rational(5, 4));
        assert.equal(result.num, 1);
        assert.equal(result.den, 1);
    });

    it('should multiply two rational numbers with same numerator and denominator', () => {
        let result = rational(4, 5).mul(rational(7, 4));
        assert.equal(result.num, 7);
        assert.equal(result.den, 5);
    });


    it('should add two rational numbers', () => {
        let result = rational(4, 5).add(rational(5, 4));
        assert.equal(result.num, 41);
        assert.equal(result.den, 20);
    });

    it('should subtract two rational numbers', () => {
        let result = rational(4, 5).sub(rational(5, 4));
        assert.equal(result.num, -9);
        assert.equal(result.den, 20);
    });
});
