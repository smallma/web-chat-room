import { expect } from 'chai';
import Calculator from '../src/calculate';

describe('calculate', function() {
  it('add', function() {
    let result = Calculator.Sum(5, 2);
    expect(result).equal(7);
  });
});