import { use, expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import User from '../api/models/User.js';

const chai = use(chaiHttp);

describe('Users routes', () => {
    describe('/POST /api/users', () => {
        before(async () => {
            await User.deleteMany();
        });
        after(async () => {
            await User.deleteMany();
        });
        it('Register a new user', async () => {
            const data = {
                user: {
                    email: 'john@email.com',
                    username: 'john',
                    password: 'passwordddd'
                }
            };
            var requester = chai.request(app).keepOpen();
            const response_1 = await requester
                .post('/api/users')
                .send(data);
            expect(response_1).to.have.status(201);
            expect(response_1.body.user.username).to.equal('john');
            expect(response_1.body.user.email).to.equal('john@email.com');
            expect(response_1.body.user.token).to.be.a('string');
            expect(response_1.body.user.bio).to.equal('');
            expect(response_1.body.user.image).to.equal('');
            const response_2 = await requester
                .post('/api/users')
                .send(data);
            expect(response_2).to.have.status(422);
            expect(response_2.body.errors.body).to.include('Email address already in use');
            requester.close();
        });
    });
});