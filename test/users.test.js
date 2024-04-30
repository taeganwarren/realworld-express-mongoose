import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import User from '../api/models/User.js';

const chai = use(chaiHttp);

const empty_user = {};
const invalid_fields = {user:{email:4,username:4,password:4}};

const invalid_user_create = {user:{email:'johnemail.com',username:'jo',password:'pass'}};
const valid_user_create = {user:{email:'john@email.com',username:'john',password:'passworddd'}};

const invalid_user_login = {user:{email:'johnemail.com',password:'pass'}};
const nonexisting_user = {user:{email:'johnjohn@email.com',username:'johnjohn',password:'passworddd'}};
const valid_user_login = {user:{email:'john@email.com',password:'passworddd'}};

describe('Users route', () => {
    before(async () => {
        await User.deleteMany();
    });
    after(async () => {
        await User.deleteMany();
    });
    describe('Test input validation', () => {
        it('should not create a new user with empty input', (done) => {
            chai.request(app)
                .post('/api/users')
                .send(empty_user)
                .end((err, res) => {
                    expect(res).to.have.status(422);
                    expect(res.body.errors.body).to.include('All fields are required');
                    done();
                });
        });
        it('should not create a new user with invalid fields', (done) => {
            chai.request(app)
                .post('/api/users')
                .send(invalid_fields)
                .end((err, res) => {
                    expect(res).to.have.status(422);
                    expect(res.body.errors.body).to.include('All fields must be strings');
                    done();
                });
        });
    });
    describe('/POST /api/users', () => {
        it('should not create a new user with invalid input', (done) => {
            chai.request(app)
                .post('/api/users')
                .send(invalid_user_create)
                .end((err, res) => {
                    expect(res).to.have.status(422);
                    expect(res.body.errors.body).to.include('Email must be a valid email address');
                    expect(res.body.errors.body).to.include('Username must be between 4 and 20 characters and contain only alphanumeric characters');
                    expect(res.body.errors.body).to.include('Password must be between 10 and 100 characters and contain only ASCII characters');
                    done();
                });
        });
        it('should create a new user', (done) => {
            chai.request(app)
                .post('/api/users')
                .send(valid_user_create)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body.user).to.have.property('email').equal('john@email.com');
                    expect(res.body.user).to.have.property('token');
                    expect(res.body.user).to.have.property('username').equal('john');
                    expect(res.body.user).to.have.property('bio').equal('');
                    expect(res.body.user).to.have.property('image').equal('');
                    done();
                });
        });
        it('should not create a new user with existing email', (done) => {
            chai.request(app)
                .post('/api/users')
                .send(valid_user_create)
                .end((err, res) => {
                    expect(res).to.have.status(422);
                    expect(res.body.errors.body).to.include('Email address already in use');
                    done();
                });
        });
    });
    describe('/POST /api/users/login', () => {
        it('should not login with invalid input', (done) => {
            chai.request(app)
                .post('/api/users/login')
                .send(invalid_user_login)
                .end((err, res) => {
                    expect(res).to.have.status(422);
                    expect(res.body.errors.body).to.include('Email must be a valid email address');
                    expect(res.body.errors.body).to.include('Password must be between 10 and 100 characters and contain only ASCII characters');
                    done();
                });
        });
        it('should not login with non-existing email', (done) => {
            chai.request(app)
                .post('/api/users/login')
                .send(nonexisting_user)
                .end((err, res) => {
                    expect(res).to.have.status(422);
                    expect(res.body.errors.body).to.include('Invalid email or password');
                    done();
                });
        });
        it('should login with valid input', (done) => {
            chai.request(app)
                .post('/api/users/login')
                .send(valid_user_login)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.user).to.have.property('email').equal('john@email.com');
                    expect(res.body.user).to.have.property('token');
                    expect(res.body.user).to.have.property('username').equal('john');
                    expect(res.body.user).to.have.property('bio').equal('');
                    expect(res.body.user).to.have.property('image').equal('');
                    done();
                }
            );
        });
    });
});