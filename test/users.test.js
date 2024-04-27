import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js';

const chai = use(chaiHttp);

describe('/GET user', () => {
    it('it should GET the current user', (done) => {
        chai.request(server)
            .get('/api/user')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});