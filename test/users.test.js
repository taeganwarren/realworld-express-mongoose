import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

const chai = use(chaiHttp);

describe('Users routes', () => {
    describe('/POST /api/users/login', () => {
        it('Login for existing user', (done) => {
            done();
        });
    });
    describe('/POST /api/users', () => {
        it('Register a new user', (done) => {
            done();
        });
    });
    describe('/GET /api/user', () => {
        it('Gets the currently logged-in user', (done) => {
            done();
        });
    });
    describe('/PUT /api/user', () => {
        it('Updated user information for current user', (done) => {
            done();
        });
    });
});