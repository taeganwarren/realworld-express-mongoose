import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/server.js';
import User from '../api/models/User.js';

const chai = use(chaiHttp);

let user_one_token = '';
let user_two_token = '';

describe('Tests', function() {
    before(async function() {
        await User.deleteMany();
    });
    describe('POST /api/users', function() {
        it('should create user one', function(done) {
            chai.request(app)
                .post('/api/users')
                .send({
                    email: 'test1@test.com',
                    password: 'Pa$$w0rd1#',
                    username: 'test1'
                })
                .end(function(err, res) {
                    expect(res).to.have.status(201);
                    expect(res.body.user.email).to.equal('test1@test.com');
                    expect(res.body.user.username).to.equal('test1');
                    expect(res.body.user).to.have.property('token');
                    user_one_token = res.body.user.token;
                    done();
                });
        });
        it('should create user two', function(done) {
            chai.request(app)
                .post('/api/users')
                .send({
                    email: 'test2@test.com',
                    password: 'Pa$$w0rd2#',
                    username: 'test2'
                })
                .end(function(err, res) {
                    expect(res).to.have.status(201);
                    expect(res.body.user.email).to.equal('test2@test.com');
                    expect(res.body.user.username).to.equal('test2');
                    expect(res.body.user).to.have.property('token');
                    user_two_token = res.body.user.token;
                    done();
                });
        });
        it('should not create a user with the same email and username', function(done) {
            chai.request(app)
                .post('/api/users')
                .send({
                    email: 'test1@test.com',
                    password: 'Pa$$w0rd1#',
                    username: 'test1'
                })
                .end(function(err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body['validation error']).to.include('Email address already in use');
                    expect(res.body['validation error']).to.include('Username already in use');
                    done();
                });
        });
        it('should not create a user with an invalid email and password', function(done) {
            chai.request(app)
                .post('/api/users')
                .send({
                    email: 'test1',
                    password: 'password',
                    username: 'test1'
                })
                .end(function(err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body['validation error']).to.include('Invalid email');
                    expect(res.body['validation error']).to.include('Invalid password');
                    done();
                });
        });
        it('should not create a user with invalid input', function(done) {
            chai.request(app)
                .post('/api/users')
                .send({
                    email: 1,
                    password: 1,
                    username: 1
                })
                .end(function(err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body['input error']).to.include('email must be a string');
                    expect(res.body['input error']).to.include('password must be a string');
                    expect(res.body['input error']).to.include('username must be a string');
                    done();
                });
        });
    });
    describe('POST /api/users/login', function() {
        it('should login user one', function(done) {
            chai.request(app)
                .post('/api/users/login')
                .send({
                    email: 'test1@test.com',
                    password: 'Pa$$w0rd1#'
                })
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body.user.email).to.equal('test1@test.com');
                    expect(res.body.user).to.have.property('token');
                    expect(res.body.user.username).to.equal('test1');
                    expect(res.body.user.bio).to.equal('');
                    expect(res.body.user.image).to.equal('');
                    user_one_token = res.body.user.token;
                    done();
                });
        });
        it('should login user two', function(done) {
            chai.request(app)
                .post('/api/users/login')
                .send({
                    email: 'test2@test.com',
                    password: 'Pa$$w0rd2#'
                })
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body.user.email).to.equal('test2@test.com');
                    expect(res.body.user).to.have.property('token');
                    expect(res.body.user.username).to.equal('test2');
                    expect(res.body.user.bio).to.equal('');
                    expect(res.body.user.image).to.equal('');
                    user_two_token = res.body.user.token;
                    done();
                });
        });
        it('should not login a user that doesnt exist', function(done) {
            chai.request(app)
                .post('/api/users/login')
                .send({
                    email: 'test3@test.com',
                    password: 'Pa$$w0rd3#'
                })
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body['auth error']).to.equal('Invalid email or password');
                    done();
                });
        });
        it('should not login a user with an invalid email and password', function(done) {
            chai.request(app)
                .post('/api/users/login')
                .send({
                    email: 'test1',
                    password: 'password'
                })
                .end(function(err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body['validation error']).to.include('Invalid email');
                    expect(res.body['validation error']).to.include('Invalid password');
                    done();
                });
        });
        it('should not login a user with invalid input', function(done) {
            chai.request(app)
                .post('/api/users/login')
                .send({
                    email: 1,
                    password: 1
                })
                .end(function(err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body['input error']).to.include('email must be a string');
                    expect(res.body['input error']).to.include('password must be a string');
                    done();
                });
        });
        it('should not login a user without a password', function(done) {
            chai.request(app)
                .post('/api/users/login')
                .send({
                    email: 'test1@test.com'
                })
                .end(function(err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body['input error']).to.include('Missing password');
                    done();
                });
        });
    });
    describe('GET /api/user', function() {
        it('should get user one', function(done) {
            chai.request(app)
                .get('/api/user')
                .set('Authorization', `Token ${user_one_token}`)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body.user.email).to.equal('test1@test.com');
                    expect(res.body.user).to.have.property('token');
                    expect(res.body.user.username).to.equal('test1');
                    expect(res.body.user.bio).to.equal('');
                    expect(res.body.user.image).to.equal('');
                    done();
                });
        });
        it('should get user two', function(done) {
            chai.request(app)
                .get('/api/user')
                .set('Authorization', `Token ${user_two_token}`)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body.user.email).to.equal('test2@test.com');
                    expect(res.body.user).to.have.property('token');
                    expect(res.body.user.username).to.equal('test2');
                    expect(res.body.user.bio).to.equal('');
                    expect(res.body.user.image).to.equal('');
                    done();
                });
        });
        it('should not get a user without a token', function(done) {
            chai.request(app)
                .get('/api/user')
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body['auth error']).to.equal('No token provided');
                    done();
                });
        });
        it('should not get a user with an invalid token', function(done) {
            chai.request(app)
                .get('/api/user')
                .set('Authorization', 'Token invalidtoken')
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body['auth error']).to.equal('Failed to authenticate token');
                    done();
                });
        });
        it('should not get a user with another invalid token', function(done) {
            chai.request(app)
                .get('/api/user')
                .set('Authorization', 'invalidtoken')
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body['auth error']).to.equal('Failed to authenticate token');
                    done();
                });
        });
    });
    describe('PUT /api/user', function() {
        it('should update user one', function(done) {
            chai.request(app)
                .put('/api/user')
                .set('Authorization', `Token ${user_one_token}`)
                .send({
                    email: 'test1updated@test.com',
                    password: 'Pa$$w0rd1#_updated',
                })
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body.user.email).to.equal('test1updated@test.com');
                    expect(res.body.user).to.have.property('token');
                    expect(res.body.user.username).to.equal('test1');
                    expect(res.body.user.bio).to.equal('');
                    expect(res.body.user.image).to.equal('');
                    done();
                });
        });
        it('should update user two', function(done) {
            chai.request(app)
                .put('/api/user')
                .set('Authorization', `Token ${user_two_token}`)
                .send({
                    email: 'test2updated@test.com',
                    username: 'test2updated',
                    bio: 'test2 bio',
                    image: 'test2 image'
                })
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body.user.email).to.equal('test2updated@test.com');
                    expect(res.body.user).to.have.property('token');
                    expect(res.body.user.username).to.equal('test2updated');
                    expect(res.body.user.bio).to.equal('test2 bio');
                    expect(res.body.user.image).to.equal('test2 image');
                    done();
                });
        });
        it('should log in user one with updated email and password', function(done) {
            chai.request(app)
                .post('/api/users/login')
                .send({
                    email: 'test1updated@test.com',
                    password: 'Pa$$w0rd1#_updated'
                })
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body.user.email).to.equal('test1updated@test.com');
                    expect(res.body.user).to.have.property('token');
                    expect(res.body.user.username).to.equal('test1');
                    expect(res.body.user.bio).to.equal('');
                    expect(res.body.user.image).to.equal('');
                    user_one_token = res.body.user.token;
                    done();
                });
        });
        it('should not update a user with an invalid email and password', function(done) {
            chai.request(app)
                .put('/api/user')
                .set('Authorization', `Token ${user_one_token}`)
                .send({
                    email: 'test1',
                    username: 'test1@#$%',
                    password: 'password'
                })
                .end(function(err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body['validation error']).to.include('Invalid email');
                    expect(res.body['validation error']).to.include('Invalid username');
                    expect(res.body['validation error']).to.include('Invalid password');
                    done();
                });
        });
        it('should not update a user with invalid input', function(done) {
            chai.request(app)
                .put('/api/user')
                .set('Authorization', `Token ${user_one_token}`)
                .send({
                    email: 1,
                    username: 1,
                    password: 1
                })
                .end(function(err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body['input error']).to.include('email must be a string');
                    expect(res.body['input error']).to.include('password must be a string');
                    expect(res.body['input error']).to.include('username must be a string');
                    done();
                });
        });
        it('should not update a user without a token', function(done) {
            chai.request(app)
                .put('/api/user')
                .send({
                    email: 'test1updatedupdated@test.com'
                })
                .end(function(err, res) {
                    expect(res).to.have.status(401);
                    expect(res.body['auth error']).to.equal('No token provided');
                    done();
                });
        });
        it('should not update a user with an existing email', function(done) {
            chai.request(app)
                .put('/api/user')
                .set('Authorization', `Token ${user_one_token}`)
                .send({
                    email: 'test2updated@test.com'
                })
                .end(function(err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body['validation error']).to.include('Email address already in use');
                    done();
                });
        });
        it('should not update a user with an existing username', function(done) {
            chai.request(app)
                .put('/api/user')
                .set('Authorization', `Token ${user_one_token}`)
                .send({
                    username: 'test2updated'
                })
                .end(function(err, res) {
                    expect(res).to.have.status(422);
                    expect(res.body['validation error']).to.include('Username already in use');
                    done();
                });
        });
    });
});