import { expect } from 'chai';
import { test } from '../../src/server/test';
describe('foo', () => {
    it('should say test', () => {
        expect(test()).to.equal('test');
    });
});
