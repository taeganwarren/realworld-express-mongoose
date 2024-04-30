import { use, expect } from 'chai';
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
            const data = {user:{email:'john@email.com',username:'john',password:'passwordddd'}};
            const data_2 = {user:{email:'john',username:'jo',password:'password'}};
            const data_3 = {user:{email:4,username:4,password:4}};
            var requester = chai.request(app).keepOpen();
            // Register a new user
            const response_1 = await requester.post('/api/users').send(data);
            expect(response_1).to.have.status(201);
            expect(response_1.body.user.username).to.equal('john');
            expect(response_1.body.user.email).to.equal('john@email.com');
            expect(response_1.body.user.token).to.be.a('string');
            expect(response_1.body.user.bio).to.equal('');
            expect(response_1.body.user.image).to.equal('');
            // Try to register the same user again
            const response_2 = await requester.post('/api/users').send(data);
            expect(response_2).to.have.status(422);
            expect(response_2.body.errors.body).to.include('Email address already in use');
            // Try to register a user with missing and invalid credentials
            const response_3 = await requester.post('/api/users').send(data_2);
            expect(response_3).to.have.status(422);
            expect(response_3.body.errors.body).to.include('Email must be a valid email address');
            expect(response_3.body.errors.body).to.include('Username must be between 4 and 20 characters and contain only alphanumeric characters');
            expect(response_3.body.errors.body).to.include('Password must be between 10 and 100 characters and contain only ASCII characters');
            const response_4 = await requester.post('/api/users').send({});
            expect(response_4).to.have.status(422);
            expect(response_4.body.errors.body).to.include('All fields are required');
            const response_5 = await requester.post('/api/users').send(data_3);
            expect(response_5).to.have.status(422);
            expect(response_5.body.errors.body).to.include('All fields must be strings');
            requester.close();
        });
        it('Login an existing user', async () => {
            const data = {user:{email:'john@email.com',password:'passwordddd'}};
            const data_2 = {user:{email:'john',password:'password'}};
            const data_3 = {user:{email:'john@email.com',password:'passwordddddddddddd'}};
            const data_4 = {user:{email:'johnjohn@email.com',password:'passwordddddddddddd'}};
            var requester = chai.request(app).keepOpen();
            // Login an existing user
            const response_1 = await requester.post('/api/users/login').send(data);
            expect(response_1).to.have.status(200);
            expect(response_1.body.user.email).to.equal('john@email.com');
            expect(response_1.body.user.token).to.be.a('string');
            expect(response_1.body.user.bio).to.equal('');
            expect(response_1.body.user.image).to.equal('');
            // Try to login with invalid credentials
            const response_2 = await requester.post('/api/users/login').send(data_2);
            expect(response_2).to.have.status(422);
            expect(response_2.body.errors.body).to.include('Email must be a valid email address');
            expect(response_2.body.errors.body).to.include('Password must be between 10 and 100 characters and contain only ASCII characters');
            // Try to login an existing user with wrong password
            const response_3 = await requester.post('/api/users/login').send(data_3);
            expect(response_3).to.have.status(422);
            expect(response_3.body.errors.body).to.include('Invalid email or password');
            // Try to login a non-existing user
            const response_4 = await requester.post('/api/users/login').send(data_4);
            expect(response_4).to.have.status(422);
            expect(response_4.body.errors.body).to.include('Invalid email or password');
            requester.close();
        });
    });
});