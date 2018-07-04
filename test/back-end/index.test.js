import { expect } from 'chai';
import { index } from '../../src/index';

describe('foo', () => {
    it('should say foo', () => {
        expect(index()).to.be.a('string');
    });
});
