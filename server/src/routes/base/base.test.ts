import { expect } from 'chai';
import * as app from '../../index';
import {request} from 'https';

describe('GET /', () => {
    it('should return 200 OK', () => {
        return request(app)
            .get('/')
            .expect(200)
            .then(res => {
                expect(res.body).have.property('message');
            });
    });
});
