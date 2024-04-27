import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js';

const chai = use(chaiHttp);

describe('User routes', () => {
    describe('/POST /api/users/login', () => {
        it('it should login an existing user', (done) => {
            done();
        });
    });
    describe('/POST /api/users', () => {
        it('it should create a new user', (done) => {
            done();
        });
    });
    describe('/GET /api/user', () => {
        it('it should get the current user', (done) => {
            done();
        });
    });
    describe('/PUT /api/user', () => {
        it('it should edit the current user', (done) => {
            done();
        });
    });
});