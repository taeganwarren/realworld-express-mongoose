import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/server.js';
import User from '../api/models/User.js';

const chai = use(chaiHttp);

const empty_user = {};
const invalid_fields = {user:{email:4,username:4,password:4}};
const missing_fields = {user:{email:'john@email.com',username:'myusername'}};
const incorrect_fields = {user:{email:'john@email.com',username:'myusername',thirdfield:'thirdfieldhere'}};

const invalid_user_create = {user:{email:'johnemail.com',username:'jo',password:'pass'}};
const valid_user_create = {user:{email:'john@email.com',username:'john',password:'passworddd'}};
const invalid_user_create_2 = {user:{email:'johnjohn@email.com',username:'john',password:'passworddd'}};

const invalid_user_login = {user:{email:'johnemail.com',password:'pass'}};
const nonexisting_user = {user:{email:'johnjohn@email.com',password:'passworddd'}};
const valid_user_login = {user:{email:'john@email.com',password:'passworddd'}};
const valid_user_login_2 = {user:{email:'JOHN@EMAIL.COM',password:'passworddd'}};

describe('Users route', function() {
    before(async function() {
        await User.deleteMany();
    });
    // after(async () => {
    //     await User.deleteMany();
    // });
    describe('Test input validation for users route', function() {
        it('should not create a new user with empty input', function(done) {
            chai.request(app)
                .post('/api/users')
                .send(empty_user)
                .end((err, res) => {
                    if (res.status !== 422) console.log(res.body);
                    expect(res).to.be.json;
                    expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                    expect(res).to.have.status(422);
                    expect(res.body.errors.body).to.include('Invalid number of fields');
                    done();
                });
        });

        it('should not create a new user with invalid input', function(done) {
            chai.request(app)
                .post('/api/users')
                .send(invalid_fields)
                .end((err, res) => {
                    if (res.status !== 422) console.log(res.body);
                    expect(res).to.be.json;
                    expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                    expect(res).to.have.status(422);
                    expect(res.body.errors.body).to.include('Field must be a string: email');
                    expect(res.body.errors.body).to.include('Field must be a string: username');
                    expect(res.body.errors.body).to.include('Field must be a string: password');
                    done();
                });
        });

        it('should not create a new user with missing input', function(done) {
            chai.request(app)
                .post('/api/users')
                .send(missing_fields)
                .end((err, res) => {
                    if (res.status !== 422) console.log(res.body);
                    expect(res).to.be.json;
                    expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                    expect(res).to.have.status(422);
                    expect(res.body.errors.body).to.include('Missing field: password');
                    done();
                });
        });

        it('should not create a new user with incorrect input', function(done) {
            chai.request(app)
                .post('/api/users')
                .send(incorrect_fields)
                .end((err, res) => {
                    if (res.status !== 422) console.log(res.body);
                    expect(res).to.be.json;
                    expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                    expect(res).to.have.status(422);
                    expect(res.body.errors.body).to.include('Missing field: password');
                    done();
                });
        });
    });

    describe('/POST /api/users', function() {
        it('should not create a new user with invalid input', function(done) {
            chai.request(app)
                .post('/api/users')
                .send(invalid_user_create)
                .end((err, res) => {
                    if (res.status !== 422) console.log(res.body);
                    expect(res).to.be.json;
                    expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                    expect(res).to.have.status(422);
                    expect(res.body.errors.body).to.include('Email must be a valid email address');
                    expect(res.body.errors.body).to.include('Username must be between 4 and 20 characters and contain only alphanumeric characters');
                    expect(res.body.errors.body).to.include('Password must be between 10 and 100 characters and contain only ASCII characters');
                    done();
                });
        });

        it('should create a new user', function(done) {
            chai.request(app)
                .post('/api/users')
                .send(valid_user_create)
                .end((err, res) => {
                    if (res.status !== 201) console.log(res.body);
                    expect(res).to.be.json;
                    expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                    expect(res).to.have.status(201);
                    expect(res.body.user).to.have.property('email').equal('john@email.com');
                    expect(res.body.user).to.have.property('token');
                    expect(res.body.user).to.have.property('username').equal('john');
                    expect(res.body.user).to.have.property('bio').equal('');
                    expect(res.body.user).to.have.property('image').equal('');
                    done();
                });
        });

        it('should not create a new user with existing email', function(done) {
            chai.request(app)
                .post('/api/users')
                .send(valid_user_create)
                .end((err, res) => {
                    if (res.status !== 422) console.log(res.body);
                    expect(res).to.be.json;
                    expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                    expect(res).to.have.status(422);
                    expect(res.body.errors.body).to.include('Email address already in use');
                    done();
                });
        });

        it('should not create a new user with existing username', function(done) {
            chai.request(app)
                .post('/api/users')
                .send(invalid_user_create_2)
                .end((err, res) => {
                    if (res.status !== 422) console.log(res.body);
                    expect(res).to.be.json;
                    expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                    expect(res).to.have.status(422);
                    expect(res.body.errors.body).to.include('Username already in use');
                    done();
                });
        });
    });

    describe('/POST /api/users/login', function() {
        it('should not login with invalid input', function(done) {
            chai.request(app)
                .post('/api/users/login')
                .send(invalid_user_login)
                .end((err, res) => {
                    if (res.status !== 422) console.log(res.body);
                    expect(res).to.be.json;
                    expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                    expect(res).to.have.status(422);
                    expect(res.body.errors.body).to.include('Email must be a valid email address');
                    expect(res.body.errors.body).to.include('Password must be between 10 and 100 characters and contain only ASCII characters');
                    done();
                });
        });

        it('should not login with non-existing email', function(done) {
            chai.request(app)
                .post('/api/users/login')
                .send(nonexisting_user)
                .end((err, res) => {
                    if (res.status !== 422) console.log(res.body);
                    expect(res).to.be.json;
                    expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                    expect(res).to.have.status(422);
                    expect(res.body.errors.body).to.include('Invalid email or password');
                    done();
                });
        });

        it('should login with valid input', function(done) {
            chai.request(app)
                .post('/api/users/login')
                .send(valid_user_login)
                .end((err, res) => {
                    if (res.status !== 200) console.log(res.body);
                    expect(res).to.be.json;
                    expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
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

        it('should login with valid input (case insensitive)', function(done) {
            chai.request(app)
                .post('/api/users/login')
                .send(valid_user_login_2)
                .end((err, res) => {
                    if (res.status !== 200) console.log(res.body);
                    expect(res).to.be.json;
                    expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
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