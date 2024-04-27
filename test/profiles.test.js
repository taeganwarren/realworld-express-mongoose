import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

const chai = use(chaiHttp);

describe('Profiles routes', () => {
    describe('/GET /api/profiles/{username}', () => {
        it('Get a profile of a user of the system', (done) => {
            done();
        });
    });
    describe('/POST /api/profiles/{username}/follow', () => {
        it('Follow a user by username', (done) => {
            done();
        });
    });
    describe('/DELETE /api/profiles/{username}', () => {
        it('Unfollow a user by username', (done) => {
            done();
        });
    });
});