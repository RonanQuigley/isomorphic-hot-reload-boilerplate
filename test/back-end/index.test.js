import { expect } from 'chai';
import { render } from '../../src/server/router/views/index/middleware';
import httpMock from 'node-mocks-http';
import sinon from 'sinon';

let sandbox = sinon.createSandbox();
let req = httpMock.createRequest();
let res = httpMock.createResponse();

describe('foo', () => {
    it('', () => {
        sandbox.stub(res, 'send');

        render(req, res, () => {});
    });
    it('should say test', () => {
        expect('test').to.equal('test');
    });
});
